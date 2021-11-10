import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import { useLocation } from "react-router-dom";
import { useState } from "react";

//Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();

export const useAppSelector = useSelector;

/**
 * a type-safe version of the `usePrevious` hook described here:
 * @see {@link https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state}
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value);
      },
    },
  };
};
