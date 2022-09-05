import { formatReal } from "../utils/formatReal";
import { Link } from "react-router-dom";
import { memo, useState } from "react";
import ModalComponent from "./ModalComponent";
import { Table } from "flowbite-react";

type Game = {
  createdAt: string;
  id: number;
  name: string;
  price: number;
  updatedAt: string;
  year: number;
};

type Props = {
  game: Game;
  deleteGame: (id: number) => void;
};

const TableGames = memo(({ game, deleteGame }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleOnCloseModal = () => {
    setOpenModal(false);
  };

  function handleDeleteGame() {
    deleteGame(game.id);
  }

  return (
    <>
      <tr className="bg-white border-b ">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
        >
          {game.name}
        </th>
        <td className="py-4 px-6">{game.year}</td>
        <td className="py-4 px-6">{formatReal(game.price)}</td>
        <td className="py-4 px-6">
          <Link to="create-game" state={game}>
            <button className="font-medium text-blue-600 hover:underline">
              Editar
            </button>
          </Link>
          <button
            onClick={handleOpenModal}
            className="font-medium ml-2 cursor-pointer text-red-600  hover:underline"
          >
            Deletar
          </button>
        </td>
      </tr>
      <ModalComponent
        openModal={openModal}
        onClose={handleOnCloseModal}
        onClick={handleDeleteGame}
        title="Deseja apagar esse game?"
        titleData={`${game.name}`}
      />
    </>
  );
});

export default TableGames;
