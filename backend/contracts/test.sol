// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract UserRegistration {
    struct User {
        string username;
        bool isRegistered;
    }

    mapping(address => User) private users;
    
    event UserRegistered(address indexed userAddress, string username);

    error AlreadyRegistered();
    error EmptyUsername();
    error NotRegistered();

    function register(string calldata _username) external {
        if (users[msg.sender].isRegistered) {
            revert AlreadyRegistered();
        }
        
        if (bytes(_username).length == 0) {
            revert EmptyUsername();
        }

        users[msg.sender] = User({
            username: _username,
            isRegistered: true
        });

        emit UserRegistered(msg.sender, _username);
    }

    function getUsername(address _userAddress) external view returns (string memory) {
        if (!users[_userAddress].isRegistered) {
            revert NotRegistered();
        }
        return users[_userAddress].username;
    }

    function isUserRegistered(address _userAddress) external view returns (bool) {
        return users[_userAddress].isRegistered;
    }
}