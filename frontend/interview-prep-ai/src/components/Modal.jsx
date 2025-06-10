import { HiXMark } from 'react-icons/hi2';
import useOutsideClick from '../hooks/useOutsideClick';
function Modal({ isOpen, onClose, title, hideHeader, children }) {
  const { ref } = useOutsideClick(onClose);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 items-center w-full h-full">
      <div
        className={`relative flex flex-col bg-white shadow-lg rounded-lg `}
        ref={ref}
      >
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            >
              <HiXMark size={18} />
            </button>
          </div>
        )}
        {hideHeader && (
          <div className="w-full flex items-center justify-end">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
            >
              <HiXMark size={18} />
            </button>
          </div>
        )}

        <div className="max-h-[30rem] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
