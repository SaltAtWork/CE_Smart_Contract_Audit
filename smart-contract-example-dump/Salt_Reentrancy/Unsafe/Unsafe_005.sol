/**
    Unsafe Case No.5
    From Ki Byung Kim & Jonghyup Lee's Automated Generation of Test Cases 
    for Smart Contract Security Analyzers
    https://www.researchgate.net/publication/347158347_Automated_Generation_of_Test_Cases_for_Smart_Contract_Security_Analyzers
 */

pragma solidity >=0.5.0;

contract Example{
    mapping (address => uint) private userBalances;

    function withdrawBalance() public {
        uint amountToWithdraw = userBalances(msg.sender);
        (bool success,) = msg.sender.call.value(amountToWithdraw)("");
        require(success);
        userBalances(msg.sender) = 0;
    }
}