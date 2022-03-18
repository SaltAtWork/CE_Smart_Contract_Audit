/**
    Unsafe Case No.10
    From A Mechanism to Detect and Prevent Ethereum Blockchain Smart Contract Reentrancy Attacks
    https://opal.latrobe.edu.au/articles/journal_contribution/A_Mechanism_to_Detect_and_Prevent_Ethereum_Blockchain_Smart_Contract_Reentrancy_Attacks/15033867
 */

pragma solidity >=0.4.26;

contract BankWithoutSolution{
    address private owner;
    mapping(address => uint) private customerBalance;

    constructor() public payable {
        owner = msg.sender;
        customerBalance[msg.sender] += msg.value;
    }

    function depositFunds() external payable returns(bool){
        require(msg.value > 0, "values not greater then zero");
        customerBalance[msg.sender] += msg.value;
        return true;
    }

    function withdrawFunds(uint _value) public payable{
        require(_value <= customerBalance[msg.sender], "account balance is low");
        msg.sender.call.value(_value)();
        customerBalance[msg.sender] -= _value;
    }

    function transfer(address to, uint amount) public{
        require(amount <= customerBalance[msg.sender], "account balance is low");
        customerBalance[to] += amount;
        customerBalance[msg.sender] -= amount;
    }

    function getBankLiquidity() external view returns(uint){
        return address(this).balance;
    }

    function getCustomerBalance() public view returns(uint){
        return customerBalance[msg.sender];
    }
}