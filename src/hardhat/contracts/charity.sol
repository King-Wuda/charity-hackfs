// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract charity {
    constructor() {}

    struct Cause {
        uint256 id;
        address person;
        uint256 goal;
    }

    struct Donor {
        uint256 donorCount;
        address donor;
        uint256 amount;
    }

    event CauseListed(uint256 id, address person, uint256 goal);

    event CauseCancelled(uint256 id, address person);

    event GoalHit(uint256 id, address person, uint256 goal);

    event Donated(uint256 donorCount, address donor, uint256 amount);

    event DonorCancelled(uint256 donorCount, address donor);

    event ProceedsWithdrawn(uint256 id, address person, uint256 proceeds);

    mapping(address => mapping(uint256 => Donor)) private donors;
    mapping(address => mapping(uint256 => Cause)) private listings;
    mapping(address => uint256) private proceeds;
    mapping(address => uint256) private donation;

    modifier notListed(uint256 id, address person) {
        Cause memory listing = listings[person][id];
        require(listing.goal > 0, "Already Listed");
        _;
    }

    modifier isListed(uint256 id, address person) {
        Cause memory listing = listings[person][id];
        require(listing.goal <= 0, "Not Listed");
        _;
    }

    modifier hasDonated(uint256 donorCount, address donor) {
        Donor memory dons = donors[donor][donorCount];
        require(dons.amount <= 0, "Has Not Donated to Cause");
        _;
    }

    modifier isOwner(uint256 id, address person) {
        Cause memory listing = listings[person][id];
        address owner = listing.person;
        require(msg.sender == owner, "Not Owner");
        _;
    }

    function listCause(
        uint256 id,
        address person,
        uint256 goal
    ) external notListed(id, msg.sender) {
        listings[person][id] = Cause(id, person, goal);
        emit CauseListed(id, msg.sender, goal);
        id++;
    }

    function CancelListing(uint256 id, address person)
        external
        isListed(id, person)
        isOwner(id, person)
    {
        delete (listings[person][id]);
        emit CauseCancelled(id, msg.sender);
    }

    function Donate(
        uint256 id,
        address person,
        uint256 donorCount,
        address donor,
        uint256 amount
    ) external payable isListed(id, person) {
        amount = msg.value;
        Cause memory listedCause = listings[person][id];
        uint256 goal = listedCause.goal;
        donors[donor][donorCount] = Donor(donorCount, msg.sender, amount);
        emit Donated(donorCount, msg.sender, amount);
        proceeds[listedCause.person] += amount;
        donation[msg.sender] += msg.value;
        if (proceeds[listedCause.person] >= goal) {
            emit GoalHit(id, person, goal);
        }
        // donor gets nft
        donorCount++;
    }

    function DonorCancel(uint256 donorCount, address donor)
        external
        hasDonated(donorCount, donor)
    {
        donation[donor] = 0;
        // Transfer vs call vs Send
        // payable(msg.sender).transfer(address(this).balance);
        (bool success, ) = donor.call{value: donation[donor]}("");
        require(success);
        emit DonorCancelled(donorCount, donor);
    }

    function UpdateCause(
        uint256 id,
        address person,
        uint256 newGoal
    ) external isListed(id, person) isOwner(id, msg.sender) {
        listings[person][id].goal = newGoal;
        emit CauseListed(id, msg.sender, newGoal);
    }

    function WithdrawProceeds(uint256 id, address person)
        external
        isListed(id, person)
        isOwner(id, msg.sender)
    {
        uint256 balance = proceeds[msg.sender];
        require(balance > 0, "No proceeds");
        balance = 0;
        (bool success, ) = payable(msg.sender).call{value: balance}("");
        require(success, "Transfer failed");
        emit ProceedsWithdrawn(id, msg.sender, balance);
    }

    function getListing(uint256 ad, address person)
        external
        view
        returns (Cause memory)
    {
        return listings[person][ad];
    }

    function getProceeds(address person) external view returns (uint256) {
        return proceeds[person];
    }
}
