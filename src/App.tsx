import { BrowserRouter } from 'react-router-dom';

import { Router } from './Router';
import { ProductsContextProvider } from './contexts/ProductsContext';
import './global.css';
import { products } from './utils/generate-products';

export function App() {
  return (
    <BrowserRouter>
      <ProductsContextProvider>
        <Router />
      </ProductsContextProvider>
    </BrowserRouter>
  );
}
