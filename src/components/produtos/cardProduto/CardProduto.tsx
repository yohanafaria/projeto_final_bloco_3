
import { Link } from "react-router-dom";
import Produto from "../../../model/Produto";


interface CardProdutoProps {
  produto: Produto;
  onDelete: (id: number) => void;
}

function CardProduto({ produto, onDelete }: CardProdutoProps) {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-red-500 text-white p-4">
        <h3 className="text-lg font-semibold">{produto.nome}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700">Preço: R${produto.preco}</p>
      </div>
      <div className="flex justify-around p-2 bg-gray-100">
        <Link to={`/atualizarProduto/${produto.id}`} className="w-full">
          <button className="w-full py-2 px-4 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300">
            Editar
          </button>
        </Link>
        <button
          onClick={() => onDelete(produto.id)}
          className="w-full py-2 px-4 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300"
        >
          Deletar
        </button>
      </div>
    </div>
  );
}

export default CardProduto;
