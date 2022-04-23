/**
    Safe Case No.4 **This might be Unsafe too
    From Ki Byung Kim & Jonghyup Lee's Automated Generation of Test Cases 
    for Smart Contract Security Analyzers
    https://www.researchgate.net/publication/347158347_Automated_Generation_of_Test_Cases_for_Smart_Contract_Security_Analyzers
 */

pragma solidity ^0.4.3;
contract reentrancy{
    mapping (address => uint) public balanceOf;
    uint public challengeCoin = 0;
    uint public random;

    constructor() public{
        random = uint48(now/10) % 10;
    }

    function withdrawBalance() public {
        challengeCoin--;
        if(random < 10){
            uint amountToWithdraw = userBalances(msg.sender);
            (bool success,) = msg.sender.call.value(amountToWithdraw)("");
            require(success);
            userBalances(msg.sender) = 0;
        }
    }
}