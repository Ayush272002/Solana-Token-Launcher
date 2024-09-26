# Solana Token Launcher

Solana Token Launcher is a TypeScript-based tool for airdropping SOL, creating new token mints, minting tokens, and checking balances using the Solana blockchain. It leverages the Solana Web3.js library to interact with the Solana network. This repository is designed to simplify the process of creating and minting tokens on Solana.

## Features

- **Airdrop SOL**: Automatically airdrops SOL to a specified public key.
- **Check Balance**: Fetch and display the balance of a specific wallet.
- **Create Token Mint**: Creates a new token mint on the Solana blockchain.
- **Mint Tokens**: Mints new tokens to a specified recipient.
- **Verify Token Mint**: Verifies if a token mint was created successfully.

## Getting Started

### Prerequisites

Before using this repository, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v16+)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) (optional, but recommended for managing Solana accounts)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Ayush272002/Solana-Token-Launcher.git
    cd Solana-Token-Launcher
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Set up a `.env` file with the following variables:

    ```bash
    PRIVATE_KEY=<Your Solana Private Key>
    PUBLIC_KEY=<Your Solana Public Key>
    TO_PUBLIC_KEY=<The recipient's Solana Public Key>
    ```

    - **PRIVATE_KEY**: The base58 encoded private key of your wallet.
    - **PUBLIC_KEY**: Your wallet's public key (for checking the balance and airdropping SOL).
    - **TO_PUBLIC_KEY**: The recipient's public key for minting new tokens.

    > You can obtain these keys using the Solana CLI by running commands like 
    ```bash
    solana-keygen new
    ``` 
    
    and

    ```bash
    solana address
    ```

### Running the Project

1. To execute the script, run:

    ```bash
    npm run build
    npm start
    ```

   This will perform the following tasks:
   - Airdrop 0.1 SOL to the public key provided in the `.env` file.
   - Check the balance of the provided public key.
   - Create a new token mint and verify it.
   - Mint 10 tokens to the specified recipient's public key.
   - Check the balance of the recipient after minting the tokens.

## Project Structure

- **src/index.ts**: The entry point of the application. It handles airdropping SOL, checking balances, minting tokens, and verifying the mint process.
- **lib/**: Contains helper modules that handle specific blockchain actions such as airdropping SOL, checking balance, and minting tokens.
  - `airdrop.ts`: Handles the logic for airdropping SOL.
  - `checkBalance.ts`: Retrieves and displays the SOL balance of a wallet.
  - `tokenMint.ts`: Functions for creating a token mint, verifying a mint, and minting tokens.

## Usage

1. **Airdrop SOL**: The script will airdrop 0.1 SOL to the wallet specified by `PUBLIC_KEY`.
   
2. **Check Balance**: After airdropping, the balance of the wallet is checked.

3. **Create a Token Mint**: The script creates a new token mint using the provided private key.

4. **Mint Tokens**: After verifying the token mint, it will mint 10 tokens to the wallet specified by `TO_PUBLIC_KEY`.

5. **Verify Balance**: After minting, the script checks the balance of the recipient wallet to confirm the transfer.

## Environment Variables

Ensure the `.env` file is populated with the required Solana keys:

- `PRIVATE_KEY`: Your private key used for signing transactions.
- `PUBLIC_KEY`: Your public key to receive the airdropped SOL and check balance.
- `TO_PUBLIC_KEY`: The public key of the recipient to whom tokens will be minted.

## Contributing

Feel free to submit issues or pull requests if you want to improve this tool or add new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---