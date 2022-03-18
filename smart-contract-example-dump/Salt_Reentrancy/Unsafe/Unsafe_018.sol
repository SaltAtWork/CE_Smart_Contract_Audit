/**
    Unsafe Case No.18
    https://samsclass.info/141/proj/C353.htm
 */

pragma solidity ^0.4.8;

contract Rewards {
    uint public gifts;

    function allowGifts(uint num_gifts) public { gifts = num_gifts; }

    function withdraw() public {
        uint _amount = 1 ether;
        if (gifts > 0) {
           if (!msg.sender.call.value(_amount)()) revert(); 
           gifts -= 1;
        }
    }

    function deposit() payable public {}

    function getBalance() public constant returns(uint) { 
        address a = this;
        return a.balance; 
    }    
}