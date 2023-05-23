import { ReactNode, createContext, useState } from 'react';
import { NewPurchaseData } from '../pages/Checkout';
import { formatPrice } from '../utils/format';

interface ProductsContextProviderProps {
  children: ReactNode;
}

interface ProductProps {
  id: number;
  img: string;
  tags: string[];
  name: string;
  price: number;
  description: string;
  quantity: number;
  frete: number;
}

interface PurchaseProps {
  address: NewPurchaseData;
  total: string;
}

interface ProductsContextType {
  total: string;
  products: ProductProps[];
  purchase: PurchaseProps[];
  addProductInCart: (product: ProductProps) => void;
  updateProductAmount: ({
    productId,
    amount,
  }: {
    productId: number;
    amount: number;
  }) => void;
  removeProduct: (productId: number) => void;
  // handleCreateNewPurchase: (data: NewPurchaseData) => void;
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [purchase, setPurchase] = useState<PurchaseProps[]>([]);

  function addProductInCart(product: ProductProps) {
    const findProducts = products.find((p) => p.id === product.id);
    if (findProducts) {
      const totalQuantity = findProducts.quantity + product.quantity;
      updateProductAmount({
        productId: findProducts.id,
        amount: totalQuantity,
      });
      return;
    }
    setProducts((state) => [...state, product]);
  }

  function updateProductAmount({
    productId,
    amount,
  }: {
    productId: number;
    amount: number;
  }) {
    const productExist = products.some(
      (cartProduct) => cartProduct.id === productId
    );

    if (!productExist) {
      return;
    }

    const updateProducts = products.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: amount,
          }
        : cartItem
    );

    setProducts(updateProducts);
  }

  function removeProduct(productId: number) {
    const productExist = products.some(
      (cartProduct) => cartProduct.id === productId
    );

    if (!productExist) {
      return;
    }

    const updateProducts = products.filter(
      (cartItem) => cartItem.id !== productId
    );
    setProducts(updateProducts);
  }
  
  // function handleCreateNewPurchase(data: PurchaseProps) {
  //   const newPurchase = {
  //     street: data.address.street,
  //     houseNumber: data.address.houseNumber,
  //     district: data.address.district,
  //     state: data.address.state,
  //     UF: data.address.UF,
  //     productsBuy: products,
  //     total: total,
  //   };

  //   setPurchase((state) =>[...state, newPurchase]);
  //   //  reset()
  // }
  const total = formatPrice(
    products.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity + product.frete;

      return sumTotal;
    }, 0)
  );


  return (
    <ProductsContext.Provider
      value={{
        products,
        purchase,
        total,
        addProductInCart,
        updateProductAmount,
        removeProduct,
        // handleCreateNewPurchase,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
