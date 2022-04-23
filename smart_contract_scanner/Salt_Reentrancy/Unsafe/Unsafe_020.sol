/**
    Unsafe Case No.20
    https://ethereum-contract-security-techniques-and-tips.readthedocs.io/en/latest/known_attacks/
 */

pragma solidity ^0.4;

contract knownSolidityMultiFunction {
    mapping(address => uint256) private userBalances;

    function transfer(address to, uint256 amount) {
        if (userBalances[msg.sender] >= amount) {
            userBalances[to] += amount;
            userBalances[msg.sender] -= amount;
        }
    }

    function withdrawBalance() public {
        uint256 amountToWithdraw = userBalances[msg.sender];
        require(msg.sender.call.value(amountToWithdraw)()); // At this point, the caller's code is executed, and can call transfer()
        userBalances[msg.sender] = 0;
    }
}
