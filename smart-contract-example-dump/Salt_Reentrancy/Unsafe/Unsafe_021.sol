/**
    Unsafe Case No.21
    From fifteen82726's github
    https://github.com/fifiteen82726/Solidity-Reentrancy-Attack
 */

pragma solidity ^0.4.23;

/**
 * The victim contract explores the vulnerable spot
 */
contract Victim {
  uint balance = 100;

  function withdraw() {
    require (balance > 0);
    uint transferAmt = 1 ether;
    // the attack point
    msg.sender.call.value(transferAmt)();
    // set 0 to prevent user call it again
    balance = 0;
  }

  function() payable{}
}