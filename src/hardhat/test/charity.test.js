const { assert, expect } = require("chai");
const { network, deployments, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Charity Platform Unit Tests", function () {
      let charity, charityContract;
      const person = "0x0C13DCfc50a466a63692C518239E036bd1fc117C";
      const donor = "0xeE57B3a7F65C1139023946B1081818915873Fd21";
      const goal = ethers.utils.parseEther("0.1");
      const id = 0;
      const donorCount = 0;
      const amount = 0.1;

      beforeEach(async () => {
        accounts = await ethers.getSigners(); // could also do with getNamedAccounts
        deployer = accounts[0];
        user = accounts[1];
        await deployments.fixture(["all", "charity"]);
        charityContract = await ethers.getContractFactory("Charity");
        charity = charityContract.connect(deployer);
        // basicNftContract = await ethers.getContract("BasicNft");
        // basicNft = await basicNftContract.connect(deployer);
        // await basicNft.mintNft();
        // await basicNft.approve(charityContract.address, person);
      });

      describe("listCause", function () {
        it("emits an event after listing a Cause", async function () {
          expect(await charityContract.listCause(id, person, goal)).to.emit(
            "CauseListed"
          );
        });
        it("exclusively items that haven't been listed", async function () {
          await charity.listCause(id, person, goal);
          //const error = `AlreadyListed("${id}", ${person})`;
          await expect(charity.listCause(id, person, goal)).to.be.revertedWith(
            "AlreadyListed"
          );
          //   await expect(
          //     charity.listCause(id, person, goal)
          //   ).to.be.revertedWith(error);
        });
        it("Updates listing with person and goal", async function () {
          await charity.listCause(id, person, goal);
          const listing = await charity.getListing(id, person);
          assert(listing.goal.toString() == goal.toString());
          assert(listing.person.toString() == deployer.address);
        });
      });
      describe("CancelListing", function () {
        it("reverts if there is no listing", async function () {
          const error = `NotListed("${id}", ${person})`;
          await expect(charity.CancelListing(id, person)).to.be.revertedWith(
            error
          );
        });
        it("reverts if anyone but the owner tries to call", async function () {
          await charity.listCause(id, person, goal);
          charity = charityContract.connect(user);
          await basicNft.approve(user.address, person);
          await expect(charity.CancelListing(id, person)).to.be.revertedWith(
            "Not Owner"
          );
        });
        it("emits event and removes listing", async function () {
          await charity.listCause(id, person, goal);
          expect(await charity.CancelListing(id, person)).to.emit(
            "CauseCancelled"
          );
          const listing = await charity.getListing(id, person);
          assert(listing.goal.toString() == "0");
        });
      });
      describe("Donate", function () {
        it("reverts if the item isnt listed", async function () {
          await expect(charity.Donate(donorCount, donor)).to.be.revertedWith(
            "Not Listed"
          );
        }); // emit item donated, emit goal hit
        it("emits event after Donating", async function () {
          await charity.Donate(id, person, donorCount, donor, amount);
          expect(
            await charity.Donate(id, person, donorCount, donor, amount)
          ).to.emit("Donated");
        });
        it("emits an event after goal hit", async function () {
          await charity.listCause(id, person, goal);
          await charity.Donate(id, person, donorCount, donor, amount);
          if (amount >= goal) {
            expect(
              await charity.Donate(id, person, donorCount, donor, amount)
            ).to.emit("GoalHit");
          }
        });
        // it("transfers the nft to the buyer and updates internal proceeds record", async function () {
        //   await charity.listCause(id, person, goal);
        //   charity = charityContract.connect(user);
        //   expect(
        //     await charity.Donate(id, person, {
        //       value: goal,
        //     })
        //   ).to.emit("ItemBought");
        //   const newOwner = await basicNft.ownerOf(person);
        //   const deployerProceeds = await charity.getProceeds(deployer.address);
        //   assert(newOwner.toString() == user.address);
        //   assert(deployerProceeds.toString() == goal.toString());
        // });
      });
      describe("DonorCancel", function () {
        it("reverts if the item isnt listed", async function () {
          await expect(
            charity.DonorCancel(donorCount, user)
          ).to.be.revertedWith("Not Listed");
        });
        it("emits DonorCancelled event", async function () {
          await charity.listCause(id, person, goal);
          await charity.Donate(id, person, donorCount, donor, amount);
          expect(await charity.DonorCancel(donorCount, donor)).to.emit(
            "DonorCancelled"
          );
        });
      });
      describe("UpdateCause", function () {
        it("must be owner and listed", async function () {
          await expect(
            charity.UpdateCause(id, person, goal)
          ).to.be.revertedWith("Not Listed");
          await charity.listCause(id, person, goal);
          charity = charityContract.connect(user);
          await expect(
            charity.UpdateCause(id, person, goal)
          ).to.be.revertedWith("Not Owner");
        });
        it("updates the goal of the item", async function () {
          const updatedgoal = ethers.utils.parseEther("0.2");
          await charity.listCause(id, person, goal);
          expect(await charity.UpdateCause(id, person, updatedgoal)).to.emit(
            "CauseListed"
          );
          const listing = await charity.getListing(id, person);
          assert(listing.goal.toString() == updatedgoal.toString());
        });
      });
      describe("withdrawProceeds", function () {
        it("doesn't allow 0 proceed withdrawals", async function () {
          await expect(charity.withdrawProceeds()).to.be.revertedWith(
            "No proceeds"
          );
        });
        it("withdraws proceeds", async function () {
          await charity.listCause(id, person, goal);
          charity = charityContract.connect(user);
          await charity.Donate(id, person, {
            value: goal,
          });
          charity = charityContract.connect(deployer);

          const deployerProceedsBefore = await charity.getProceeds(
            deployer.address
          );
          const deployerBalanceBefore = await deployer.getBalance();
          const txResponse = await charity.withdrawProceeds();
          const transactionReceipt = await txResponse.wait(1);
          const { gasUsed, effectiveGasgoal } = transactionReceipt;
          const gasCost = gasUsed.mul(effectiveGasgoal);
          const deployerBalanceAfter = await deployer.getBalance();

          assert(
            deployerBalanceAfter.add(gasCost).toString() ==
              deployerProceedsBefore.add(deployerBalanceBefore).toString()
          );
        });
      });
    });
