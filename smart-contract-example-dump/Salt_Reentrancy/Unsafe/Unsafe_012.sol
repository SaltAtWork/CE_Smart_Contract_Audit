/**
    Unsafe Case No.12
    From abertoletti's github
    https://github.com/abertoletti/Reentrancy-attack
 */

pragma solidity ^0.5.8;

contract HoneyPot {
    mapping (address => uint) public balances;

    constructor() public  payable {
        put();
    }

    function put() public payable {
        balances[msg.sender] = msg.value;
    }

    function get() public {
        (bool res, bytes memory x) = msg.sender.call.value(balances[msg.sender])("");
        if(!res) {
            revert();
        }
        balances[msg.sender] = 0;
    }

    function() external {
        revert();
    }
}