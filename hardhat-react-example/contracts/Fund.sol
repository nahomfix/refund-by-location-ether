// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "hardhat/console.sol";

contract Fund {
    uint private balance;
    uint private FACTOR = 10000000;
    uint private radius;

    struct Location {
        uint lat;
        uint lng;
    }

    struct Reference {
        uint stipend;
        uint maxBalance;
        uint radius;
        Location originalLocation;
    }

    Reference private reference;

    function deposit() payable public {
        balance = msg.value;
    }

    function check() view public returns (uint) {
        return balance;
    }

    function setRadius(uint _radius) public {
        radius = _radius;
    }

    function setInitialConfig(uint _lat, uint _lng, uint _radius, uint _stipend) payable public {
        reference = Reference(_stipend, msg.value, _radius, Location(_lat, _lng));
    }
    

}