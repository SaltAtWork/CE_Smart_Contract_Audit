/**
    Unsafe Case No.19
    https://ethereum-contract-security-techniques-and-tips.readthedocs.io/en/latest/known_attacks/
 */

pragma solidity ^0.4;

contract knownSolidity {
    mapping(address => uint256) private userBalances;

    function withdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        require(msg.sender.call.value(amountToWithdraw)()); // At this point, the caller's code is executed, and can call withdrawBalance again
        userBalances[msg.sender] = 0;
    }
}
