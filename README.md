# Auction DApp

A decentralized auction platform built with React.js, Node.js, and Ethereum smart contracts.

## Features

### Frontend
- Advanced Auction Dashboard with real-time updates
- Multi-wallet support (MetaMask, WalletConnect)
- Responsive design with dark/light mode
- NFT management and auction creation
- Real-time bidding interface

### Backend
- Smart contract integration for auctions
- RESTful API for auction management
- WebSocket for real-time updates
- IPFS integration for NFT storage
- Email notification system

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MetaMask or any Web3 wallet
- Infura/Alchemy API key for Ethereum node access
- IPFS API key (optional, for NFT storage)

## Project Structure

```
auction-dapp/
├── frontend/           # React.js frontend application
├── backend/           # Node.js backend application
└── contracts/         # Solidity smart contracts
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=3001
ETHEREUM_NODE_URL=your_infura_or_alchemy_url
IPFS_API_KEY=your_ipfs_api_key
EMAIL_SERVICE_API_KEY=your_email_service_key
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_BACKEND_URL=http://localhost:3001
REACT_APP_INFURA_KEY=your_infura_key
```

4. Start the frontend development server:
```bash
npm start
```

## Required API Keys

1. **Infura/Alchemy**
   - Sign up at https://infura.io or https://www.alchemy.com/
   - Create a new project
   - Copy the API key and endpoint URL

2. **IPFS (Optional)**
   - Sign up at https://www.pinata.cloud/
   - Create API keys
   - Use for NFT storage

3. **Email Service (Optional)**
   - Sign up for SendGrid or similar service
   - Create API key for notifications

## Smart Contract Deployment

1. Navigate to contracts directory:
```bash
cd contracts
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```
PRIVATE_KEY=your_wallet_private_key
INFURA_KEY=your_infura_key
```

4. Deploy contracts:
```bash
npx hardhat run scripts/deploy.js --network <network_name>
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


To run the project:
Backend Setup:
    cd backend
    npm install
    npm run dev
Frontend Setup:
    cd frontend
    npm install
    npm start
Smart Contract Setup:
    cd contracts
    npm install
    npx hardhat compile
    npx hardhat test
    npx hardhat run scripts/deploy.js --network <network_name>


## License

MIT 