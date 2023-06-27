// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

import "../../../utils/ForgeHelper.sol";
import {RelayerProxyHub, IRootManager, IGnosisHubConnector} from "../../../../contracts/core/connext/helpers/RelayerProxyHub.sol";
import {IKeep3rV2} from "../../../../contracts/core/connext/helpers/RelayerProxy.sol";
import {RootManager} from "../../../../contracts/messaging/RootManager.sol";

contract RelayerProxyHubTest is ForgeHelper {
  // ============ Events ============
  event FundsReceived(uint256 amount, uint256 balance);

  event FundsDeducted(uint256 amount, uint256 balance);

  event RelayerAdded(address relayer);

  event RelayerRemoved(address relayer);

  event ConnextChanged(address updated, address previous);
  event SpokeConnectorChanged(address updated, address previous);
  event RelayerChanged(address updated, address previous);
  event FeeCollectorChanged(address updated, address previous);
  event PropagateCooldownChanged(uint256 propagateCooldown, uint256 oldPropagateCooldown);
  event RootManagerChanged(address rootManager, address oldRootManager);
  event HubConnectorChanged(address hubConnector, address oldHubConnector, uint32 chain);

  error ProposedOwnable__onlyOwner_notOwner();
  error RelayerProxy__onlyRelayer_notRelayer(address _sender);
  error RelayerProxy__isWorkableBySender_notWorkable(address _sender);
  error RelayerProxy__validateAndPayWithCredits_notKeep3r(address _sender);
  error RelayerProxyHub__propagateCooledDown_notCooledDown(uint256 timestamp, uint256 nextWorkable);
  error RelayerProxyHub__processFromRoot_noHubConnector(uint32 chain);
  error RelayerProxyHub__processFromRoot_unsupportedChain(uint32 chain);

  // ============ Storage ============
  address OWNER = address(1);
  address _connext = address(12312);
  address _spokeConnector = address(12321222);
  address _gelatoRelayer = address(123444412);
  address _feeCollector = address(12335555);
  address _rootManager = address(12335558);
  address _keep3r = address(12335556);
  address _autonolas = address(12335557);
  uint8 _autonolasPriority = 4;
  address[] _hubConnectors = new address[](2);
  uint32[] _hubConnectorChains = new uint32[](2);

  RelayerProxyHub proxy;

  // ============ Setup ============
  function setUp() public {
    utils_setUpPropagateParams();
    utils_deployAndAssert();
  }

  function utils_deployAndAssert() public {
    vm.expectEmit(true, true, true, true);
    emit ConnextChanged(_connext, address(0));

    vm.expectEmit(true, true, true, true);
    emit SpokeConnectorChanged(_spokeConnector, address(0));

    vm.expectEmit(true, true, true, true);
    emit FeeCollectorChanged(_feeCollector, address(0));

    vm.expectEmit(true, true, true, true);
    emit RelayerAdded(_gelatoRelayer);

    _hubConnectors[0] = address(123);
    _hubConnectors[1] = address(456);
    _hubConnectorChains[0] = 100;
    _hubConnectorChains[1] = 100200;

    vm.prank(OWNER);
    proxy = new RelayerProxyHub(
      _connext,
      _spokeConnector,
      _gelatoRelayer,
      _feeCollector,
      _rootManager,
      _keep3r,
      _autonolas,
      _autonolasPriority,
      300,
      _hubConnectors,
      _hubConnectorChains
    );
    vm.deal(address(proxy), 1 ether);
  }

  uint256[] _messageFees = new uint256[](2);
  bytes[] _encodedData = new bytes[](2);
  uint256 _relayerFee = 123;

  function utils_setUpPropagateParams() public {
    _messageFees[0] = 123;
    _messageFees[1] = 456;
    _encodedData[0] = abi.encode(1);
    _encodedData[1] = abi.encode(2);
  }

  function test_RelayerProxyHub__deploy_works() public {
    assertEq(address(proxy.connext()), _connext);
    assertEq(address(proxy.spokeConnector()), _spokeConnector);
    assertEq(proxy.gelatoRelayer(), _gelatoRelayer);
    assertEq(proxy.feeCollector(), _feeCollector);
  }

  function test_RelayerProxyHub__setRootManager_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setRootManager(address(123));
  }

  function test_RelayerProxyHub__setRootManager_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit RootManagerChanged(address(123), address(12335558));
    proxy.setRootManager(address(123));
    assertEq(address(proxy.rootManager()), address(123));
  }

  function test_RelayerProxyHub__setPropagateCooldown_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setPropagateCooldown(123);
  }

  function test_RelayerProxyHub__setPropagateCooldown_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit PropagateCooldownChanged(123, 300);
    proxy.setPropagateCooldown(123);
    assertEq(proxy.propagateCooldown(), 123);
  }

  function test_RelayerProxyHub__setHubConnector_onlyOwner_failsIfNotOwner(address sender) public {
    vm.assume(sender != OWNER);
    vm.prank(sender);
    vm.expectRevert(ProposedOwnable__onlyOwner_notOwner.selector);
    proxy.setHubConnector(address(123), 123);
  }

  function test_RelayerProxyHub__setHubConnector_onlyOwner_works() public {
    vm.prank(OWNER);
    vm.expectEmit(true, true, true, true);
    emit HubConnectorChanged(address(123), address(0), 123);
    proxy.setHubConnector(address(123), 123);
    assertEq(proxy.hubConnectors(123), address(123));
  }

  function test_RelayerProxyHub__propagateWorkable_isFalseIfRootIsSame() public {
    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.dequeue.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"), 123)
    );

    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.lastPropagatedRoot.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"))
    );

    assertEq(proxy.propagateWorkable(), false);
  }

  function test_RelayerProxyHub__propagateWorkable_isTrue() public {
    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.dequeue.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001"), 123)
    );

    vm.mockCall(
      address(proxy.rootManager()),
      abi.encodeWithSelector(IRootManager.lastPropagatedRoot.selector),
      abi.encode(vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000002"))
    );

    assertEq(proxy.propagateWorkable(), true);
  }

  function test_RelayerProxyHub__propagate_failsIfNotGelatoRelayer(address sender) public {
    vm.assume(sender != _gelatoRelayer);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__onlyRelayer_notRelayer.selector, sender));
    proxy.propagate(_hubConnectors, _messageFees, _encodedData, _relayerFee);
  }

  function test_RelayerProxyHub__propagate_works() public {
    vm.mockCall(address(proxy.rootManager()), abi.encodeWithSelector(IRootManager.propagate.selector), abi.encode());
    vm.prank(_gelatoRelayer);
    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(123 + 456, 1 ether);
    vm.expectEmit(true, true, true, true);
    emit FundsDeducted(123, 1 ether - 123);
    proxy.propagate(_hubConnectors, _messageFees, _encodedData, _relayerFee);
  }

  function test_RelayerProxyHub__propagateKeep3r_failsIfNotPriority(address sender) public {
    vm.assume(sender != _autonolas);
    vm.roll(100);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);

    vm.roll(101);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);

    vm.roll(102);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);

    vm.roll(103);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_doesNotWorkIfNotKeep3r(address sender) public {
    vm.assume(sender != _autonolas);
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, sender), abi.encode(false));
    vm.roll(105);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__validateAndPayWithCredits_notKeep3r.selector, sender));
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_worksIfAutonolas() public {
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, _autonolas), abi.encode(true));
    vm.mockCall(address(proxy.rootManager()), abi.encodeWithSelector(IRootManager.propagate.selector), abi.encode());
    vm.roll(100);
    vm.prank(_autonolas);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_worksIfKeep3r(address sender) public {
    vm.assume(sender != _autonolas);
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, sender), abi.encode(true));
    vm.mockCall(address(proxy.rootManager()), abi.encodeWithSelector(IRootManager.propagate.selector), abi.encode());
    vm.roll(105);
    vm.prank(sender);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__propagateKeep3r_failsIfNotCooledDown() public {
    vm.mockCall(
      address(_keep3r),
      abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, _gelatoRelayer),
      abi.encode(true)
    );
    vm.mockCall(address(proxy.rootManager()), abi.encodeWithSelector(IRootManager.propagate.selector), abi.encode());
    vm.roll(105);
    vm.prank(_gelatoRelayer);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
    vm.expectRevert(
      abi.encodeWithSelector(RelayerProxyHub__propagateCooledDown_notCooledDown.selector, 1648744712, 1648745012)
    );
    vm.prank(_gelatoRelayer);
    proxy.propagateKeep3r(_hubConnectors, _messageFees, _encodedData);
  }

  function test_RelayerProxyHub__processFromRootKeep3r_failsIfNotPriority(address sender) public {
    vm.assume(sender != _autonolas);
    vm.roll(100);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(
      bytes(""),
      137,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );

    vm.roll(101);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(
      bytes(""),
      137,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );

    vm.roll(102);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(
      bytes(""),
      137,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );

    vm.roll(103);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__isWorkableBySender_notWorkable.selector, sender));
    proxy.processFromRootKeep3r(
      bytes(""),
      137,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );
  }

  function test_RelayerProxyHub__processFromRootKeep3r_doesNotWorkIfNotKeep3r(address sender) public {
    vm.assume(sender != _autonolas);
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, sender), abi.encode(false));
    vm.roll(105);
    vm.prank(sender);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxy__validateAndPayWithCredits_notKeep3r.selector, sender));
    proxy.processFromRootKeep3r(
      bytes(""),
      137,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );
  }

  function test_RelayerProxyHub__processFromRootKeep3r_failsIfNoHubConnector() public {
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, _autonolas), abi.encode(true));
    vm.roll(100);
    vm.prank(_autonolas);
    vm.expectRevert(abi.encodeWithSelector(RelayerProxyHub__processFromRoot_noHubConnector.selector, 1234567));
    proxy.processFromRootKeep3r(
      bytes(""),
      1234567,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );
  }

  function test_RelayerProxyHub__processFromRootKeep3r_worksForGnosis() public {
    vm.mockCall(address(_keep3r), abi.encodeWithSelector(IKeep3rV2.isKeeper.selector, _autonolas), abi.encode(true));
    vm.mockCall(
      _hubConnectors[0],
      abi.encodeWithSelector(IGnosisHubConnector.executeSignatures.selector),
      abi.encode()
    );
    vm.roll(100);
    vm.prank(_autonolas);
    IGnosisHubConnector.GnosisRootMessageData memory params = IGnosisHubConnector.GnosisRootMessageData({
      _data: abi.encode("data"),
      _signatures: abi.encode("signatures")
    });
    proxy.processFromRootKeep3r(
      abi.encode(params),
      100,
      vm.parseBytes32("0x0000000000000000000000000000000000000000000000000000000000000001")
    );
  }
}