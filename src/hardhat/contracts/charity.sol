// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Charity {
    constructor() {
        id = 0;
        donorCount = 0;
    }

    uint256 id;
    uint256 donorCount;

    struct Cause {
        uint256 oldId;
        address person;
        uint256 goal;
    }

    struct Donor {
        uint256 oldDonorCount;
        address donor;
        uint256 amount;
    }

    event CauseListed(uint256 oldId, address person, uint256 goal);

    event CauseCancelled(uint256 oldId, address person);

    event GoalHit(uint256 oldId, address person, uint256 goal);

    event Donated(uint256 oldDonorCount, address donor, uint256 amount);

    event DonorCancelled(uint256 oldDonorCount, address donor);

    event ProceedsWithdrawn(uint256 oldId, address person, uint256 proceeds);

    mapping(address => mapping(uint256 => Donor)) private donors;
    mapping(address => mapping(uint256 => Cause)) private listings;
    mapping(address => uint256) private proceeds;
    mapping(address => uint256) private donation;

    modifier notListed(uint256 oldId, address person) {
        Cause memory listing = listings[person][oldId];
        require(listing.goal > 0, "Already Listed");
        _;
    }

    modifier isListed(uint256 oldId, address person) {
        Cause memory listing = listings[person][oldId];
        require(listing.goal <= 0, "Not Listed");
        _;
    }

    modifier hasDonated(uint256 oldDonorCount, address donor) {
        Donor memory dons = donors[donor][oldDonorCount];
        require(dons.amount > 0, "Has Not Donated to Cause");
        _;
    }

    modifier isOwner(uint256 oldId, address person) {
        Cause memory listing = listings[person][oldId];
        address owner = listing.person;
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function listCause(uint256 goal) external notListed(id, msg.sender) {
        listings[msg.sender][id] = Cause(id, msg.sender, goal);
        emit CauseListed(id, msg.sender, goal);
        id++;
    }

    function CancelListing(uint256 oldId)
        external
        isListed(oldId, msg.sender)
        isOwner(oldId, msg.sender)
    {
        delete (listings[msg.sender][oldId]);
        emit CauseCancelled(oldId, msg.sender);
    }

    function Donate(uint256 oldId, address person)
        external
        payable
        isListed(oldId, person)
    {
        uint256 amount = msg.value;
        Cause memory listedCause = listings[person][oldId];
        uint256 goal = listedCause.goal;
        donors[msg.sender][donorCount] = Donor(donorCount, msg.sender, amount);
        emit Donated(donorCount, msg.sender, amount);
        proceeds[listedCause.person] += amount;
        donation[msg.sender] += msg.value;
        if (proceeds[listedCause.person] >= goal) {
            emit GoalHit(oldId, person, goal);
        }
        // donor gets nft
        donorCount++;
    }

    function DonorCancel(uint256 oldDonorCount)
        external
        hasDonated(oldDonorCount, msg.sender)
    {
        donation[msg.sender] = 0;
        address donor = msg.sender;
        // Transfer vs call vs Send
        // payable(msg.sender).transfer(address(this).balance);
        (bool success, ) = donor.call{value: donation[msg.sender]}("");
        require(success);
        emit DonorCancelled(oldDonorCount, msg.sender);
    }

    function UpdateCause(uint256 oldId, uint256 newGoal)
        external
        isListed(oldId, msg.sender)
        isOwner(oldId, msg.sender)
    {
        listings[msg.sender][oldId].goal = newGoal;
        emit CauseListed(oldId, msg.sender, newGoal);
    }

    function WithdrawProceeds(uint256 oldId)
        external
        isListed(oldId, msg.sender)
        isOwner(oldId, msg.sender)
    {
        uint256 balance = proceeds[msg.sender];
        require(balance > 0, "No proceeds");
        balance = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Transfer failed");
        emit ProceedsWithdrawn(oldId, msg.sender, balance);
    }

    function getListing(uint256 oldId) external view returns (Cause memory) {
        return listings[msg.sender][oldId];
    }

    function getProceeds() external view returns (uint256) {
        return proceeds[msg.sender];
    }
}
