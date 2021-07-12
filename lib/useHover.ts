import { MutableRefObject, useEffect, useRef, useState } from "react";

type ReturnType = readonly [MutableRefObject<HTMLDivElement | null>, boolean];

const useHover = (): ReturnType => {
  const [value, setValue] = useState<boolean>(false);
  const ref = useRef(null);

  const handleMouseover = () => setValue(true);
  const handleMouseleave = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseover);
        node.addEventListener("mouseleave", handleMouseleave);

        return () => {
          node.removeEventListener("mouseover", handleMouseover);
          node.removeEventListener("mouseleave", handleMouseleave);
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref.current]
  );

  return [ref, value];
};

export default useHover;
