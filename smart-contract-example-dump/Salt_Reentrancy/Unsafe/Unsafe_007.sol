/**
    Unsafe Case No.7
    From Reentrancy Vulnerability Identification in Ethereum Smart Contracts
    By Noama Fatima Samreen, Manar H. Alalf
    https://arxiv.org/pdf/2105.02881.pdf[Reentrancy
 */


pragma solidity ^0.4.22;

contract reentrancyCrossFunction{
    mapping (address => uint) private balance;
    function transfer(address to, uint amount) {
        if (balance[msg.sender] >= amount){
            balance[to] += amount;
            balance[msg.sender] -= amount;
        }
    }
    function withdraw() public {
        uint amount = balance[msg.sender];
        require(msg.sender.call.value(amount)());
        balance[msg.sender] = 0;
    }
}

