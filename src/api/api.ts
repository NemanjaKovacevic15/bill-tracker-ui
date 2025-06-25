import axios from 'axios';

const BASE_URL = 'https://api.oireachtas.ie/v1';

export interface Bill {
  billNo: string;
  billType: string;
  status: string;
  shortTitleEn: string;
  shortTitleGa: string;
  sponsors: string[];
  uri: string;
}

export interface FetchBillsParams {
  limit?: number;
  skip?: number;
  billType?: string;
}

export interface FetchBillsResponse {
  bills: Bill[];
  totalCount: number;
}

export async function fetchBills({
  limit = 10,
  skip = 0,
  billType,
}: FetchBillsParams): Promise<FetchBillsResponse> {
  const params: any = {
    limit,
    skip,
    lang: 'en',
  };

  if (billType) {
    params.bill_type = billType;
  }

  const response = await axios.get(`${BASE_URL}/legislation`, {
    params,
  });

  const results = response.data.results || [];
  const totalCount = response.data.head?.counts?.billCount || 0;

  const bills: Bill[] = results.map((item: any) => {
    const billData = item.bill;
    const sponsors =
      billData.sponsors?.map((s: any) => s.sponsor?.showAs) || [];

    return {
      billNo: billData.billNo,
      billType: billData.billType,
      status: billData.status || 'Unknown',
      shortTitleEn: billData.shortTitleEn,
      shortTitleGa: billData.shortTitleGa,
      sponsors,
      uri: billData.uri,
    };
  });

  return { bills, totalCount };
}
