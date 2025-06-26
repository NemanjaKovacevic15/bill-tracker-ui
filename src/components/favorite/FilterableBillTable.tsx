import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { BillTable } from '../bill-table/BillTable';
import { Bill } from '../../types/Bill';

export function FilterableBillTable(): React.ReactElement {
  const [bills, setBills] = useState<Bill[]>([]);
  const [filteredBills, setFilteredBills] = useState<Bill[]>([]);
  const [selectedBillType, setSelectedBillType] = useState<string>('');

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch('/legislation?limit=100');
      const json = await response.json();
      const results = json.results.map((r: any) => ({
        id: r.bill.uri,
        bill_no: r.bill.billNo,
        bill_type: r.bill.billType,
        status: r.bill.status,
        sponsor: r.bill.sponsors?.[0]?.by?.showAs ?? 'N/A',
        ...r.bill,
      }));
      setBills(results);
      setFilteredBills(results);
    };

    fetchBills();
  }, []);

  useEffect(() => {
    if (!selectedBillType) {
      setFilteredBills(bills);
    } else {
      setFilteredBills(bills.filter(b => b.bill_type === selectedBillType));
    }
  }, [selectedBillType, bills]);

  const handleBillTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedBillType(event.target.value);
  };

  return (
    <>
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <Typography variant="h6">Filter by Type:</Typography>
        <FormControl size="small">
          <InputLabel id="bill-type-label">Type</InputLabel>
          <Select
            labelId="bill-type-label"
            value={selectedBillType}
            label="Type"
            onChange={handleBillTypeChange}
            sx={{ minWidth: 160 }} 
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Government">Government</MenuItem>
            <MenuItem value="Private Members’">Private Members’</MenuItem>
            <MenuItem value="Money">Money</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <BillTable bills={filteredBills} onRowClick={(bill) => console.log('Selected:', bill)} />
    </>
  );
}
