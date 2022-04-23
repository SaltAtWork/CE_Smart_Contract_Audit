/**
    Unsafe Case No.14
    From consensys's github
    https://consensys.github.io/smart-contract-best-practices/attacks/reentrancy/
 */

pragma solidity ^0.5.0;

contract consensysReentrancy {
    mapping(address => uint256) private userBalances;

    function transfer(address to, uint256 amount) {
        if (userBalances[msg.sender] >= amount) {
            userBalances[to] += amount;
            userBalances[msg.sender] -= amount;
        }
    }

    function withdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        (bool success, ) = msg.sender.call.value(amountToWithdraw)(""); // At this point, the caller's code is executed, and can call transfer()
        require(success);
        userBalances[msg.sender] = 0;
    }
}
