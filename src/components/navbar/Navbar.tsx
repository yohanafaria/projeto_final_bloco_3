import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary shadow-lg p-4 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto mr-4" />
        <span className="text-secondary text-2xl font-bold">FarMais</span>
      </Link>

      <div className="flex space-x-4">
        <Link to="/categorias" className="text-secondary hover:text-accent transition duration-300">Categorias</Link>
        <Link to="/produtos" className="text-secondary hover:text-accent transition duration-300">Produtos</Link>
      </div>
    </nav>
  );
};

export default Navbar;
