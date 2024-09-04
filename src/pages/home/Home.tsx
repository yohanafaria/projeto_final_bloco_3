
const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      <section className="bg-white text-red py-16 flex flex-col items-center justify-center text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bem-vindo à FarMais</h1>
        <p className="text-lg md:text-xl mb-8">Oferecemos uma ampla gama de produtos farmacêuticos com qualidade e confiança.</p>
        <a href="/produtos" className="bg-accent text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-primary transition duration-300">
          Explore Nossos Produtos
        </a>
      </section>

      <section className="py-16 px-4 md:px-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Sobre Nós</h2>
          <p className="text-lg mb-4">
            Com anos de experiência no mercado, nossa farmácia é dedicada a oferecer o melhor atendimento e os melhores produtos.
          </p>
          <p className="text-lg">
            Nossa missão é garantir a saúde e o bem-estar dos nossos clientes com um serviço excepcional e produtos de alta qualidade.
          </p>
        </div>
      </section>

      <section className="bg-primary text-white py-16 flex flex-col items-center justify-center text-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Quer saber mais?</h2>
        <p className="text-lg md:text-xl mb-8">Entre em contato conosco para obter mais informações sobre nossos produtos e serviços.</p>
        <a href="/contato" className="bg-accent text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-primary transition duration-300">
          Fale Conosco
        </a>
      </section>
    </div>
  );
};

export default Home;
