import { render, screen, fireEvent } from '@testing-library/react';
import { BillTable } from './BillTable';
import { Bill } from '../../types/Bill';

const mockBills: Bill[] = [
  {
    id: '1',
    bill_no: 'B123',
    bill_type: 'Public',
    status: 'Active',
    sponsor: 'John Doe',
    title_en: 'English Title',
    title_ga: 'Gaeilge Title',
  },
];

describe('BillTable', () => {
  it('renders table headers correctly', () => {
    render(<BillTable bills={mockBills} onRowClick={jest.fn()} />);
    expect(screen.getByText('Bill Number')).toBeInTheDocument();
    expect(screen.getByText('Type')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    expect(screen.getByText('Sponsor')).toBeInTheDocument();
    expect(screen.getByText('Favourite')).toBeInTheDocument();
  });

  it('renders bill row data correctly', () => {
    render(<BillTable bills={mockBills} onRowClick={jest.fn()} />);
    expect(screen.getByText('B123')).toBeInTheDocument();
    expect(screen.getByText('Public')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('calls onRowClick when a row is clicked', () => {
    const onRowClickMock = jest.fn();
    render(<BillTable bills={mockBills} onRowClick={onRowClickMock} />);
    fireEvent.click(screen.getByText('B123'));
    expect(onRowClickMock).toHaveBeenCalledWith(mockBills[0]);
  });
});
