import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { ArrowContainer, Popover } from "react-tiny-popover";

type TooltipProps = {
  trigger: (
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => ReactElement;
  content: ReactElement;
};

const Tooltip: React.FC<TooltipProps> = ({ content, trigger }) => {
  const [show, setShow] = useState(false);

  const handleEsc = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") setShow(false);
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleEsc, false);
    return function cleanup() {
      document.removeEventListener("keydown", handleEsc, false);
    };
  }, []);

  return (
    <>
      {show && <div className="overlay" onClick={() => setShow(false)} />}
      <Popover
        onClickOutside={() => setShow(false)}
        isOpen={show}
        positions={["bottom", "left"]}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor="#333"
            arrowSize={6}
            className="popover-arrow-container"
            arrowClassName="popover-arrow"
          >
            <div className="popover">{content}</div>
          </ArrowContainer>
        )}
        padding={4}
      >
        {trigger(show, setShow)}
      </Popover>
      <style jsx>{`
        .popover {
          background: #333;
          color: white;
          border-radius: 2px;
          padding: 16px;
          margin-right: 24px;
        }
        .overlay {
          position: absolute;
          top: 65px;
          right: 0;
          left: 0;
          bottom: 0;
          opacity: 0;
        }
      `}</style>
    </>
  );
};

export default Tooltip;
