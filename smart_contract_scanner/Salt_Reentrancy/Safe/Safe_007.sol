/**
    Safe Case No.7
    From Warodom Werapun
    https://werapun.com/reentrance-attack-in-solidity-d426f312e28a
 */


pragma solidity ^0.5;

contract EtherStore {
    bool internal locked;

    modifier noReentrant(){
        require(!locked, "No Reentrancy");
        locked = true;
        _;
        locked = false;
    }

    uint constant public WITHDRAWAL_LIMIT = 1 ether;
    mapping(address => uint) public lastWithdrawTime;
    mapping(address => uint) public balances;

    function withdraw(uint _amount) public noReentrant{
        require(balances[msg.sender] >= _amount);
        require(_amount <= WITHDRAWAL_LIMIT);
        require(block.timestamp >= lastWithdrawTime[msg.sender] + 1 weeks);

        balances[msg.sender] -= _amount;
        lastWithdrawTime[msg.sender] = block.timestamp;

        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Failed to send Ether");
    }

    function deposit() public payable{
        balances[msg.sender] += msg.value;
    }

    function getBalance() public view returns (uint){
        return address(this).balances;
    }

    function showBalance(address _addr) public view returns (uint){
        return balances[_addr];
    }
}