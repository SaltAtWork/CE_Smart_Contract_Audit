/**
    Unsafe Case No.15
    From tobias's "How to understand re-entrancy attacks as a new Solidity dev"
    https://mirror.xyz/0xcd571BE4FFd43B3464322134B74C7227076D9B10/TJbz-JXsADz4ZIqe1AqTD2Fh4TMBiVgNWmKLBTbitek
 */

pragma solidity ^0.8.0;

contract Deposit {

    mapping(address => uint) public userBalances;

    function depositEth() public payable {
        userBalances[msg.sender] += msg.value;
    }

    function withdrawEth() public {
        uint balance = userBalances[msg.sender];
        require(balance > 0, "Balance can't be 0");

        (bool sent, ) = msg.sender.call{value: balance}("");
        require(sent, "Failed to send ETH");

        userBalances[msg.sender] = 0;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}