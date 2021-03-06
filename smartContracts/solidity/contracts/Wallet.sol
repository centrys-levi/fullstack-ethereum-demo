pragma solidity ^0.4.16;

contract Wallet {
  uint public fiatAmount;

  constructor (uint _fiatAmount) public {
    fiatAmount = _fiatAmount;
  }

  function topUp (uint amount) public {
    fiatAmount = fiatAmount + amount;
  }

  function withdraw (uint amount) public {
    fiatAmount = fiatAmount - amount;
  }
}
