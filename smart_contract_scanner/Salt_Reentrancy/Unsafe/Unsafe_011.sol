/**
    Unsafe Case No.11
    From abertoletti's github
    https://github.com/abertoletti/Reentrancy-attack
 */

pragma solidity ^0.4.19;

contract PrivateBank {
    mapping (address => uint) public balances;
    
    uint public MinDeposit = 1 ether;
    
    function deposit() public payable {
        if (msg.value > MinDeposit) {
            balances[msg.sender] += msg.value;
        }
    }
    
    function cashOut(uint _am) public payable {
        if (_am <= balances[msg.sender]) {
            if (msg.sender.call.value(_am)()) {
                balances[msg.sender] -= _am;
            }
        }
    }
    
    function() public payable {} 
}