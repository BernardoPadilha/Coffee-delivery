import { Cards } from '../components/Cards';
import { IconBanner } from '../components/IconBanner';

import '../../public/image.png';
import '../../public/icon_box.png';
import '../../public/icon_coffee.png';
import '../../public/icon_timer.png';
import '../../public/icon_carrinho.png';
import { products } from '../utils/generate-products';
//img icons

export function Home() {
  return (
    <main className="mt-[92px] font-body">
      <div className="bg-background max-w-7xl mx-auto h-[calc(60vh-104px)] bg-center bg-cover bg-no-repeat flex justify-between">
        <div className="">
          <h1 className="text-title text-[40px] font-extrabold font-title mb-4">
            Encontre o café perfeito <br /> para qualquer hora do dia
          </h1>

          <p className="font-regular text-xl mb-[66px]">
            Com o Coffee Delivery você recebe seu café onde estiver, a <br />{' '}
            qualquer hora
          </p>

          <div className="grid gap-4 grid-cols-2 grid-rows-2 flex-1">
            <IconBanner
              img="icon_carrinho.png"
              content="Compra simples e segura"
            />
            <IconBanner
              img="icon_box.png"
              content="Embalagem mantém  o café intacto"
            />
            <IconBanner
              img="icon_timer.png"
              content="Entrega rápida e rastreada"
            />
            <IconBanner
              img="icon_coffee.png"
              content="O café chega fresquinho até você"
            />
          </div>
        </div>

        <img src="image.png" className="w-[476px] h-[360px] " />
      </div>

      <div className="w-full max-w-7xl mx-auto">
        <h1 className="font-extrabold text-[32px] mt-[32px]">Nossos cafés</h1>
        <div className="grid grid-cols-4 gap-[50px] w-full ">
          {products.map((product) => {
            return (
              <Cards
                key={product.id}
                id={product.id}
                tags={product.tags}
                img={product.img}
                name={product.name}
                description={product.description}
                price={product.price}
                frete={product.frete}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
