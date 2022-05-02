import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

const WalletModal: FC<Props> = ({children, isOpen, onClose, title}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            {children}
          </ModalBody>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  )
}

export default WalletModal;