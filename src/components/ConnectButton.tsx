import { Button, Flex, HStack, Image, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import WalletsProviders from "../wallets";
import WalletModal from "./WalletModal";
import KeystoreImport from "./KeystoreImport";

type Props = {};

const ConnectButton: FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch: AppDispatch = useDispatch();

  const buttons = WalletsProviders().map((wallet, index) => (
    <Button
      key={index}
      transition="0.2s all"
      p="6"
      borderRadius="xl"
      width="100%"
      mb="4"
      onClick={() => {
        onClose();
        wallet.connect(dispatch);
      }}
    >
      <Flex w="100%" align="center">
        <Text>{wallet.name}</Text>
        <Spacer />
        <Image src={wallet.icon} htmlWidth="24" alt="" />
      </Flex>
    </Button>
  ));
  
  return (
    <>
      <Button onClick={onOpen}>
        <HStack spacing="3">
          <Text fontSize="md">Connect your wallet</Text>
        </HStack>
      </Button>
      <WalletModal isOpen={isOpen} onClose={onClose} title='Choose your connection type'>
        <KeystoreImport walletModalClose={onClose}></KeystoreImport>
        {buttons}
      </WalletModal>
    </>
  )
}

export default ConnectButton;