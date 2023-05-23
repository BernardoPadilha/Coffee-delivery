import { ReactElement, useState } from 'react';


interface ButtonPaymentProps {
  id: number;
  icon: ReactElement;
  formOfPayment: string;
}

export function ButtonPayment({ icon, formOfPayment }: ButtonPaymentProps) {

  function handleActiveButton(id: number) {
    
  }


  return (
    <button
      className="w-[178px] h-[51px] flex items-center justify-start pl-4 text-xs bg-baseButton rounded-lg hover:bg-purpleLight"
      disabled={false}
    >
      {icon}
      {formOfPayment}
    </button>
  );
}
