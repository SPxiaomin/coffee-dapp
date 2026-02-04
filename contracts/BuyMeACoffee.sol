// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract BuyMeACoffee {
    // Equivalent to a Type or Interface in TS
    struct Memo {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // A list to store all the tips we receive (Our "Databaes")
    Memo[] memos;

    // Address of the contract owner (You!)
    address payable public owner;

    constructor() {
        owner = payable(msg.sender); // The person who deploys the contract
    }

    // Function to buy a coffee
    function buyCoffee(string memory _name, string memory _message) public payable {
        // Require that the tip is more than 0
        require(msg.value > 0, "Can't buy coffee with 0 eth!");

        // add the memo to the list
        memos.push(Memo(msg.sender, block.timestamp, _name, _message));
    }

    // Function to withdraw the funds to your wallet
    function withdrawTips() public {
        require(msg.sender == owner, "Only the owner can withdraw.");
        owner.transfer(address(this).balance);
    }

    // Function to get all the memos
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}