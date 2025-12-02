import { expect } from "chai";
import hre from "hardhat";

describe("UserRegistration", function () {
    let userRegistration;
    let owner, user1, user2;

    beforeEach(async function () {
        [owner, user1, user2] = await hre.ethers.getSigners();
        const UserRegistration = await hre.ethers.getContractFactory("UserRegistration");
        userRegistration = await UserRegistration.deploy();
    });

    describe("Registration", function () {
        it("Should register a new user successfully", async function () {
            await expect(userRegistration.connect(user1).register("Alice"))
                .to.emit(userRegistration, "UserRegistered")
                .withArgs(user1.address, "Alice");

            expect(await userRegistration.isUserRegistered(user1.address)).to.equal(true);
            expect(await userRegistration.getUsername(user1.address)).to.equal("Alice");
        });

        it("Should prevent duplicate registration", async function () {
            await userRegistration.connect(user1).register("Alice");
            
            await expect(userRegistration.connect(user1).register("Bob"))
                .to.be.revertedWithCustomError(userRegistration, "AlreadyRegistered");
        });

        it("Should reject empty username", async function () {
            await expect(userRegistration.connect(user1).register(""))
                .to.be.revertedWithCustomError(userRegistration, "EmptyUsername");
        });

        it("Should allow multiple different users to register", async function () {
            await userRegistration.connect(user1).register("Alice");
            await userRegistration.connect(user2).register("Bob");

            expect(await userRegistration.getUsername(user1.address)).to.equal("Alice");
            expect(await userRegistration.getUsername(user2.address)).to.equal("Bob");
        });
    });

    describe("Username Retrieval", function () {
        it("Should return correct username for registered user", async function () {
            await userRegistration.connect(user1).register("Alice");
            expect(await userRegistration.getUsername(user1.address)).to.equal("Alice");
        });

        it("Should revert when getting username of unregistered user", async function () {
            await expect(userRegistration.getUsername(user1.address))
                .to.be.revertedWithCustomError(userRegistration, "NotRegistered");
        });
    });

    describe("Registration Status Check", function () {
        it("Should return false for unregistered user", async function () {
            expect(await userRegistration.isUserRegistered(user1.address)).to.equal(false);
        });

        it("Should return true for registered user", async function () {
            await userRegistration.connect(user1).register("Alice");
            expect(await userRegistration.isUserRegistered(user1.address)).to.equal(true);
        });
    });
});
