import { Contract } from "ethers";
import { task } from "hardhat/config";

import { Env, getDeploymentName, mustGetEnv } from "../../src/utils";

type TaskArgs = {
  env?: Env;
};

export default task("propagate", "Propagate aggregate root from RootManager")
  .addOptionalParam("env", "Environment of contracts")
  .setAction(async ({ env: _env }: TaskArgs, { deployments, ethers }) => {
    let { deployer } = await ethers.getNamedSigners();
    if (!deployer) {
      [deployer] = await ethers.getUnnamedSigners();
    }

    const env = mustGetEnv(_env);
    console.log("env:", env);

    const deploymentName = getDeploymentName("RootManager", env);
    const rootManagerDeployment = await deployments.get(deploymentName);
    if (!rootManagerDeployment) {
      throw new Error(`No ${deploymentName} found`);
    }
    console.log("rootManagerAddress: ", rootManagerDeployment.address);
    // const merkleDeploy = await deployments.get(getDeploymentName("MerkleTreeManagerRoot"));
    // const merkleTree = new Contract("0x24995B94E36CD57eCC089287836ce49c848ceeBF", merkleDeploy.abi, deployer);
    // const tx1 = await merkleTree.setArborist("0x13dd6168c0027e75fe76aea000e9e742c862a281");
    // await tx1.wait();

    const rootManager = new Contract(rootManagerDeployment.address, rootManagerDeployment.abi, deployer);

    const domains = [6450786, 6648936];
    const connectors = ["0x21719EBb2fb6f2b2E615866a3F9b1444775e669c"];
    const fees = ["254019196160768"];
    const encodedBytes = ["0x00000000000000000000000000000000000000000000000000000000000493e0"];

    console.log("domains:", domains);
    console.log("connectors:", connectors);
    const tx = await rootManager.propagate(connectors, fees, encodedBytes, {
      value: "254019196160768",
    });
    console.log("propogate tx: ", tx);
    const receipt = await tx.wait();
    console.log("propogate tx mined: ", receipt.transactionHash);
  });
