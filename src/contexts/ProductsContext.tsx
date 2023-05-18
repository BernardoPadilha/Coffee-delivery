import { ReactNode, createContext, useState } from 'react';

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

interface ProductsContextType {
  products: ProductProps[];
  addProductInCart: (product: ProductProps) => void;
  updateProductAmount: ({
    productId,
    amount,
  }: {
    productId: number;
    amount: number;
  }) => void;
  removeProduct: (productId: number) => void;
}

export const ProductsContext = createContext({} as ProductsContextType);

export function ProductsContextProvider({
  children,
}: ProductsContextProviderProps) {
  const [products, setProducts] = useState<ProductProps[]>([]);

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

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProductInCart,
        updateProductAmount,
        removeProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
