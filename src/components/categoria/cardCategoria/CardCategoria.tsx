import { Link } from "react-router-dom";
import Categoria from "../../../model/Categoria";

interface CardCategoriaProps {
  categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-red-500 text-white p-4">
        <h3 className="text-lg font-semibold">{categoria.nome}</h3>
      </div>
      <div className="flex justify-around p-2 bg-gray-100">
        <Link to={`/atualizarCategoria/${categoria.id}`} className="w-full">
          <button className="w-full py-2 px-4 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300">
            Editar
          </button>
        </Link>
        <Link to={`/deleteCategoria/${categoria.id}`} className="w-full">
          <button className="w-full py-2 px-4 text-red-500 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition duration-300">
            Deletar
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;
