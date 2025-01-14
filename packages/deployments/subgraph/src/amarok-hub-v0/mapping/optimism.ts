/* eslint-disable prefer-const */
import { Bytes } from "@graphprotocol/graph-ts";

import { NewConnector, MessageProcessed } from "../../../generated/OptimismHubConnector/OptimismHubConnector";
import { OptimismConnectorMeta, RootMessageProcessed } from "../../../generated/schema";

const DEFAULT_OPTIMISM_HUB_CONNECTOR_META_ID = "OPTIMISM_HUB_CONNECTOR_META_ID";

/// MARK - OPTIMISM
export function handleOptimismNewConnector(event: NewConnector): void {
  let meta = OptimismConnectorMeta.load(DEFAULT_OPTIMISM_HUB_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new OptimismConnectorMeta(DEFAULT_OPTIMISM_HUB_CONNECTOR_META_ID);
  }

  meta.spokeDomain = event.params.mirrorDomain;
  meta.hubDomain = event.params.domain;

  meta.amb = event.params.amb;
  meta.rootManager = event.params.rootManager;
  meta.mirrorConnector = event.params.mirrorConnector;

  meta.save();
}

export function handleOptimismMessageProcessed(event: MessageProcessed): void {
  let meta = OptimismConnectorMeta.load(DEFAULT_OPTIMISM_HUB_CONNECTOR_META_ID);
  if (meta == null) {
    meta = new OptimismConnectorMeta(DEFAULT_OPTIMISM_HUB_CONNECTOR_META_ID);
  }
  let message = RootMessageProcessed.load(
    `0x${event.params.data.toHexString().slice(-64)}-${meta.spokeDomain.toString()}`,
  );
  if (message == null) {
    message = new RootMessageProcessed(
      `0x${event.params.data.toHexString().slice(-64)}-${meta.spokeDomain.toString()}`,
    );
  }

  message.spokeDomain = meta.spokeDomain;
  message.hubDomain = meta.hubDomain;

  message.root = Bytes.fromHexString(event.params.data.toHexString().slice(-64));
  message.caller = event.params.caller;
  message.transactionHash = event.transaction.hash;
  message.timestamp = event.block.timestamp;
  message.gasPrice = event.transaction.gasPrice;
  message.gasLimit = event.transaction.gasLimit;
  message.blockNumber = event.block.number;
  message.save();
}
