import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // MetaMask is installed
  web3 = new Web3(window.ethereum);
  window.ethereum.enable(); // Request account access
} else {
  // MetaMask is not installed or user is not using a web3-enabled browser
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/YOUR_INFURA_API_KEY'
  );
  web3 = new Web3(provider);
}

export default web3;
