/**
    Unsafe Case No.13
    From consensys's github
    https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/
 */

pragma solidity ^0.5.0;

contract consensysReentrancy{
    mapping (address => uint) private userBalances;

    function withdrawBalance() public {
        uint amountToWithdraw = userBalances[msg.sender];
        (bool success, ) = msg.sender.call.value(amountToWithdraw)(""); // At this point, the caller's code is executed, and can call withdrawBalance again
        require(success);
        userBalances[msg.sender] = 0;
    }
}