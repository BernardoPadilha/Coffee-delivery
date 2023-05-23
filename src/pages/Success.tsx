import '../../public/illustration.png'
import '../../public/icon_mapRounded.png';
import '../../public/icon_timer.png';
import '../../public/icon_money.png';
import { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';

export function Success() {
  const { purchase } = useContext(ProductsContext)

  function teste() {
    console.log(purchase)
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto h-screen mt-20 flex items-start justify-center gap-[102px]">
        <div >
          <div>
            <h1 className='font-extrabold text-yellowDark text-3xl '> Uhu! Pedido confirmado</h1> 
            <p>Agora é só aguardar que o café chegará até você</p>
          </div>

          <div className='max-w-[526px] py-10 pl-10 flex flex-col items-start justify-center gap-9 border border-solid border-purple rounded-tr-[36px] rounded-bl-[36px]'>
            {purchase.map((purchase, index) => {
              return (
                <div key={index}>
                    <div className='w-[354px] h-[42px] flex gap-3 items-center justify-between '>
                      <img src="icon_mapRounded.png" alt="" />
                      <p className='text-base'>
                        Entrega em <span className='font-bold ' >
                        {purchase.address.street}, 
                        {purchase.address.houseNumber}</span> 
                        {purchase.address.district} - 
                        {purchase.address.state}, 
                        {purchase.address.UF}
                      </p>
                    </div>

                    <div className='w-[185px] h-[42px] flex gap-3 items-center justify-between'>
                      <img src="icon_timer.png" alt="" />
                      <p className='text-base'>Previsão de entrega <span className='font-bold ' >20 min - 30 min</span> </p>
                    </div>

                    <div className='w-[206px] h-[42px] flex gap-3 items-center justify-between '>
                      <img src="icon_money.png" alt="" />
                      <p className='text-base'>Pagamento na entrega <span className='font-bold ' >Cartão de Crédito</span> </p>
                    </div>
                  </div>
              )
            })}
          </div>
        </div>

        <div >
          <img src="illustration.png" alt="" />
        </div>

      </div>
    </div>
  )
}