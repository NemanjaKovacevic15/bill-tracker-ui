import axios from 'axios';
import { Bill } from '../types/Bill';

export interface RawApiBill {
  bill: {
    billNo?: string;
    billType?: string;
    status?: string;
    sponsors?: Array<{ sponsorPrinted?: string }>;
    shortTitleEn?: string;
    shortTitleGa?: string;
    uri?: string;
  };
}

export function mapApiBill(raw: RawApiBill): Bill {
  const bill = raw.bill;
  return {
    bill_no: bill.billNo || '-',
    bill_type: bill.billType || '-',
    status: bill.status || '-',
    sponsor: bill.sponsors?.[0]?.sponsorPrinted || 'Unknown',
    title_en: bill.shortTitleEn || '-',
    title_ga: bill.shortTitleGa || '-',
    id: bill.uri || String(Math.random())
  };
}

export interface FetchBillsParams {
  limit: number;
  skip: number;
  bill_type?: string;
  bill_status?: string;
  sponsor?: string;
}

export async function fetchBillsFromApi(params: FetchBillsParams): Promise<{
  bills: Bill[];
  total: number;
}> {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/legislation`, { params });
  const results = response.data.results || [];
  const bills = results.map(mapApiBill);
  const total = response.data.head?.counts?.resultCount || 0;
  return { bills, total };
}
