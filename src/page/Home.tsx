import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiWithAuth } from "../services/api";
import { useGlobalState } from "../context/GlobalContext";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import NavPagination from "../components/NavPagination";
import TableGames from "../components/TableGames";
import InputSearchTerm from "../components/InputSearchTerm";

type Game = {
  createdAt: string;
  id: number;
  image: string;
  name: string;
  price: number;
  updatedAt: string;
  year: number;
};

type Pagination = {
  page: number;
  next: number | boolean;
  prev: number | boolean;
  totalPage: number;
};

const Home = () => {
  const { removeAuth } = useGlobalState();

  const navigate = useNavigate();

  const [games, setGame] = useState<Game[]>();
  const [serachTerm, setSerachTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination>();

  const getGame = async () => {
    setLoading(true);
    try {
      const { data } = await apiWithAuth.get("/games");
      setGame(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const getGamePage = async (currentPage?: number | boolean) => {
    setLoading(true);
    try {
      const { data } = await apiWithAuth.get(
        `/games/page/${currentPage ? currentPage : 1}`
      );
      setGame(data.result.games.rows);
      setPagination(data.result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const deleteGame = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const result = await apiWithAuth.delete(`/game/${id}`);
      toast.success(result.data.message, { position: "top-center" });

      getGamePage(pagination?.next ? pagination?.page : 1);
    } catch (error: any) {
      toast.error(error.message, { position: "top-center" });
    }
    setLoading(false);
  }, []);

  const handleChangeSearchTerm = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSerachTerm(event.target.value);
  };

  const logout = () => {
    removeAuth();
    navigate("/login");
  };

  const filteredGames = useMemo(() => {
    return games?.filter((game) =>
      game.name.toLowerCase().includes(serachTerm.toLowerCase())
    );
  }, [games, serachTerm]);

  useEffect(() => {
    getGamePage();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <h1 className="py-10 text-3xl text-center">Lista de Games</h1>
        <div className="flex justify-end mr-4 sm:mr-0">
          <Link to="/create-game">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm py-2 px-4 sm:py-2.5 sm:px-5 mr-2 mb-2 focus:outline-none "
            >
              Criar Game
            </button>
          </Link>

          <button
            onClick={logout}
            type="button"
            className="py-2 px-4 sm:py-2.5 sm:px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            Sair
          </button>
        </div>

        <InputSearchTerm onChange={handleChangeSearchTerm} />

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Avatar
                </th>
                <th scope="col" className="py-3 px-6">
                  Nome
                </th>

                <th scope="col" className="py-3 px-6">
                  Ano
                </th>
                <th scope="col" className="py-3 px-6">
                  Preço
                </th>
                <th scope="col" className="py-3 px-6">
                  Ação
                </th>
              </tr>
            </thead>
            {filteredGames &&
              filteredGames.map((game) => (
                <tbody key={game.id}>
                  <TableGames game={game} deleteGame={deleteGame} />
                </tbody>
              ))}
          </table>
        </div>

        <NavPagination pagination={pagination} onClick={getGamePage} />

        {games?.length === 0 && loading && (
          <div className="mt-10">
            <div className="text-lg font-semibold text-center ">
              Nenhum game cadastrado!
            </div>
          </div>
        )}
      </div>
      {loading && <Spinner />}
    </>
  );
};

export default Home;
