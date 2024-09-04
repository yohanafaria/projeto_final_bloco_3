import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../model/Categoria';
import { atualizar, cadastrar, listar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function FormCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id !== undefined) {
            async function fetchCategoria() {
                try {
                    const categoriaData = await listar<Categoria>(`/categorias/${id}`);
                    setCategoria(categoriaData);
                } catch (error) {
                    console.error("Erro ao carregar categoria", error);
                }
            }
            fetchCategoria();
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        });
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            if (id !== undefined) {
                await atualizar<Categoria>(`/categorias/${id}`, categoria);
                ToastAlerta('Categoria atualizada com sucesso', 'sucesso');
            } else {
                await cadastrar<Categoria>(`/categorias`, categoria);
                ToastAlerta('Categoria cadastrada com sucesso', 'sucesso');
            }
            retornar();
        } catch (error) {
            ToastAlerta('Erro ao processar a Categoria', 'erro');
        }
    }

    function retornar() {
        navigate("/categorias");
    }

    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <h2 className='text-2xl font-bold mb-6'>
                {id === undefined ? 'Cadastrar Nova Categoria' : 'Editar Categoria'}
            </h2>
            <div className='bg-white shadow-md rounded-lg border border-gray-200 p-6 w-full max-w-md'>
                <form className="flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
                    <label htmlFor="nome" className='text-lg font-semibold'>
                        Nome da Categoria
                    </label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name='nome'
                        className="py-2 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        value={categoria.nome || ''}
                        onChange={atualizarEstado}
                    />
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        type="submit"
                    >
                        {id === undefined ? 'Cadastrar' : 'Editar'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormCategoria;
