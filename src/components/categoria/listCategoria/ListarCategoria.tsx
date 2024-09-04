import CardCategoria from "../cardCategoria/CardCategoria";
import { useEffect, useState } from "react";
import Categoria from "../../../model/Categoria";
import { listar } from "../../../services/Service";
import { Link } from "react-router-dom";

function ListarCategoria() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        async function buscarCategorias() {
            try {
                const categoriasData = await listar<Categoria[]>('/categorias');
                setCategorias(categoriasData);
            } catch (error) {
                console.error(error);
            }
        }

        buscarCategorias();
    }, []);

    return (
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 my-6">
            <div className="flex justify-end mb-6">
                <Link to="/cadastrarCategoria">
                    <button className="py-2 px-6 bg-red-500 text-white rounded-lg border border-red-600 hover:bg-red-600 transition duration-300">
                        Nova Categoria
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorias.map((categoria) => (
                    <CardCategoria key={categoria.id} categoria={categoria} />
                ))}
            </div>
        </div>
    );
}

export default ListarCategoria;
