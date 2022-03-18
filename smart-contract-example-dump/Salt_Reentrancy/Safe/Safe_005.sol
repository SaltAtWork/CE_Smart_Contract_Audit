/**
    Safe Case No.5
    From Reentrancy Vulnerability Identification in Ethereum Smart Contracts
    By Noama Fatima Samreen, Manar H. Alalf
    https://arxiv.org/pdf/2105.02881.pdf[Reentrancy
 */

pragma solidity ^0.4.22;

contract reentrancySingleFunction {
    mapping(address => uint256) public balances;

    function transferBalance(address receiver, uint amount) public {
        require(balances[msg.sender] >= amount);
        balances[receiver] -= amount;
        //LogTransactions(msg.sender,receiver, amount);
        receiver.transfer(amount);
    }
}