pragma solidity ^0.4.18;

contract TxOriginVictim {
    address owner;

    function TxOriginVictim() {
        owner = msg.sender;
    }

    function transferTo(address to, uint256 amount) public {
        require(tx.origin == owner);
        to.call.value(amount)();
    }
}
