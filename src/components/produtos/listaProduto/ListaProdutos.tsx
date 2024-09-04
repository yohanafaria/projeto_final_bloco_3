import axios from "axios";
import CardProduto from "../cardProduto/CardProduto";
import Produto from "../../../model/Produto";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 

const API_URL = "https://farmacia-nest-t0o5.onrender.com/produtos";

function ListaProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get(API_URL);
        setProdutos(response.data);
      } catch (err) {
        setError("Erro ao carregar produtos");
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProdutos(produtos.filter(produto => produto.id !== id));
    } catch (err) {
      setError("Erro ao deletar produto");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 my-6">
      <div className="flex justify-end mb-6">
        <Link to="/cadastrarProduto">
          <button className="py-2 px-6 bg-red-500 text-white rounded-lg border border-red-600 hover:bg-red-600 transition duration-300">
            Novo Produto
          </button>
        </Link>
      </div>
      <div className="grid gap-4">
        {produtos.map(produto => (
          <CardProduto key={produto.id} produto={produto} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default ListaProdutos;
