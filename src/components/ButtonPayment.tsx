import { ReactElement, ReactNode } from 'react';

interface ButtonPaymentProps {
  icon: ReactElement;
  formOfPayment: string;
}

export function ButtonPayment({ icon, formOfPayment }: ButtonPaymentProps) {
  function handleReplaceColorButton() {
    console.log('mudar a cor');
  }

  return (
    <button
      className="w-[178px] h-[51px] flex items-center justify-start pl-4 text-xs bg-baseButton rounded-lg disabled:bg-purpleLight disabled:border-2 disabled:border-purple"
      disabled={false}
      onClick={handleReplaceColorButton}
    >
      {icon}
      {formOfPayment}
    </button>
  );
}
