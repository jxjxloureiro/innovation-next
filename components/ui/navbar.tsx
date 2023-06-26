import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-2xl font-bold" href="/">
          Lojinha
        </Link>
        <Link className="bg-green-500 px-4 py-2 text-white rounded hover:bg-green-600" href="/shopping-cart">
         Carrinho
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
