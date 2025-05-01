// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Auction is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _auctionIds;

    struct AuctionItem {
        address creator;
        string title;
        string description;
        string imageUrl;
        uint256 minimumBid;
        uint256 currentBid;
        address currentBidder;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isSettled;
    }

    mapping(uint256 => AuctionItem) public auctions;
    mapping(address => uint256[]) public userAuctions;
    mapping(address => uint256[]) public userBids;

    event AuctionCreated(
        uint256 indexed auctionId,
        address indexed creator,
        string title,
        uint256 minimumBid,
        uint256 endTime
    );

    event BidPlaced(
        uint256 indexed auctionId,
        address indexed bidder,
        uint256 amount
    );

    event AuctionSettled(
        uint256 indexed auctionId,
        address indexed winner,
        uint256 amount
    );

    modifier onlyAuctionCreator(uint256 auctionId) {
        require(
            auctions[auctionId].creator == msg.sender,
            "Only auction creator can perform this action"
        );
        _;
    }

    modifier auctionExists(uint256 auctionId) {
        require(auctions[auctionId].creator != address(0), "Auction does not exist");
        _;
    }

    modifier auctionActive(uint256 auctionId) {
        require(auctions[auctionId].isActive, "Auction is not active");
        _;
    }

    function createAuction(
        string memory title,
        string memory description,
        string memory imageUrl,
        uint256 minimumBid,
        uint256 duration
    ) external {
        require(minimumBid > 0, "Minimum bid must be greater than 0");
        require(duration > 0, "Duration must be greater than 0");

        _auctionIds.increment();
        uint256 auctionId = _auctionIds.current();

        auctions[auctionId] = AuctionItem({
            creator: msg.sender,
            title: title,
            description: description,
            imageUrl: imageUrl,
            minimumBid: minimumBid,
            currentBid: 0,
            currentBidder: address(0),
            startTime: block.timestamp,
            endTime: block.timestamp + duration,
            isActive: true,
            isSettled: false
        });

        userAuctions[msg.sender].push(auctionId);

        emit AuctionCreated(auctionId, msg.sender, title, minimumBid, block.timestamp + duration);
    }

    function placeBid(uint256 auctionId) external payable auctionExists(auctionId) auctionActive(auctionId) nonReentrant {
        AuctionItem storage auction = auctions[auctionId];
        
        require(block.timestamp < auction.endTime, "Auction has ended");
        require(msg.value > auction.currentBid, "Bid must be higher than current bid");
        require(msg.value >= auction.minimumBid, "Bid must be at least minimum bid");

        if (auction.currentBidder != address(0)) {
            // Return previous bidder's funds
            payable(auction.currentBidder).transfer(auction.currentBid);
        }

        auction.currentBid = msg.value;
        auction.currentBidder = msg.sender;
        userBids[msg.sender].push(auctionId);

        emit BidPlaced(auctionId, msg.sender, msg.value);
    }

    function settleAuction(uint256 auctionId) external auctionExists(auctionId) nonReentrant {
        AuctionItem storage auction = auctions[auctionId];
        
        require(block.timestamp >= auction.endTime, "Auction has not ended yet");
        require(!auction.isSettled, "Auction already settled");
        require(
            msg.sender == auction.creator || msg.sender == auction.currentBidder,
            "Only creator or winner can settle"
        );

        auction.isActive = false;
        auction.isSettled = true;

        if (auction.currentBidder != address(0)) {
            // Transfer funds to creator
            payable(auction.creator).transfer(auction.currentBid);
        }

        emit AuctionSettled(auctionId, auction.currentBidder, auction.currentBid);
    }

    function getAuction(uint256 auctionId) external view returns (
        address creator,
        string memory title,
        string memory description,
        string memory imageUrl,
        uint256 minimumBid,
        uint256 currentBid,
        address currentBidder,
        uint256 startTime,
        uint256 endTime,
        bool isActive,
        bool isSettled
    ) {
        AuctionItem memory auction = auctions[auctionId];
        return (
            auction.creator,
            auction.title,
            auction.description,
            auction.imageUrl,
            auction.minimumBid,
            auction.currentBid,
            auction.currentBidder,
            auction.startTime,
            auction.endTime,
            auction.isActive,
            auction.isSettled
        );
    }

    function getUserAuctions(address user) external view returns (uint256[] memory) {
        return userAuctions[user];
    }

    function getUserBids(address user) external view returns (uint256[] memory) {
        return userBids[user];
    }
} 