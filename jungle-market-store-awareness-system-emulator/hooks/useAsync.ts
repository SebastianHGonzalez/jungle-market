import { useState, useEffect } from "react";

export type Bag = {
  loading: boolean;
  error?: Error;
};

export default function useAsync<T>(getT: () => Promise<T>, initialValue: T): [T, Bag]{
  const [t, setT] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getT()
      .then(setT)
      .catch(setError)
      .finally(() => {
        setLoading(false);
      });
  }, [getT]);

  return [t, { loading, error }];
}
