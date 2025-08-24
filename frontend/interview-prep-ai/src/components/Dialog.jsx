import { createContext, useContext, useState } from 'react';

const DialogContext = createContext();

export default function DialogProvider({ children }) {
  const [stack, setStack] = useState([]);

  const open = (id) => setStack((prev) => [...prev, id]);
  const onClose = () => setStack((prev) => prev.slice(0, -1));

  const top = stack.at(-1);
  const clearStack = () => setStack([]);
  return (
    <DialogContext.Provider value={{ stack, top, open, onClose, clearStack }}>
      {children}
    </DialogContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogContext);
  if (context === undefined) throw new Error('Dialog Context used outside');
  return context;
}
