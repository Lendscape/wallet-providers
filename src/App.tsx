import { Badge, Box, Center, Container, HStack, Text, VStack, Alert, Spinner } from '@chakra-ui/react';
import logo from './assets/icons/logo.svg';
import ConnectButton from './components/ConnectButton';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import './styles/main.scss';

function App() {
  const alertStorage = useSelector((state: RootState) => state.alertStorage)
  const alert = alertStorage.isOn? (
    <Box my={4}>
      <Alert status={alertStorage.status} borderRadius='lg'>
        {alertStorage.message}
      </Alert>
    </Box>
  ) : (<></>)

  const wallets = useSelector((state: RootState) => state.walletStorage).map((w, i) => {
    const addresses = Object.entries(w.address).map(p => (
      <HStack borderRadius='lg' borderWidth='1px' p={3}>
        <Badge fontSize='0.8em' variant='outline' colorScheme='green'>
          {p[0]}
        </Badge>
        <Text fontFamily="Roboto Mono">
          {p[1]}
        </Text>
      </HStack>
    ))

    return (
      <VStack key={i} borderWidth='1px' borderRadius='lg' overflow='hidden' p={2}>
        <HStack justify="flex-start">
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            {w.type}
          </Badge>
          {
            w.network &&
            <Badge borderRadius='full' px='2' colorScheme={w.network == 'testnet'? 'yellow':'green'}>
              {w.network}
            </Badge>
          }
          
        </HStack>
        <VStack align='stretch'>
          {addresses}
        </VStack>
      </VStack>
    )
  })
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <Container>
          {
            alert
          }
          <Box m={4}>
            <ConnectButton></ConnectButton>
          </Box>
          <Center>
            <VStack>
             {wallets}
            </VStack>
          </Center>
        </Container>
      </main>
    </div>
  );
}

export default App;
