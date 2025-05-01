import React from 'react';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337], // Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Local
});

const walletconnect = new WalletConnectConnector({
  rpc: {
    1: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    3: `https://ropsten.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    4: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    5: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    42: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

const WalletConnect = () => {
  const { activate, deactivate, account, active, chainId } = useWeb3React();
  const toast = useToast();

  const connectWallet = async (connector) => {
    try {
      await activate(connector);
      toast({
        title: 'Wallet Connected',
        description: 'Your wallet has been successfully connected.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      deactivate();
      toast({
        title: 'Wallet Disconnected',
        description: 'Your wallet has been disconnected.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (active) {
    return (
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          {`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={disconnectWallet}>Disconnect</MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Connect Wallet
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => connectWallet(injected)}>MetaMask</MenuItem>
        <MenuItem onClick={() => connectWallet(walletconnect)}>WalletConnect</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default WalletConnect; 