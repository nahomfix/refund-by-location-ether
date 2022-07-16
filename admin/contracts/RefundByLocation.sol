// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";


contract RefundByLocation {
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
    uint public PI = 3141592653589793238;
    uint public EARTHRADIUS = 6371;
    uint public LOCATIONFACTOR = 1000000;
    uint public WEIFACTOR = 1000000000000000000;

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

    function sqrt(uint x) pure public returns (uint y){
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    // check if the location of the employee is in range
    function isUserLocationInRange(Location memory employeeLocation) private {
        uint lat = employeeLocation.lat - officeLocation.lat; // Difference of latitude
        uint lon = employeeLocation.lng - officeLocation.lng; // Difference of longitude

        uint disLat = (lat * PI * EARTHRADIUS) / 180; // Vertical distance
        uint disLon = (lon * PI * EARTHRADIUS) / 180; // Horizontal distance

        uint distance = sqrt((disLat)**2 + (disLon)**2); // distance in kms
        if (distance <= (radius * WEIFACTOR)) {
            uint payment = maxBalance / timeLimit;
            payable(msg.sender).transfer(payment);
        }
    }

    // report the location of the employee
    function reportLocation(uint _employeeLocationLat, uint _employeeLocationLng) public {
        require(checkIfEmployeeKnown(msg.sender), "Unknown employee");
        require(msg.sender != owner, "Must not be owner");
        isUserLocationInRange(Location({lat: _employeeLocationLat, lng: _employeeLocationLng}));
    }
}
