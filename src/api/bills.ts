import axios from 'axios';
import { Bill } from '../types/Bill';

export function mapApiBill(raw: any): Bill {
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

export async function fetchBillsFromApi(params: {
  limit: number;
  skip: number;
  bill_type?: string;
  bill_status?: string;
  sponsor?: string;
}): Promise<{ bills: Bill[]; total: number }> {
  const response = await axios.get('https://api.oireachtas.ie/v1/legislation', { params });
  const results = response.data.results || [];
  const bills = results.map(mapApiBill);
  const total = response.data.head?.counts?.resultCount || 0;
  return { bills, total };
}
