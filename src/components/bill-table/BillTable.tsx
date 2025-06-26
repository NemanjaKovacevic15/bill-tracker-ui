import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Bill } from '../../types/Bill';
import { FavouriteToggle } from '../favorite/FavouriteToggle';
import { StyledTableContainer } from '../styles/BillTable.styles';


interface BillTableProps {
  bills: Bill[];
  onRowClick: (bill: Bill) => void;
}

export function BillTable({ bills, onRowClick }: BillTableProps): React.ReactElement {
  function handleRowClick(bill: Bill): void {
    onRowClick(bill);
  }

  function renderTableRow(bill: Bill): React.ReactElement {
    return (
      <TableRow key={bill.id} hover onClick={() => handleRowClick(bill)}>
        <TableCell>{bill.bill_no}</TableCell>
        <TableCell>{bill.bill_type}</TableCell>
        <TableCell>{bill.status}</TableCell>
        <TableCell>{bill.sponsor}</TableCell>
        <TableCell>
          <FavouriteToggle bill={bill} />
        </TableCell>
      </TableRow>
    );
  }

  return (
    <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Bill Number</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Sponsor</TableCell>
            <TableCell>Favourite</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map(renderTableRow)}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}