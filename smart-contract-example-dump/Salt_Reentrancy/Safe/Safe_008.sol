/**
    Safe Case No.8
    From consensys's github
    https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/
 */

pragma solidity ^0.5.0;

contract consensysReentrancy{
    mapping (address => uint) private userBalances;

    function withdrawBalance() public {
        uint amountToWithdraw = userBalances[msg.sender];
        userBalances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amountToWithdraw)(""); // The user's balance is already 0, so future invocations won't withdraw anything
        require(success);
    }
}