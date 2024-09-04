import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Categoria from '../../../model/Categoria';
import { deletar, listar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function DeleteCategoria() {
    const [categoria, setCategoria] = useState<Categoria>({} as Categoria);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id !== undefined) {
            async function buscarPorId(id: string) {
                try {
                    const categoriaData = await listar<Categoria>(`/categorias/${id}`);
                    setCategoria(categoriaData);
                } catch (error) {
                    console.log(error);
                }
            }
            buscarPorId(id);
        }
    }, [id]);

    function retornar() {
        navigate("/categorias");
    }

    async function deletarCategoria() {
        try {
            await deletar(`/categorias/${id}`);
            ToastAlerta('Categoria apagada com sucesso', 'sucesso');
            retornar();
        } catch (error) {
            ToastAlerta('Erro ao apagar a Categoria', 'erro');
        }
    }

    return (
        <div className='flex justify-center'>
            <div className='flex flex-col items-center my-4 bg-red-500 py-2 px-4'>
                <h2 className='text-xl pb-4 font-bold text-white'>
                    Você tem certeza que deseja apagar a categoria a seguir?
                </h2>
                <span className='w-full text-center bg-white py-2'>
                    {categoria.id} - {categoria.nome}
                </span>
                <div className='flex justify-around w-[100%] mt-4 gap-4'>
                    <button
                        onClick={retornar}
                        className="w-1/2 py-1 px-2 border-red-600 border-solid border-[1px] bg-red-400"
                    >
                        Não
                    </button>
                    <button
                        onClick={deletarCategoria}
                        className="w-1/2 py-1 px-2 border-red-600 border-solid border-[1px] bg-red-400"
                    >
                        Sim
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteCategoria;
