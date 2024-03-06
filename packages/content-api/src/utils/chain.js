"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChainContent = void 0;
const SIMPLEHASH_API_URL = "https://api.simplehash.com/api/v0/nfts";
const CHAIN_ID_TO_NAME = {
    "eip155:1": "ethereum",
    "solana:101": "solana",
    bitcoin: "bitcoin",
    "eip155:137": "polygon",
    "eip155:42161": "arbitrum",
    "eip155:42170": "arbitrum-nova",
    tezos: "tezos",
    "eip155:43114": "avalanche",
    "eip155:8453": "base",
    "eip155:56": "bsc",
    "eip155:42220": "celo",
    flow: "flow",
    "eip155:100": "gnosis",
    "eip155:71402": "godwoken",
    "eip155:59144": "linea",
    "eip155:5151706": "loot",
    "eip155:169": "manta",
    "eip155:1284": "moonbeam",
    "eip155:10": "optimism",
    "eip155:11297108109": "palm",
    "eip155:1442": "polygon-zkevm",
    "eip155:1380012617": "rari",
    "eip155:534352": "scroll",
    "eip155:324": "zksync-era",
    "eip155:7777777": "zora",
    "eip155:5": "ethereum-goerli",
    "eip155:4": "ethereum-rinkeby",
    "eip155:11155111": "ethereum-sepolia",
    "solana:103": "solana-devnet",
    "solana:102": "solana-testnet",
    "eip155:80001": "polygon-mumbai",
    "eip155:421613": "arbitrum-goerli",
    "eip155:421614": "arbitrum-sepolia",
    "eip155:912559": "astria-devnet",
    "eip155:43113": "avalanche-fuji",
    "eip155:84531": "base-goerli",
    "eip155:84532": "base-sepolia",
    "eip155:97": "bsc-testnet",
    "eip155:68840142": "frame-testnet",
    "eip155:71401": "godwoken-testnet",
    "eip155:59140": "linea-testnet",
    "eip155:3441005": "manta-testnet",
    "eip155:20482050": "hokum-testnet",
    "eip155:420": "optimism-goerli",
    "eip155:11155420": "optimism-sepolia",
    "eip155:11297108099": "palm-testnet",
    "palm-testnet-edge": "palm-testnet-edge",
    "eip155:1918988905": "rari-testnet",
    "eip155:534353": "scroll-testnet",
    "eip155:534351": "scroll-sepolia",
    "tezos-ghostnet": "tezos-ghostnet",
    "eip155:280": "zksync-era-testnet",
    "eip155:999": "zora-testnet",
    "eip155:999999999": "zora-sepolia",
};
const getChainContent = async (contentId) => {
    const asset = parseChainUri(contentId);
    if (asset.spec === "erc721" || asset.spec === "erc1155") {
        return await handleNftContent(asset);
    }
};
exports.getChainContent = getChainContent;
const parseChainUri = (uri) => {
    const [chainId, specAndContract, tokenId] = uri
        .replace("chain://", "")
        .split("/");
    const [spec, contractAddress] = specAndContract.split(":");
    return {
        contentId: uri,
        chainId: CHAIN_ID_TO_NAME[chainId] || chainId,
        spec: spec === "unknown" && tokenId ? "erc721" : spec,
        contractAddress,
        tokenId,
    };
};
const handleNftContent = async (asset) => {
    if (!asset.tokenId) {
        return await handleNftContract(asset);
    }
    return await handleNftToken(asset);
};
const handleNftContract = async (asset) => {
    var _a, _b;
    const response = await fetch(`${SIMPLEHASH_API_URL}/collections/${asset.chainId}/${asset.contractAddress}?include_top_contract_details=1`, {
        headers: {
            "X-API-KEY": process.env.SIMPLEHASH_API_KEY,
            accept: "application/json",
        },
    });
    if (!response.ok)
        return;
    const data = await response.json();
    const collection = (_a = data.collections) === null || _a === void 0 ? void 0 : _a[0];
    if (!collection)
        return;
    const contract = (_b = collection.top_contract_details) === null || _b === void 0 ? void 0 : _b.find(({ contract_address }) => contract_address.toLowerCase() === asset.contractAddress.toLowerCase());
    return collection;
};
const handleNftToken = async (asset) => {
    const response = await fetch(`${SIMPLEHASH_API_URL}/${asset.chainId}/${asset.contractAddress}/${asset.tokenId}`, {
        headers: {
            "X-API-KEY": process.env.SIMPLEHASH_API_KEY,
            accept: "application/json",
        },
    });
    if (!response.ok)
        return;
    const nft = await response.json();
    return nft;
};
//# sourceMappingURL=chain.js.map