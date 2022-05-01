pragma solidity ^0.5.16;

interface IAToken {
    //ERC20 functions
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function decimals() external view returns (uint8);

    //AToken functions

    /**
    * @dev redeems aToken for the underlying asset
    * @param _amount the amount being redeemed
    **/
    function redeem(uint256 _amount) external ;

}