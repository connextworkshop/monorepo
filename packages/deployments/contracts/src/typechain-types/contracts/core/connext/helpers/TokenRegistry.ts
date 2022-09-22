/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../common";

export interface TokenRegistryInterface extends utils.Interface {
  functions: {
    "acceptProposedOwner()": FunctionFragment;
    "canonicalToRepresentation(bytes32)": FunctionFragment;
    "delay()": FunctionFragment;
    "enrollCustom(uint32,bytes32,address)": FunctionFragment;
    "ensureLocalToken(uint32,bytes32)": FunctionFragment;
    "getCanonicalTokenId(address)": FunctionFragment;
    "getLocalAddress(uint32,bytes32)": FunctionFragment;
    "getLocalAddress(uint32,address)": FunctionFragment;
    "getRepresentationAddress(uint32,bytes32)": FunctionFragment;
    "getTokenId(address)": FunctionFragment;
    "initialize(address,address)": FunctionFragment;
    "isLocalOrigin(address)": FunctionFragment;
    "mustHaveLocalToken(uint32,bytes32)": FunctionFragment;
    "oldReprToCurrentRepr(address)": FunctionFragment;
    "owner()": FunctionFragment;
    "proposeNewOwner(address)": FunctionFragment;
    "proposed()": FunctionFragment;
    "proposedTimestamp()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "renounced()": FunctionFragment;
    "representationToCanonical(address)": FunctionFragment;
    "setXAppConnectionManager(address)": FunctionFragment;
    "tokenBeacon()": FunctionFragment;
    "xAppConnectionManager()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "acceptProposedOwner"
      | "canonicalToRepresentation"
      | "delay"
      | "enrollCustom"
      | "ensureLocalToken"
      | "getCanonicalTokenId"
      | "getLocalAddress(uint32,bytes32)"
      | "getLocalAddress(uint32,address)"
      | "getRepresentationAddress"
      | "getTokenId"
      | "initialize"
      | "isLocalOrigin"
      | "mustHaveLocalToken"
      | "oldReprToCurrentRepr"
      | "owner"
      | "proposeNewOwner"
      | "proposed"
      | "proposedTimestamp"
      | "renounceOwnership"
      | "renounced"
      | "representationToCanonical"
      | "setXAppConnectionManager"
      | "tokenBeacon"
      | "xAppConnectionManager"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "acceptProposedOwner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "canonicalToRepresentation",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "delay", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "enrollCustom",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "ensureLocalToken",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCanonicalTokenId",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLocalAddress(uint32,bytes32)",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLocalAddress(uint32,address)",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getRepresentationAddress",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenId",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "initialize",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isLocalOrigin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "mustHaveLocalToken",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "oldReprToCurrentRepr",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposeNewOwner",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "proposed", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "proposedTimestamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "renounced", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "representationToCanonical",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setXAppConnectionManager",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "tokenBeacon",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "xAppConnectionManager",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptProposedOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "canonicalToRepresentation",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "delay", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "enrollCustom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ensureLocalToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCanonicalTokenId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLocalAddress(uint32,bytes32)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLocalAddress(uint32,address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRepresentationAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getTokenId", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isLocalOrigin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mustHaveLocalToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "oldReprToCurrentRepr",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposeNewOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "proposed", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "proposedTimestamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "renounced", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "representationToCanonical",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setXAppConnectionManager",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "tokenBeacon",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "xAppConnectionManager",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "OwnershipProposed(address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "TokenDeployed(uint32,bytes32,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipProposed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TokenDeployed"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface OwnershipProposedEventObject {
  proposedOwner: string;
}
export type OwnershipProposedEvent = TypedEvent<
  [string],
  OwnershipProposedEventObject
>;

export type OwnershipProposedEventFilter =
  TypedEventFilter<OwnershipProposedEvent>;

export interface OwnershipTransferredEventObject {
  previousOwner: string;
  newOwner: string;
}
export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  OwnershipTransferredEventObject
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export interface TokenDeployedEventObject {
  domain: number;
  id: string;
  representation: string;
}
export type TokenDeployedEvent = TypedEvent<
  [number, string, string],
  TokenDeployedEventObject
>;

export type TokenDeployedEventFilter = TypedEventFilter<TokenDeployedEvent>;

export interface TokenRegistry extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenRegistryInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    acceptProposedOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    canonicalToRepresentation(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    delay(overrides?: CallOverrides): Promise<[BigNumber]>;

    enrollCustom(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      _custom: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    ensureLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getCanonicalTokenId(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, string] & { _domain: number; _id: string }>;

    "getLocalAddress(uint32,bytes32)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { _token: string }>;

    "getLocalAddress(uint32,address)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { _token: string }>;

    getRepresentationAddress(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string] & { _representation: string }>;

    getTokenId(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, string] & { _domain: number; _id: string }>;

    initialize(
      _tokenBeacon: PromiseOrValue<string>,
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isLocalOrigin(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mustHaveLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    oldReprToCurrentRepr(
      _oldRepr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[string] & { _currentRepr: string }>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    proposed(overrides?: CallOverrides): Promise<[string]>;

    proposedTimestamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    renounced(overrides?: CallOverrides): Promise<[boolean]>;

    representationToCanonical(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, string] & { domain: number; id: string }>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    tokenBeacon(overrides?: CallOverrides): Promise<[string]>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<[string]>;
  };

  acceptProposedOwner(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  canonicalToRepresentation(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  delay(overrides?: CallOverrides): Promise<BigNumber>;

  enrollCustom(
    _domain: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BytesLike>,
    _custom: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  ensureLocalToken(
    _domain: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getCanonicalTokenId(
    _representation: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[number, string] & { _domain: number; _id: string }>;

  "getLocalAddress(uint32,bytes32)"(
    _domain: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  "getLocalAddress(uint32,address)"(
    _domain: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  getRepresentationAddress(
    _domain: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  getTokenId(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[number, string] & { _domain: number; _id: string }>;

  initialize(
    _tokenBeacon: PromiseOrValue<string>,
    _xAppConnectionManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isLocalOrigin(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mustHaveLocalToken(
    _domain: PromiseOrValue<BigNumberish>,
    _id: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<string>;

  oldReprToCurrentRepr(
    _oldRepr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<string>;

  owner(overrides?: CallOverrides): Promise<string>;

  proposeNewOwner(
    newlyProposed: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  proposed(overrides?: CallOverrides): Promise<string>;

  proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

  renounceOwnership(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  renounced(overrides?: CallOverrides): Promise<boolean>;

  representationToCanonical(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<[number, string] & { domain: number; id: string }>;

  setXAppConnectionManager(
    _xAppConnectionManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  tokenBeacon(overrides?: CallOverrides): Promise<string>;

  xAppConnectionManager(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    acceptProposedOwner(overrides?: CallOverrides): Promise<void>;

    canonicalToRepresentation(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    delay(overrides?: CallOverrides): Promise<BigNumber>;

    enrollCustom(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      _custom: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    ensureLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getCanonicalTokenId(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, string] & { _domain: number; _id: string }>;

    "getLocalAddress(uint32,bytes32)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    "getLocalAddress(uint32,address)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    getRepresentationAddress(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    getTokenId(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, string] & { _domain: number; _id: string }>;

    initialize(
      _tokenBeacon: PromiseOrValue<string>,
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    isLocalOrigin(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mustHaveLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<string>;

    oldReprToCurrentRepr(
      _oldRepr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    owner(overrides?: CallOverrides): Promise<string>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    proposed(overrides?: CallOverrides): Promise<string>;

    proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    renounced(overrides?: CallOverrides): Promise<boolean>;

    representationToCanonical(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[number, string] & { domain: number; id: string }>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    tokenBeacon(overrides?: CallOverrides): Promise<string>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<string>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "OwnershipProposed(address)"(
      proposedOwner?: PromiseOrValue<string> | null
    ): OwnershipProposedEventFilter;
    OwnershipProposed(
      proposedOwner?: PromiseOrValue<string> | null
    ): OwnershipProposedEventFilter;

    "OwnershipTransferred(address,address)"(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      previousOwner?: PromiseOrValue<string> | null,
      newOwner?: PromiseOrValue<string> | null
    ): OwnershipTransferredEventFilter;

    "TokenDeployed(uint32,bytes32,address)"(
      domain?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BytesLike> | null,
      representation?: PromiseOrValue<string> | null
    ): TokenDeployedEventFilter;
    TokenDeployed(
      domain?: PromiseOrValue<BigNumberish> | null,
      id?: PromiseOrValue<BytesLike> | null,
      representation?: PromiseOrValue<string> | null
    ): TokenDeployedEventFilter;
  };

  estimateGas: {
    acceptProposedOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    canonicalToRepresentation(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    delay(overrides?: CallOverrides): Promise<BigNumber>;

    enrollCustom(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      _custom: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    ensureLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getCanonicalTokenId(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getLocalAddress(uint32,bytes32)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "getLocalAddress(uint32,address)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRepresentationAddress(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTokenId(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    initialize(
      _tokenBeacon: PromiseOrValue<string>,
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isLocalOrigin(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mustHaveLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    oldReprToCurrentRepr(
      _oldRepr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    proposed(overrides?: CallOverrides): Promise<BigNumber>;

    proposedTimestamp(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    renounced(overrides?: CallOverrides): Promise<BigNumber>;

    representationToCanonical(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    tokenBeacon(overrides?: CallOverrides): Promise<BigNumber>;

    xAppConnectionManager(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptProposedOwner(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    canonicalToRepresentation(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    delay(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    enrollCustom(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      _custom: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    ensureLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getCanonicalTokenId(
      _representation: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getLocalAddress(uint32,bytes32)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "getLocalAddress(uint32,address)"(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRepresentationAddress(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTokenId(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    initialize(
      _tokenBeacon: PromiseOrValue<string>,
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isLocalOrigin(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mustHaveLocalToken(
      _domain: PromiseOrValue<BigNumberish>,
      _id: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    oldReprToCurrentRepr(
      _oldRepr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposeNewOwner(
      newlyProposed: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    proposed(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    proposedTimestamp(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    renounced(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    representationToCanonical(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setXAppConnectionManager(
      _xAppConnectionManager: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    tokenBeacon(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    xAppConnectionManager(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}