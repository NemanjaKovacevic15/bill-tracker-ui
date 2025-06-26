import { useEffect, useRef, useState } from 'react';
import { Bill } from '../types/Bill';
import { fetchBillsFromApi, FetchBillsParams } from '../services/bills';

interface UseBillsResult {
  bills: Bill[];
  total: number;
  loading: boolean;
  error: Error | null;
}

export function useBills(params: Omit<FetchBillsParams, 'limit' | 'skip'>): UseBillsResult {
  const cacheRef = useRef<Record<string, { bills: Bill[]; total: number }>>({});
  const [state, setState] = useState<{ bills: Bill[]; total: number }>({ bills: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const key = JSON.stringify(params);
    async function load(): Promise<void> {
      if (cacheRef.current[key]) {
        setState(cacheRef.current[key]);
        return;
      }
      setLoading(true);
      try {
        const result = await fetchBillsFromApi({ limit: 1000, skip: 0, ...params });
        cacheRef.current[key] = result;
        setState(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.bill_status, params.sponsor]);

  return { ...state, loading, error };
}
