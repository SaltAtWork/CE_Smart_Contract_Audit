/**
    Unsafe Case No.8
    From Reentrancy Vulnerability Identification in Ethereum Smart Contracts
    By Noama Fatima Samreen, Manar H. Alalf
    https://arxiv.org/pdf/2105.02881.pdf[Reentrancy
 */


pragma solidity ^0.4.22;

contract FairDareWithdraw{
    function withdraw() public {
    require(tx.origin == msg.sender, "");
    uint blocksPast = block.number - depositBlock[msg.sender];
    if (blocksPast <= 100) {
        uint amountToWithdraw = depositAmount[msg.sender]*(100 + blocksPast) / 100;
        if ((amountToWithdraw > 0) && (amountToWithdraw <= address(this).balance)){
            msg.sender.transfer(amountToWithdraw);depositAmount[msg.sender] = 0;
        }
    }
    }
}