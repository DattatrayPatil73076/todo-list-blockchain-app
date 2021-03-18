// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.10 <0.8.0;

//Contract to Store ToDos
contract ToDoListContract{
    
    //Variables Declaration
    string private contractName;
    address private owner;
    
    struct ToDo{
        uint id;
        string todo;
        bool status;
        uint timestamp;
    }
    
    mapping(address => ToDo[]) user;
    
    //Event Declaration
    event contractInfo(string indexed contractName, address indexed owner);
    event todoCreated(string indexed todo, bool indexed status);
    
    //Constructor sets Contract Information and Owner
    constructor() public {
        contractName = "ToDo Contract";
        owner = msg.sender; // contract deployer
        emit contractInfo(contractName, owner);
    }
    
    //Functions to Create and Set ToDos to Done
    function createToDo (string memory _todo, uint _timestamp) public {
        uint tempId = user[msg.sender].length;
        user[msg.sender].push(ToDo({id: tempId, todo: _todo, status: false, timestamp: _timestamp}));
        emit todoCreated(_todo, false);
    }
    
    function setToDoDone(uint _index) public{
        require(user[msg.sender][_index].timestamp != 0 , 'Form Does Not Exists');
        user[msg.sender][_index].status = true;
    }
    
    //Functions to get ToDos Information
    function getToDo(uint _index) external view returns(uint, string memory, bool, uint) {
        require(user[msg.sender][_index].timestamp != 0 , 'Form Does Not Exists');
        ToDo memory todo = user[msg.sender][_index];
        return (todo.id, todo.todo, todo.status, todo.timestamp);
    }

    function getToDoLength() external view returns(uint) {
        return user[msg.sender].length;
    }
    
    //Send Contract Information
    function getContractInfo() external view returns (string memory, address) {
        return (contractName, owner);
    }
}