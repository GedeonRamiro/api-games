import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiWithAuth } from "../services/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

type Game = {
  createdAt: string;
  id: number;
  name: string;
  price: number;
  updatedAt: string;
  year: number;
};

const CreateGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const gameState = location.state as Game;

  const [name, setName] = useState(gameState ? gameState.name : "");
  const [year, setYear] = useState(gameState ? gameState.year : "");
  const [price, setPrice] = useState(gameState ? gameState.price : "");
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    setLoading(true);
    try {
      const result = await apiWithAuth.post("/game", {
        name,
        year,
        price,
      });
      toast.success(result.data.message, { position: "top-center" });
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message, { position: "top-center" });
    }
    setLoading(false);
  };

  const editGame = async () => {
    setLoading(true);
    try {
      const result = await apiWithAuth.put(`/game/${gameState.id}`, {
        name,
        year,
        price,
      });
      toast.success(result.data.message, { position: "top-center" });
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data.message, { position: "top-center" });
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-20">
      <div className="sm:flex justify-center mx-4">
        <div className="sm:max-w-screen-lg">
          <form>
            <h2 className="text-center text-2xl  mb-10">
              {gameState ? "Editar Game" : "Salvar Game"}
            </h2>
            <div className="relative z-0 mb-6 w-full group">
              <input
                type="text"
                name="name"
                id="name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label
                htmlFor="name"
                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nome
              </label>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="number"
                  name="ano"
                  id="ano"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                />
                <label
                  htmlFor="ano"
                  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Ano
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={price}
                  onChange={(event) => setPrice(event.target.value)}
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Preço
                </label>
              </div>
            </div>
            <div className="mt-2">
              <button
                onClick={gameState ? editGame : createGame}
                disabled={loading}
                type="button"
                className="text-white justify-center w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 inline-flex items-center"
              >
                {loading && (
                  <svg
                    role="status"
                    className="inline mr-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {gameState ? "Editar" : "Salvar"}
              </button>

              <Link to="/">
                <button className="text-blue-700 mt-2 justify-center w-full bg-white-700 hover:bg-white-800 focus:ring-4 focus:ring-white-300 font-medium rounded text-sm px-5 py-2  inline-flex items-center border-2 border-blue-700">
                  Cancelar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGame;
