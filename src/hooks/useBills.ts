import { useEffect, useRef, useState, useMemo } from 'react';
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

  const cacheKey = useMemo(() => {
    return JSON.stringify({
      bill_status: params.bill_status,
      sponsor: params.sponsor,
      bill_type: params.bill_type
    });
  }, [params.bill_status, params.sponsor, params.bill_type]);

  useEffect(() => {
    let isCancelled = false;

    async function load(): Promise<void> {
      if (cacheRef.current[cacheKey]) {
        setState(cacheRef.current[cacheKey]);
        return;
      }

      setLoading(true);
      try {
        const result = await fetchBillsFromApi({ limit: 1000, skip: 0, ...params });
        if (!isCancelled) {
          cacheRef.current[cacheKey] = result;
          setState(result);
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err as Error);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isCancelled = true;
    };
  }, [cacheKey]);

  return { ...state, loading, error };
}
