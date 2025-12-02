# Problem 4 Solution: User Registration Smart Contract

## Overview
Implemented a gas-optimized user registration smart contract in Solidity 0.8.20.

## Contract Location
`backend/contracts/test.sol`

## Features Implemented
- Single registration per address
- Username storage with address mapping
- Username retrieval function
- Registration event emission
- Duplicate registration prevention
- Empty username validation

## Technical Decisions

### 1. Custom Errors
Used custom errors instead of `require` statements for ~50% gas savings:
```solidity
error AlreadyRegistered();
error EmptyUsername();
error NotRegistered();
```

### 2. Explicit Registration Flag
Added `isRegistered` boolean to distinguish between unregistered users and users with empty usernames.

### 3. Calldata Optimization
Used `calldata` for string parameter to avoid unnecessary memory copying.

### 4. Indexed Events
Made address parameter indexed for efficient off-chain filtering.

## Testing
All test cases pass successfully:
```bash
cd backend
npx hardhat test
```

**Test Coverage:**
- Successful user registration
- Duplicate registration prevention
- Empty username rejection
- Multiple user registrations
- Username retrieval
- Unregistered user handling
- Registration status checks

## Setup & Run

### Prerequisites
```bash
node --version  # v16+
npm --version
```

### Installation
```bash
cd backend
npm install
```

### Compile
```bash
npx hardhat compile
```

### Test
```bash
npx hardhat test
```

## Contract Functions

### `register(string calldata _username)`
Registers the caller with a username. Reverts if already registered or username is empty.

### `getUsername(address _userAddress)`
Returns the username of a registered user. Reverts if user not registered.

### `isUserRegistered(address _userAddress)`
Returns boolean indicating if an address is registered.

## Gas Optimization
- Custom errors: ~50% cheaper than require strings
- Calldata parameters: No memory allocation overhead
- Private state variables: Explicit visibility
- Optimizer enabled: 200 runs

## Security Considerations
- One registration per address enforced
- Input validation on username
- Explicit error handling
- No reentrancy vectors
- No external calls


---

**Developer**: Mitali  
**Solidity Version**: 0.8.20  
**Test Framework**: Hardhat + Chai

