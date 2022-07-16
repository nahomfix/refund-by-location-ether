// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract Refund {
    struct Location {
        uint lat;
        uint lng;
    }

    address public owner;
    uint public radius;
    uint public timeLimit;
    Location public officeLocation;
    address[] public employees;
    uint public maxBalance;

    // function() public payable {}

    constructor(address _owner, uint _officeLocationLat, uint _officeLocationLng, uint _radius, uint _timeLimit) {
        owner = _owner;
        officeLocation = Location({lat: _officeLocationLat, lng: _officeLocationLng });
        radius = _radius;
        timeLimit = _timeLimit;
    }

    function deposit() public payable {
        require(msg.sender == owner, "Must be owner");
        maxBalance = msg.value;
    }

    function addEmployee(address _employeeAddress) public {
        require(!checkIfEmployeeKnown(_employeeAddress), "Already an employee");
        require(msg.sender == owner, "Must be owner");
        employees.push(_employeeAddress);
    }

    function getEmployees() view public returns (address[] memory) {
        return employees;
    }

    function checkIfEmployeeKnown(address _employeeAddress) view public returns(bool) {
        for (uint i = 0; i < employees.length; i++) {
            if (employees[i] == _employeeAddress) return true;
        }
        return false;
    }

    // check if the location of the employee is in range
    function isUserLocationInRange(Location memory employeeLocation) private {}

    // report the location of the employee
    function reportLocation(uint _employeeLocationLat, uint _employeeLocationLng) public {
        require(checkIfEmployeeKnown(msg.sender), "Unknown employee");
        require(msg.sender != owner, "Must not be owner");
        uint payment = maxBalance / timeLimit;
        payable(msg.sender).transfer(payment);
        console.log("Lat: ", _employeeLocationLat);
        console.log("Lng: ", _employeeLocationLng);
    }
}
