import { NavLink } from 'react-router-dom';
import '../../public/logo.png';
import { ShoppingCart, MapPin } from '@phosphor-icons/react';
import { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export function Header() {
  const { products } = useContext(ProductsContext);

  return (
    <header className="h-[104px] max-w-7xl mx-auto flex justify-between items-center">
      <NavLink to="/" title="Home">
        <button>
          <img src="logo.png" />
        </button>
      </NavLink>

      <div className="flex items-center justify-center">
        <button className="w-[143px] h-[38px] bg-purpleLight text-purple flex justify-center items-center text-xs rounded-md mr-5">
          Porto Alegre, RS
          <MapPin size={24} color="#8047F8" />
        </button>

        <NavLink to="/checkout" title="Carrinho">
          <div className="flex ">
            <button className="w-[38px] h-[38px] bg-yellowLight rounded-md flex items-center justify-center">
              <ShoppingCart size={32} color="#C47F17" />
            </button>
            <span className="w-5 h-5 flex items-center justify-center bg-yellowDark text-white text-sm rounded-full relative top-[-8px] left-[-12px]">
              {products.length}
            </span>
          </div>
        </NavLink>
      </div>
    </header>
  );
}
