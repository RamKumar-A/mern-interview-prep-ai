import { cloneElement } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import { useDialog } from './Dialog';

function Window({ children, title, id }) {
  const { stack, onClose } = useDialog();
  // const callOnClose = stack.includes(id) ? onClose : () => {};
  // const { ref } = useOutsideClick(callOnClose);
  if (!stack.includes(id)) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
      <div
        className="bg-white rounded-lg shadow-lg w-[400px] max-h-[30rem] overflow-y-auto max-sm:w-[90%] relative"
        // ref={ref}
      >
        <div
          className={`flex justify-between items-center border-b border-gray-300 p-2 ${
            !title && 'justify-end'
          }`}
        >
          {title && <h3 className="font-semibold">{title}</h3>}
          <button onClick={onClose} className="cursor-pointer ">
            <HiXMark />
          </button>
        </div>
        <div className="p-3">
          {cloneElement(children, {
            onCloseDialog: onClose,
            onClick: (e) => {
              e.stopPropagation();
            },
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Window;
