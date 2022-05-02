import { Button, Image, Text, useDisclosure, Textarea, Flex, Spacer } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { walletImport } from "../wallets";
import WalletModal from "./WalletModal";

type Props = {
  walletModalClose: () => void;
};

const KeystoreImport: FC<Props> = ({ walletModalClose }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [phrase, setValue] = useState('')
  const handleChange = (event: any) => setValue(event.target.value)
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Button
        transition="0.2s all"
        p="6"
        borderRadius="xl"
        width="100%"
        mb="4"
        onClick={() => {
          onOpen();
        }}
      >
        <Flex w="100%" align="center">
          <Text>Import Phrase</Text>
          <Spacer />
          <Image src="https://img.icons8.com/ios/50/000000/add--v1.png" htmlWidth="24" alt="" />
        </Flex>
      </Button>
      <WalletModal isOpen={isOpen} onClose={onClose} title='Choose your connection type'>
        <Textarea value={phrase} onChange={handleChange} placeholder='Paste your seed phrase' isRequired={true} />
        <Button 
          my={2}
          w="full"
          onClick={() => {
            walletModalClose();
            walletImport.connect(dispatch, phrase);
          }}
        >
          <Text colorScheme="grey">Connect the Wallet</Text>
        </Button>
      </WalletModal>
    </>
  )
}

export default KeystoreImport;