import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type Props = {
  openModal: boolean;
  title: string;
  titleData: string;
  onClose: () => void;
  onClick: () => void;
};

const ModalComponent = ({
  openModal,
  onClose,
  onClick,
  title,
  titleData,
}: Props) => {
  return (
    <Modal show={openModal} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
          <p className="mt-5 text-lg font-normal text-gray-500 ">{title}</p>
          <h3 className="mb-5 text-lg font-bold text-gray-800">{titleData}</h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={onClick}>
              Sim
            </Button>
            <Button color="gray" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalComponent;
