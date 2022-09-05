import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const saveAccount = async () => {
    try {
      const result = await api.post("/createAccount", {
        name,
        email,
        password,
      });
      navigate("/login");
      toast.success(result.data.message, {
        position: "top-center",
      });
    } catch (error: any) {
      toast.error(error.response.data.message, { position: "top-center" });
    }
  };

  return (
    <div className="flex justify-center pt-20 ">
      <div className="w-full max-w-sm ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center text-xl underline mb-6">Criar Conta</h2>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="name"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="passoword"
              type="password"
              placeholder="senha"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={saveAccount}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Salvar
            </button>
            <div className="flex items-center">
              <p className="text-sm"> Já tem tem conta?</p>
              <Link to="/login">
                <button className="ml-1 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
