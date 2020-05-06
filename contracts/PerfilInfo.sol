/*
  Author: Escudero Caporal Alan Enrique
  Date: 13/Diciembre/2019
  Version: 1.0.0
*/
pragma solidity ^0.5.11;

contract PerfilInfo {

    //Structs used
    struct UserStruct {
        string name;
        string description;
        string area;
        bool isActive;
    }
    
  //State Variables
  address public contractOwner;
  mapping (address => UserStruct) internal UserList;

  constructor() public {
    contractOwner = msg.sender;
  }

  function getData(address _user) external view returns (string memory, string memory, string memory){
    return (UserList[_user].name, UserList[_user].description, UserList[_user].area);
  }

  function updateMediacion(address _user, string memory _name, string memory _description, string memory _area) public{
    UserList[_user].name = _name;
    UserList[_user].description = _description;
    UserList[_user].area = _area;
    UserList[_user].isActive = true;
  }
}