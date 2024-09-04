import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { atualizar, cadastrar, listar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import Produto from '../../../model/Produto';
import Categoria from '../../../model/Categoria';

const API_URL_CATEGORIAS = "https://farmacia-nest-t0o5.onrender.com/categorias";

function FormProduto() {
    const [produto, setProduto] = useState<Produto>({} as Produto);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoriaId, setCategoriaId] = useState<number | ''>('');
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loadingCategorias, setLoadingCategorias] = useState<boolean>(true);

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        async function fetchCategorias() {
            try {
                const categoriasData = await listar<Categoria[]>(API_URL_CATEGORIAS);
                setCategorias(categoriasData);
            } catch (error) {
                console.error("Erro ao carregar categorias", error);
            } finally {
                setLoadingCategorias(false);
            }
        }

        fetchCategorias();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            async function fetchProduto() {
                try {
                    const fetchedProduto = await listar<Produto>(`/produtos/${id}`);
                    setProduto(fetchedProduto);
                    setCategoriaId(fetchedProduto.categoria?.id || ''); 
                } catch (error) {
                    console.error("Erro ao carregar produto", error);
                }
            }
            fetchProduto();
        }
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: name === 'preco' ? parseFloat(value) : value
        }));
    }

    function atualizarCategoria(e: ChangeEvent<HTMLSelectElement>) {
        setCategoriaId(parseInt(e.target.value));
    }

    async function gerarNovoProduto(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (id !== undefined) {
                await atualizar<Produto>(`/produtos/${id}`, { ...produto, categoria: { id: categoriaId } });
                ToastAlerta('Produto atualizado com sucesso', 'sucesso');
            } else {
                await cadastrar<Produto>(`/produtos`, { ...produto, categoria: { id: categoriaId } });
                ToastAlerta('Produto cadastrado com sucesso', 'sucesso');
            }
            retornar();
        } catch (error: any) {
            ToastAlerta('Erro ao processar o Produto', 'erro');
        }
        setIsLoading(false);
    }

    function retornar() {
        navigate("/produtos");
    }

    if (loadingCategorias) return <p>Carregando categorias...</p>;

    return (
        <div className='flex flex-col justify-center items-center mt-4'>
            <h2 className='text-2xl font-bold mb-6'>
                {id === undefined ? 'Cadastrar Novo Produto' : 'Editar Produto'}
            </h2>
            <div className='bg-white shadow-md rounded-lg border border-gray-200 p-6 w-full max-w-md'>
                <form className="flex flex-col gap-4" onSubmit={gerarNovoProduto}>
                    <label htmlFor="nome" className='text-lg font-semibold'>
                        Nome do Produto
                    </label>
                    <input
                        type="text"
                        placeholder="Nome"
                        name='nome'
                        className="py-2 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        value={produto.nome || ''}
                        onChange={atualizarEstado}
                    />

                    <label htmlFor="preco" className='text-lg font-semibold'>
                        Preço
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Preço"
                        name='preco'
                        className="py-2 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        value={produto.preco || ''}
                        onChange={atualizarEstado}
                    />

                    <label htmlFor="foto" className='text-lg font-semibold'>
                        URL da Foto
                    </label>
                    <input
                        type="text"
                        placeholder="URL da Foto"
                        name='foto'
                        className="py-2 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                        value={produto.foto || ''}
                        onChange={atualizarEstado}
                    />

                    <label htmlFor="categoria" className='text-lg font-semibold'>
                        Categoria
                    </label>
                    <select
                        name="categoria"
                        value={categoriaId || ''}
                        onChange={atualizarCategoria}
                        className="py-2 px-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                    >
                        <option value="" disabled>Selecione uma Categoria</option>
                        {categorias.map(categoria => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nome}
                            </option>
                        ))}
                    </select>

                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                        type="submit"
                    >
                        {isLoading ? 'Carregando...' : (id === undefined ? 'Cadastrar' : 'Atualizar')}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormProduto;
