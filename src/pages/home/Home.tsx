import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Produto from '../../model/Produto';
import { listar, deletar } from '../../services/Service';
import CardProduto from '../../components/produtos/cardProduto/CardProduto';
import { ToastAlerta } from '../../utils/ToastAlerta';

const Home: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const produtos = await listar<Produto[]>('/produtos');
                setProdutos(produtos);
            } catch (error) {
                console.error('Erro ao carregar produtos', error);
            }
        }

        fetchProdutos();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deletar(`/produtos/${id}`);
            setProdutos(produtos.filter(produto => produto.id !== id));
            ToastAlerta('Produto deletado com sucesso', 'sucesso');
        } catch (error) {
            ToastAlerta('Erro ao deletar produto', 'erro');
        }
    };

    return (
        <div className="bg-white text-gray-900">
            <section className="bg-white text-red py-16 flex flex-col items-center justify-center text-center shadow-lg">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo à FarMais</h1>
                <p className="text-lg md:text-xl mb-8">Oferecemos uma ampla gama de produtos farmacêuticos com qualidade e confiança.</p>
                <Link to="/produtos" className="bg-accent text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-primary transition duration-300">
                    Explore Nossos Produtos
                </Link>
            </section>

            <section className="py-16 px-4 md:px-16">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-8">Nossos Produtos</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {produtos.slice(0, 3).map(produto => (
                            <CardProduto key={produto.id} produto={produto} onDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-primary text-white py-16 flex flex-col items-center justify-center text-center shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Quer saber mais?</h2>
                <p className="text-lg md:text-xl mb-8">Entre em contato conosco para obter mais informações sobre nossos produtos e serviços.</p>
                <Link to="/contato" className="bg-accent text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-primary transition duration-300">
                    Fale Conosco
                </Link>
            </section>
        </div>
    );
};

export default Home;
