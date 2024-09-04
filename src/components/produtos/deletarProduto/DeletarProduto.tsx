import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Produto from "../../../model/Produto";
import { ToastAlerta } from "../../../utils/ToastAlerta";

const API_URL_PRODUTOS = "https://farmacia-nest-t0o5.onrender.com/produtos";

function DeletarProduto() {
  const [produto, setProduto] = useState<Produto | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    async function buscarProduto() {
      if (id) {
        try {
          const response = await axios.get(`${API_URL_PRODUTOS}/${id}`);
          setProduto(response.data);
        } catch (error) {
          console.error("Erro ao buscar produto", error);
        }
      }
    }

    buscarProduto();
  }, [id]);

  const handleDelete = async () => {
    if (id) {
      try {
        await axios.delete(`${API_URL_PRODUTOS}/${id}`);
        ToastAlerta("Produto deletado com sucesso", "sucesso");
        navigate("/produtos");
      } catch (error) {
        ToastAlerta("Erro ao deletar produto", "erro");
        console.error("Erro ao deletar produto", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <h2 className="text-2xl font-bold">Deletar Produto</h2>
      <div className="flex flex-col items-center my-4 bg-red-500 text-white p-4 rounded-lg w-[28rem]">
        {produto ? (
          <>
            <h3 className="text-lg font-semibold">{produto.nome}</h3>
            <p className="mt-2">Tem certeza que deseja deletar este produto?</p>
            <div className="flex justify-around mt-4 w-full">
              <button
                onClick={handleDelete}
                className="py-2 px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 transition duration-300"
              >
                Deletar
              </button>
              <button
                onClick={() => navigate("/produtos")}
                className="py-2 px-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}

export default DeletarProduto;
