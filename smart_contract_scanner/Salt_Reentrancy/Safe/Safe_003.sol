/**
    Safe Case No.3 **This might be Unsafe too
    From Ki Byung Kim & Jonghyup Lee's Automated Generation of Test Cases 
    for Smart Contract Security Analyzers
    https://www.researchgate.net/publication/347158347_Automated_Generation_of_Test_Cases_for_Smart_Contract_Security_Analyzers
 */

pragma solidity ^0.4.24;
contract reentrancy {
    mapping (address => uint) public balanceOf;
    uint public evenOdd = uint256(keccak256(now))%2;
    uint public lastPlayed;

    struct GuessHistory {
        address player;
        uint256 number;
    }

    //It's probably safe because If-else before reentrancy risk zone
    function withdrawBalance() public{
        GuessHistory guessHistory;
        guessHistory.player = msg.sender;
        guessHistory.number = 6;
        if(evenOdd == 0){
            uint amountToWithdraw = userBalances(msg.sender);
            (bool success,) = msg.sender.call.value(amountToWithdraw)("");
            require(success);
            userBalances(msg.sender) = 0;
            lastPlayed = now;
        }
    }
}