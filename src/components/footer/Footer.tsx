
const Footer = () => {
  return (
    <footer className="bg-primary text-secondary p-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">

        <div className="mb-6 md:mb-0">
          <h2 className="text-lg font-bold mb-4">Links Rápidos</h2>
          <ul>
            <li>
              <a href="/produtos" className="hover:text-accent transition duration-300">Produtos</a>
            </li>
            <li>
              <a href="/categorias" className="hover:text-accent transition duration-300">Categorias</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Contato</h2>
          <ul>
            <li className="mb-2">Email: contato@farmais.com.br</li>
            <li className="mb-2">Telefone: (11) 1234-5678</li>
            <li className="mb-2">Endereço: Av Rio Branco, 252 - Rio de Janeiro/RJ</li>
          </ul>
          <div className="mt-4">
            <a href="https://facebook.com" className="text-secondary hover:text-accent mx-2 transition duration-300" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href="https://twitter.com" className="text-secondary hover:text-accent mx-2 transition duration-300" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>
            <a href="https://instagram.com" className="text-secondary hover:text-accent mx-2 transition duration-300" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
