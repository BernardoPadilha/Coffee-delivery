import { Minus, Plus, ShoppingCartSimple } from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';
import '../../public/coffee_tradicional.png';
import { useContext, useState } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export interface CardsProps {
  id: number;
  img: string;
  tags: string[];
  name: string;
  price: number;
  description: string;
  frete: number;
}

export function Cards({
  img,
  name,
  description,
  tags,
  price,
  id,
  frete,
}: CardsProps) {
  const { addProductInCart } = useContext(ProductsContext);

  const [count, setCount] = useState(1);

  function handleIncrementNumberInCount() {
    if (count > 4) {
      return;
    }

    setCount(count + 1);
  }

  function handleDecrementNumberInCount() {
    if (count < 2) {
      return;
    }

    setCount(count - 1);
  }

  return (
    <div className="w-full bg-card mt-[54px] px-5 flex flex-col justify-center items-center rounded-bl-[36px] rounded-tr-[36px] rounded-br-md rounded-tl-md ">
      <div className="flex flex-col justify-center items-center">
        <img src={img} className="relative top-[-30px]" />
        <span className="w-20 h-5 flex items-center justify-center font-bold text-xs text-yellow bg-yellowLight rounded-full">
          Tradicional
        </span>
      </div>

      <div className="flex flex-col justify-center items-center">
        <h6 className="text-xl mt-4 mb-2 font-title text-title">{name}</h6>
        <p className="mb-[33px] text-sm text-center font-normal text-label">
          {description}
        </p>
      </div>

      <div className="flex items-center justify-center px-6 mb-5">
        <h1 className="text-lg font-bold mr-[23px] text-text whitespace-nowrap">
          {price}
        </h1>

        <div className="w-[72px] h-[38px] flex justify-around items-center bg-baseButton rounded-md mr-2">
          <button onClick={handleIncrementNumberInCount}>
            <Plus size={14} color="#8047F8" />
          </button>

          <span className="text-base">{count}</span>

          <button onClick={handleDecrementNumberInCount}>
            <Minus size={14} color="#8047F8" />
          </button>
        </div>
        <NavLink to="/checkout" title="Checkout">
          <button
            onClick={() =>
              addProductInCart({
                id,
                img,
                name,
                description,
                tags,
                quantity: count,
                price,
                frete,
              })
            }
            className="w-[38px] h-[38px] bg-purple flex justify-center items-center rounded-md"
          >
            <ShoppingCartSimple size={24} color="#fff" />
          </button>
        </NavLink>
      </div>
    </div>
  );
}
