import {memo, ReactNode} from "react";
import {createPortal} from "react-dom";
import classnames from "classnames";

import Panel from "../Panel";
import Icon from "../Icon";
import logo from "../../logo.png";

export interface IBaseModalProps {
  show: boolean;
  title: string;
  subtitle?: string;
  children: string | ReactNode;
  footer?: string | ReactNode;
  closeOnTap?: boolean;
  onClose?: () => void;
  closeClicked?: boolean;
}

export const BaseModal = memo((props: IBaseModalProps) => {
  const {title, subtitle, footer, closeOnTap, onClose, children, closeClicked} =
    props;

  const root = document.getElementById("root");

  if (!root) throw new Error("Root node not found. Cannot render modal.");

  const handleInsideClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (!closeOnTap) {
      event.stopPropagation();
    }
  };

  const handleOverlayClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div className="fixed top-0 left-0 right-0 bottom-0 z-40  flex justify-center items-center">
      <Panel
        extraClasses={classnames(
          "h-auto w-screen mx-8 lg:mx-0 lg:w-1/3 z-50 animate-fade-in-down",
          {
            Modal: true,
            "animate-fade-out-up": closeClicked,
            "Modal-show": props.show,
          }
        )}
      >
        <section
          className="flex flex-col gap-4 h-full"
          onClick={handleInsideClick}
        >
          <header className="flex flex-col justify-between items-center mb-2">
            <img src={logo} className="-mt-24 w-32" />
            <h1 className="text-lg">{title}</h1>
            {subtitle && (
              <p className="dark:text-white/50 text-neutral-midGrey text-xs cursor-pointer">
                {subtitle}
              </p>
            )}
            <Icon
              iconName="close"
              onClick={onClose}
              extraClasses="cursor-pointer text-base absolute top-4 right-4"
            />
          </header>
          <div className="Modal-content h-full">{children}</div>
          {footer && <div className="Modal-footer">{footer}</div>}
        </section>
      </Panel>
      <div
        className={classnames(
          "fixed bg-black/70 w-full h-full animate-backdrop-fade-in backdrop-blur",
          {
            "animate-backdrop-fade-out": closeClicked,
          }
        )}
        onClick={handleOverlayClick}
      ></div>
    </div>,
    root
  );
});
