import {Suspense, lazy} from "react";

import ErrorBoundary from "../error-boundary/ErrorBoundary";
import {useModal} from "../../context/modalContext";

interface ILazyComponentProps {
  filename: string;
}

export function LazyComponent({filename}: ILazyComponentProps) {
  const {closeModal} = useModal();
  const handleModalClose = () => {
    console.warn("I promise to close this modal");
    closeModal(filename);
  };

  const Component = lazy(() => import(`./${filename}/${filename}.tsx`));

  return (
    <Suspense fallback={null}>
      <ErrorBoundary>
        {filename ? <Component onClose={handleModalClose} /> : null}
      </ErrorBoundary>
    </Suspense>
  );
}
