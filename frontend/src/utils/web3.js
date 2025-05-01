import { ethers } from 'ethers';

export const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

export const formatBalance = (balance) => {
  return ethers.utils.formatEther(balance);
};

export const parseBalance = (balance) => {
  return ethers.utils.parseEther(balance.toString());
};

export const getNetworkName = (chainId) => {
  switch (chainId) {
    case 1:
      return 'Ethereum Mainnet';
    case 3:
      return 'Ropsten Testnet';
    case 4:
      return 'Rinkeby Testnet';
    case 5:
      return 'Goerli Testnet';
    case 42:
      return 'Kovan Testnet';
    case 1337:
      return 'Local Network';
    default:
      return 'Unknown Network';
  }
};

export const isSupportedNetwork = (chainId) => {
  return [1, 3, 4, 5, 42, 1337].includes(chainId);
};

// Dummy contract ABI for testing
export const auctionABI = [
  "function placeBid(uint256 auctionId) payable",
  "function createAuction(string memory title, string memory description, uint256 minimumBid, uint256 duration) public",
  "function endAuction(uint256 auctionId) public",
  "function getAuction(uint256 auctionId) public view returns (tuple)",
  "event AuctionCreated(uint256 indexed auctionId, address indexed creator)",
  "event BidPlaced(uint256 indexed auctionId, address indexed bidder, uint256 amount)",
  "event AuctionEnded(uint256 indexed auctionId, address indexed winner, uint256 amount)"
]; 