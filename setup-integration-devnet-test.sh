#!/bin/bash
##### Loading .env file contents
echo "Loading .env contents"
set -a            
source .env
set +a
echo ".env contents loaded"
#####


##### Config Variables
LOCALHOST="127.0.0.1"

#For M* macs set the default platform to linux/amd64 
# export DOCKER_DEFAULT_PLATFORM=linux/amd64



##### Devnet Deployments
echo "Starting devnets..."
MAINNET_DEVNET_RPC_URL=$(tenderly devnet spawn-rpc --project $TENDERLY_PROJECT_SLUG --template $TENDERLY_MAINNET_DEVNET_TEMPLATE --account $TENDERLY_ACCOUNT_ID  --access_key $TENDERLY_ACCESS_KEY 2>&1)
OPTIMISM_DEVNET_RPC_URL=$(tenderly devnet spawn-rpc --project $TENDERLY_PROJECT_SLUG --template $TENDERLY_OPTIMISM_DEVNET_TEMPLATE --account $TENDERLY_ACCOUNT_ID  --access_key $TENDERLY_ACCESS_KEY 2>&1)
GNOSIS_DEVNET_RPC_URL=$(tenderly devnet spawn-rpc --project $TENDERLY_PROJECT_SLUG --template $TENDERLY_GNOSIS_DEVNET_TEMPLATE --account $TENDERLY_ACCOUNT_ID  --access_key $TENDERLY_ACCESS_KEY 2>&1)
echo "Mainnet devnet rpc url: $MAINNET_DEVNET_RPC_URL"
echo "Optimism devnet rpc url: $OPTIMISM_DEVNET_RPC_URL"
echo "Gnosis devnet rpc url: $GNOSIS_DEVNET_RPC_URL"
export MAINNET_DEVNET_RPC_URL
export OPTIMISM_DEVNET_RPC_URL
export GNOSIS_DEVNET_RPC_URL
#####


##### IPFS, postgres, graph nodes.
echo "Starting ipfs, postgres and graph-node..."
docker compose -f docker-compose.devnets.yaml up -d --force-recreate
sleep 5
#####

##### Delete previous devnet deployment records if they exist.
rm -rf -- packages/deployments/contracts/deployments/tenderly-mainnet
rm -rf -- packages/deployments/contracts/deployments/tenderly-optimism
rm -rf -- packages/deployments/contracts/deployments/tenderly-gnosis
#####


##### Contract Deployments
echo "Deploying contracts to the devnet"
yarn workspace @connext/smart-contracts devnet:deploy --network all
echo "Deployed contracts to the devnet"
sleep 5

echo "Initializing contracts - devnet"
yarn workspace @connext/smart-contracts devnet:init --network all
echo "Initialized contracts - devnet"
sleep 5
#####

##### Subgraph Deployments
echo "Building subgraph for the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-hub-v0
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the hub chain"

echo "Deploying subgraph to the hub chain - mainnet-devnet..."
yarn workspace @connext/nxtp-subgraph create:hub_devnet_mainnet --node http://localhost:8020/
yarn workspace @connext/nxtp-subgraph deploy:hub_devnet_mainnet --node http://localhost:8020/ -l v0.0.1
echo "Deployed subgraph to the hub chain - mainnet-devnet"

echo "Building subgraph for the spoke chain - optimism-devnet"
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-runtime-v0 optimism
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chain - optimism-devnet"

echo "Deploying subgraph to the spoke chain - optimism-devnet..."
yarn workspace @connext/nxtp-subgraph create:devnet_v0_optimism --node http://localhost:9020/
yarn workspace @connext/nxtp-subgraph deploy:devnet_v0_optimism --node http://localhost:9020/ -l v0.0.1
echo "Deployed subgraphs to the optimism-devnet"

echo "Building subgraph for the spoke chain - gnosis-devnet"
yarn workspace @connext/nxtp-subgraph prepare:devnet:amarok-runtime-v0 gnosis
yarn workspace @connext/nxtp-subgraph codegen
echo "Built subgraph for the spoke chain - gnosis-devnet"

echo "Deploying subgraph to the hub chain - gnosis-devnet..."
yarn workspace @connext/nxtp-subgraph create:devnet_v0_gnosis --node http://localhost:7020/
yarn workspace @connext/nxtp-subgraph deploy:devnet_v0_gnosis --node http://localhost:7020/ -l v0.0.1
echo "Deployed subgraph to the gnosis-devnet"
#####

##### Off-Chain Agents
echo "Starting services and off-chain agents..."
docker compose -f docker-compose.services.yaml up -d --force-recreate
sleep 5
#####

##### Ingest mainnet snapshot into cartographer DB
echo "Load mainnet snapshot in to cartographer..."
# Setup db schema
yarn workspace @connext/nxtp-adapters-database dbmate up
#####