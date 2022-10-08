import { BaseRequestContext, createRequestContext, expect, mock } from "@connext/nxtp-utils";
import { SinonStub, stub } from "sinon";

import * as ProcessFromRootFns from "../../../../src/tasks/processFromRoot/operations/processFromRoot";
import { processFromRootCtxMock } from "../../../globalTestHook";

describe("Operations: ProcessFromRoot", () => {
  describe("#processSingleRootMessage", () => {
    beforeEach(() => {
      stub(ProcessFromRootFns, "processorConfigs").value({
        [mock.entity.rootMessage().spokeDomain]: {
          getArgs: () => Promise.resolve([]),
          hubConnectorPrefix: "Optimism",
        },
      });
      stub(ProcessFromRootFns, "encodeProcessMessageFromRoot").returns("0xfaded");
    });

    it("should process message from root", async () => {
      const rootMsg = mock.entity.rootMessage();
      const requestContext = createRequestContext("test");
      await ProcessFromRootFns.processSingleRootMessage(rootMsg, requestContext);
      expect(processFromRootCtxMock.adapters.relayer.send).to.have.been.calledOnceWith(
        +mock.chain.B,
        processFromRootCtxMock.adapters.contracts.hubConnector(1, "Optimism")!.address,
        "0xfaded",
        processFromRootCtxMock.config.gelatoApiKey,
      );
    });

    it("should not process if error but still work", async () => {});
  });

  describe("#processFromRoot", () => {
    let processSingleRootMessageStub: SinonStub<
      [
        rootMessage: {
          id: string;
          spokeDomain: string;
          hubDomain: string;
          root: string;
          caller: string;
          transactionHash: string;
          timestamp: number;
          gasPrice: string;
          gasLimit: string;
          blockNumber: number;
        },
        requestContext: BaseRequestContext,
      ],
      Promise<string>
    >;
    beforeEach(() => {
      processSingleRootMessageStub = stub(ProcessFromRootFns, "processSingleRootMessage").resolves("0xbeefee");
    });

    it("should process messages", async () => {
      const rootMsgs = [mock.entity.rootMessage(), mock.entity.rootMessage()];
      (processFromRootCtxMock.adapters.database.getRootMessages as SinonStub).resolves(rootMsgs);

      await ProcessFromRootFns.processFromRoot();

      expect(processSingleRootMessageStub).to.be.calledWith(rootMsgs[0]);
      expect(processSingleRootMessageStub).to.be.calledWith(rootMsgs[1]);
      expect(processSingleRootMessageStub).to.have.been.calledTwice;
    });
  });
});