type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
  };
  
  export function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white rounded-xl p-6 max-w-md w-full">
          <button onClick={onClose} className="text-right float-right text-sm text-gray-500">×</button>
          {children}
        </div>
      </div>
    );
  }
  