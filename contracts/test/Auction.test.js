const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Auction", function () {
  let Auction;
  let auction;
  let owner;
  let bidder1;
  let bidder2;

  beforeEach(async function () {
    [owner, bidder1, bidder2] = await ethers.getSigners();
    Auction = await ethers.getContractFactory("Auction");
    auction = await Auction.deploy();
    await auction.deployed();
  });

  describe("createAuction", function () {
    it("Should create a new auction", async function () {
      const title = "Test Auction";
      const description = "Test Description";
      const imageUrl = "https://example.com/image.jpg";
      const minimumBid = ethers.utils.parseEther("0.1");
      const duration = 3600; // 1 hour

      await auction.createAuction(
        title,
        description,
        imageUrl,
        minimumBid,
        duration
      );

      const auctionInfo = await auction.getAuction(1);
      expect(auctionInfo.creator).to.equal(owner.address);
      expect(auctionInfo.title).to.equal(title);
      expect(auctionInfo.minimumBid).to.equal(minimumBid);
      expect(auctionInfo.isActive).to.be.true;
    });
  });

  describe("placeBid", function () {
    it("Should allow placing a bid", async function () {
      const minimumBid = ethers.utils.parseEther("0.1");
      await auction.createAuction(
        "Test Auction",
        "Test Description",
        "https://example.com/image.jpg",
        minimumBid,
        3600
      );

      const bidAmount = ethers.utils.parseEther("0.2");
      await auction.connect(bidder1).placeBid(1, { value: bidAmount });

      const auctionInfo = await auction.getAuction(1);
      expect(auctionInfo.currentBid).to.equal(bidAmount);
      expect(auctionInfo.currentBidder).to.equal(bidder1.address);
    });

    it("Should not allow bids lower than minimum bid", async function () {
      const minimumBid = ethers.utils.parseEther("0.1");
      await auction.createAuction(
        "Test Auction",
        "Test Description",
        "https://example.com/image.jpg",
        minimumBid,
        3600
      );

      const bidAmount = ethers.utils.parseEther("0.05");
      await expect(
        auction.connect(bidder1).placeBid(1, { value: bidAmount })
      ).to.be.revertedWith("Bid must be at least minimum bid");
    });

    it("Should not allow bids lower than current bid", async function () {
      const minimumBid = ethers.utils.parseEther("0.1");
      await auction.createAuction(
        "Test Auction",
        "Test Description",
        "https://example.com/image.jpg",
        minimumBid,
        3600
      );

      const firstBid = ethers.utils.parseEther("0.2");
      await auction.connect(bidder1).placeBid(1, { value: firstBid });

      const secondBid = ethers.utils.parseEther("0.15");
      await expect(
        auction.connect(bidder2).placeBid(1, { value: secondBid })
      ).to.be.revertedWith("Bid must be higher than current bid");
    });
  });

  describe("settleAuction", function () {
    it("Should settle an auction", async function () {
      const minimumBid = ethers.utils.parseEther("0.1");
      await auction.createAuction(
        "Test Auction",
        "Test Description",
        "https://example.com/image.jpg",
        minimumBid,
        3600
      );

      const bidAmount = ethers.utils.parseEther("0.2");
      await auction.connect(bidder1).placeBid(1, { value: bidAmount });

      // Fast forward time
      await ethers.provider.send("evm_increaseTime", [3600]);
      await ethers.provider.send("evm_mine", []);

      await auction.settleAuction(1);

      const auctionInfo = await auction.getAuction(1);
      expect(auctionInfo.isActive).to.be.false;
      expect(auctionInfo.isSettled).to.be.true;
    });

    it("Should not allow settling before end time", async function () {
      const minimumBid = ethers.utils.parseEther("0.1");
      await auction.createAuction(
        "Test Auction",
        "Test Description",
        "https://example.com/image.jpg",
        minimumBid,
        3600
      );

      await expect(auction.settleAuction(1)).to.be.revertedWith(
        "Auction has not ended yet"
      );
    });
  });
}); 