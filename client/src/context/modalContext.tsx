import React, {createContext, useContext, useState, useCallback} from "react";

import {LazyComponent} from "../components/modals/LazyComponent";

export type Modal = {
  id: string;
  open: boolean;
  onDismiss?: () => void;
};

export type ModalMap = {
  [id: string]: Modal;
};

interface IModalProviderProps {
  children: React.ReactNode;
}

const ModalContext = createContext<{
  openModal: (id: string, onDismiss?: () => void) => void;
  closeModal: (id: string) => void;
  modals: ModalMap;
}>({
  openModal: (id: string, onDismiss?: () => void) => {
    console.warn(
      "openModal not implemented",
      id,
      "with dismiss handler",
      onDismiss
    );
  },
  closeModal: (id: string) => {
    console.warn("closeModal not implemented", id);
  },
  modals: {},
});

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<IModalProviderProps> = ({children}) => {
  const [modals, setModals] = useState<ModalMap>({
    SettingsModal: {
      id: "SettingsModals",
      open: false,
    },

    NotificationsModal: {
      id: "NotificationsModal",
      open: false,
    },
  });

  const openModal = useCallback((id: string, onDismiss?: () => void) => {
    setModals((prev) => ({
      ...prev,
      [id]: {...prev[id], open: true, onDismiss},
    }));
  }, []);

  const closeModal = (id: string) => {
    const modal = modals[id];
    if (modal && modal.onDismiss) {
      modal.onDismiss();
    }
    setModals((prev) => ({
      ...prev,
      [id]: {...prev[id], open: false},
    }));
  };

  return (
    <ModalContext.Provider value={{openModal, closeModal, modals}}>
      <>
        {Object.keys(modals)
          .filter((id) => modals[id].open)
          .map((id) => (
            <LazyComponent key={id} filename={id} />
          ))}
        {children}
      </>
    </ModalContext.Provider>
  );
};
