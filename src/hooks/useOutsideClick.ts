import { useEffect, MutableRefObject, useState } from "react";

export default function useOutsideClick(ref: MutableRefObject<any>) {
  const [isOutside, setIsOutside] = useState(false);

  useEffect(() => {
    function handleMousedown(event: MouseEvent) {
      ref.current && setIsOutside(!ref.current.contains(event.target));
    }

    document.addEventListener("mousedown", handleMousedown);
    return () => document.removeEventListener("mousedown", handleMousedown);
  }, [ref]);

  return isOutside;
}
