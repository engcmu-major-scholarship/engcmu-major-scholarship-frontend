import { ReactNode } from 'react';

const Modal = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="absolute inset-0 max-h-screen max-w-screen overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;
