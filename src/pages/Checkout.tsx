import { useContext } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'

import { ButtonPayment } from '../components/ButtonPayment';
import { ProductsContext } from '../contexts/ProductsContext';
import { formatPrice } from '../utils/format';

import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Minus,
  Money,
  Plus,
  Trash,
} from '@phosphor-icons/react';

const newPurchaseValidationSchema = z.object({
  CEP: z
    .string()
    .nonempty('O CEP é obrigatório')
    .max(9, 'Formato de CEP errado'),
  street: z.
    string()
    .nonempty('Digite o nome da sua rua')
    .transform(street => {
      return street.trim().split(' ').map(word => {
        return word[0].toLocaleUpperCase().concat(word.substring(1));
      }).join(' ')
    }),
  houseNumber: z.string().nonempty('Digite o número da sua casa'),
  complement: z.string().optional(),
  district: z.string().nonempty('Digite em qual bairro você mora'),
  state: z.string().nonempty('Digite em qual estado você mora'),
  UF: z
    .string()
    .min(2, 'Digite a UF de seu estado')
    .max(2, 'Digite a UF de seu estado'),
});
type NewPurchaseData = Zod.infer<typeof newPurchaseValidationSchema>

interface PurchaseProps {
  form: NewPurchaseData,
}
interface ProductProps {
  id: number;
  quantity: number;
}

export function Checkout() {
  const { products, removeProduct, updateProductAmount } =
    useContext(ProductsContext);

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<NewPurchaseData>({
    resolver: zodResolver(newPurchaseValidationSchema),
      defaultValues: {
        CEP: '',
        complement: '',
        district: '',
        houseNumber: '',
        state: '',
        street: '',
        UF: '',
      }
  });


  const total = formatPrice(
    products.reduce((sumTotal, product) => {
      sumTotal += product.price * product.quantity + product.frete;

      return sumTotal;
    }, 0)
  );

  const totalItems = formatPrice(
    products.reduce((sumTotal, product) => {
      sumTotal = product.price * product.quantity;

      return sumTotal;
    }, 0)
  );

  function handleCreateNewPurchase(data: any) {
    console.log(data);
  }

  function handleProductIncrement(product: ProductProps) {
    const incrementArguments = {
      productId: product.id,
      amount: product.quantity + 1,
    };
    updateProductAmount(incrementArguments);
  }

  function handleProductDecrement(product: ProductProps) {
    const decrementArguments = {
      productId: product.id,
      amount: product.quantity - 1,
    };

    if (product.quantity > 1) {
      updateProductAmount(decrementArguments);
    } else {
      return;
    }
  }

  return (
    <div>
      <form
      onSubmit={handleSubmit(handleCreateNewPurchase)}
      className="max-w-7xl mx-auto flex items-start justify-between"
    >
      <div>
        <div>
          <h1 className="font-extrabold mb-[15px]">Complete seu pedido</h1>
        </div>

        <div className="bg-card p-10 rounded-md">
          <div className="flex mb-8">
            <MapPin size={32} color="#C47F17" className="mr-2" />
            <div>
              <h1>Endereço de Entrega</h1>
              <p>Informe o endereço onde deseja receber seu pedido</p>
            </div>
          </div>

    
            <div className="flex flex-col items-start justify-center gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="CEP"
                  className="w-[200px] p-3  h-[42px]  bg-input rounded focusInput"
                  {...register('CEP')}
                />
                {errors.CEP && <span className=" text-sm text-red-500">{errors.CEP.message}</span>}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Rua"
                  className="w-[560px] p-3 h-[42px]  bg-input rounded focusInput"
                  {...register('street')}
                />
                {errors.street && <span className=" text-sm text-red-500">{errors.street.message}</span>}
              </div>
            </div>

            <div className="gap-4 flex mb-4 mt-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Número"
                  className="w-[200px] p-3  h-[42px] mr-3 bg-input rounded focusInput"
                  {...register('houseNumber')}
                />
                {errors.houseNumber && <span className=" text-sm text-red-500">{errors.houseNumber.message}</span>}
              </div>

                <input
                  type="text"
                  placeholder="Complemento"
                  className="w-[348px] p-3  h-[42px] bg-input rounded focusInput"
                  {...register('complement')}
                />

            </div>

            <div className="flex">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Bairro"
                  className="w-[200px] p-3  h-[42px] mr-3 bg-input rounded focusInput"
                  {...register('district')}
                />
                {errors.district && <span className=" text-sm text-red-500">{errors.district.message}</span>}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Estado"
                  className="w-[276px] p-3  h-[42px] mr-3 bg-input rounded focusInput"
                  {...register('state')}
                />
                {errors.state && <span className=" text-sm text-red-500">{errors.state.message}</span>}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="UF"
                  className="w-[60px] p-3 h-[42px] bg-input rounded focusInput"
                  {...register('UF')}
                />
                {errors.UF && <span className=" text-sm text-red-500">{errors.UF.message}</span>}
              </div>
            </div>
        </div>

        <div className="bg-card flex flex-col justify-start pt-10 mt-3 p-10 rounded-md ">
          <div className="flex items-start justify-start ">
            <CurrencyDollar size={24} color="#8047F8" className="mr-[8px]" />

            <div className="mb-8">
              <h1 className="mb-[2px]">Pagamento</h1>
              <p>
                O pagamento é feito na entrega. Escolha a forma que deseja pagar{' '}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-10">
            <ButtonPayment
              icon={
                <CreditCard size={16} color="#8047F8 " className="mr-[12px]" />
              }
              formOfPayment="CARTÃO DE CRÉDITO"
            />

            <ButtonPayment
              icon={<Bank size={16} color="#8047F8 " className="mr-[12px]" />}
              formOfPayment="CARTÃO DE DÉBITO"
            />

            <ButtonPayment
              icon={<Money size={16} color="#8047F8 " className="mr-[12px]" />}
              formOfPayment="DINHEIRO"
            />
          </div>
        </div>
      </div>

      <div className=" w-full flex flex-col items-start justify-start ml-8">
        <div>
          <h1 className="font-extrabold mb-[15px]">Cafés selecionado</h1>
        </div>

        <div className="bg-card p-10 w-full rounded-tl-md rounded-br-md rounded-tr-[44px] rounded-bl-[44px]">
          {products.map((product, index) => {
            return (
              <div key={index}>
                <div className="flex justify-between items-start ">
                  <div className="flex">
                    <img src={product.img} className="w-[64px] mr-5" />
                    <div className="flex flex-col justify-between items-center">
                      <h1>{product.name}</h1>

                      <div className="flex">
                        <div className="w-[72px] h-[32px] flex justify-around items-center bg-baseButton rounded-md mr-2">
                          <button
                            onClick={() => handleProductIncrement(product)}
                          >
                            <Plus size={14} color="#8047F8" />
                          </button>

                          <span className="text-base">{product.quantity}</span>

                          <button
                            onClick={() => handleProductDecrement(product)}
                          >
                            <Minus size={14} color="#8047F8" />
                          </button>
                        </div>

                        <button
                          className="w-[72px] h-[32px] flex justify-around items-center bg-baseButton rounded-md"
                          onClick={() => removeProduct(product.id)}
                        >
                          <Trash size={16} color="#8047F8" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-sm mr-[23px] text-text whitespace-nowrap">
                      R$ <span className="text-2xl">{product.price}</span>
                    </h1>
                  </div>
                </div>
                <footer className="border-t-[1px] border-solid border-baseButton mt-5"></footer>
              </div>
            );
          })}

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-sm">Total de itens</h1>
              <p className="text-sm">
                {totalItems}
              </p>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h1 className="text-sm">Total de frete</h1>
              <p className="text-sm">
                R$ <span>3,50</span>
              </p>
            </div>

            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-bold">Total</h1>
              <p className="text-lg font-bold">
                {total}
              </p>
            </div>

            <button 
              type='submit'
              className="w-full h-[46px] bg-yellow text-white rounded-md mt-6 hover:bg-yellowDark duration-200">
                CONFIRMAR PEDIDO
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
  );
}
