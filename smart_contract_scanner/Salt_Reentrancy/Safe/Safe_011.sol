/**
    Safe Case No.11
    https://ethereum-contract-security-techniques-and-tips.readthedocs.io/en/latest/known_attacks/
 */

pragma solidity ^0.4;

contract knownSolidity {
    mapping(address => uint256) private userBalances;

    function withdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        userBalances[msg.sender] = 0;
        require(msg.sender.call.value(amountToWithdraw)()); // The user's balance is already 0, so future invocations won't withdraw anything
    }
}
