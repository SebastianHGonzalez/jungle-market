import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import { useRouter } from 'next/router';

import mapObjectValues from 'lib/mapObjectValues';
import filterObject from 'lib/filterObject';
import isEmpty from 'lib/isEmpty';
import useDebounce from './useDebounce';

const QueryStateContext = createContext([{}, (k, v) => {}] as [
  {},
  (k: string, v: any) => void
]);

interface Props extends React.Props<any> {
  initialState: {};
}

const arraySeparator = ',';

function queryValueDeserializer(value: any) {
  if (typeof value === 'string') {
    return value.split(arraySeparator);
  }

  return value;
}

function queryValueSerializer(value: any) {
  if (Array.isArray(value)) return value.filter((i) => i).join(arraySeparator);

  return value;
}

export function deserializeQuery(query: {}) {
  return mapObjectValues(queryValueDeserializer, query);
}

function serializeQuery(query: {}): {} {
  return filterObject(
    ([, v]: any[]) => !isEmpty(v),
    mapObjectValues(queryValueSerializer, query),
  );
}

export function QueryStateProvider({ initialState, children }: Props) {
  const [state, setState] = useState(initialState);

  const onChange = useCallback(
    (k, v) => setState((prevState) => ({
      ...prevState,
      [k]: v,
    })),
    [],
  );

  const { replace, route, asPath } = useRouter();
  const debouncedState = useDebounce(state, 1000);
  useEffect(() => {
    const [pathname] = asPath.split('?');
    const queryString = new URLSearchParams(serializeQuery(debouncedState)).toString();

    replace(
      route,
      queryString ? `${pathname}?${queryString}` : pathname,
      {
        shallow: true,
      },
    );
  }, [debouncedState]);

  return (
    <QueryStateContext.Provider value={[state, onChange]}>
      {children}
    </QueryStateContext.Provider>
  );
}

export default function useQueryState<T>(
  key: string,
  initialValue: T,
): [[T], Dispatch<SetStateAction<T>>] {
  const [state, onChange]: any = useContext(QueryStateContext);

  const value = useMemo(() => [state[key] || initialValue].flat() as [T], [
    state,
    key,
  ]);
  const setValue = useCallback((newValue) => onChange(key, newValue), [
    onChange,
    key,
  ]);

  return [value, setValue];
}
