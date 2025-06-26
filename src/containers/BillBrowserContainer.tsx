import React, { useContext, useState } from 'react';
import { Tabs, Tab, CircularProgress, Box } from '@mui/material';
import { Bill } from '../types/Bill';
import { BillTable } from '../components/bill-table/BillTable';
import { FilterBar } from '../components/filter/FilterBar';
import { PaginationControls } from '../components/pagination/PaginationControls';
import { BillModal } from '../components/bil-modal/BillModal';
import { FavouritesContext } from '../context/FavouritesContext';
import { useBills } from '../hooks/useBills';
import { usePagination } from '../hooks/usePagination';

export function BillBrowserContainer(): React.ReactElement {
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const { favourites } = useContext(FavouritesContext) ?? { favourites: [] };

  const { bills: apiBills, loading } = useBills({
    bill_status: selectedStatus || undefined,
    sponsor: selectedSponsor || undefined
  });

  const displayedBills = activeTab === 0 ? apiBills : favourites;

  const filteredBills = applyLocalFilters(displayedBills);

  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedBills,
    setCurrentPage
  } = usePagination(filteredBills, 10);

  if (loading && activeTab === 0) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  function applyLocalFilters(allBills: Bill[]): Bill[] {
    return allBills.filter(
      bill =>
        (!selectedType || bill.bill_type === selectedType) &&
        (!selectedStatus || bill.status === selectedStatus) &&
        (!selectedSponsor || bill.sponsor === selectedSponsor)
    );
  }

  function handleFilterChange(filters: { type: string; status: string; sponsor: string }): void {
    setSelectedType(filters.type);
    setSelectedStatus(filters.status);
    setSelectedSponsor(filters.sponsor);
    setCurrentPage(1);
  }

  function handlePageChange(page: number): void {
    setCurrentPage(page);
  }

  function handleTabChange(_: React.SyntheticEvent, newValue: number): void {
    setActiveTab(newValue);
    setCurrentPage(1);
  }

  function handleRowClick(bill: Bill): void {
    setSelectedBill(bill);
  }

  function handleCloseModal(): void {
    setSelectedBill(null);
  }

  const availableTypes = Array.from(new Set(displayedBills.map(b => b.bill_type))).filter(Boolean);
  const availableStatuses = Array.from(new Set(displayedBills.map(b => b.status))).filter(Boolean);
  const availableSponsors = Array.from(new Set(displayedBills.map(b => b.sponsor))).filter(Boolean);

  return (
    <>
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="All Bills" />
        <Tab label="Favourites" />
      </Tabs>

      <FilterBar
        selectedType={selectedType}
        selectedStatus={selectedStatus}
        selectedSponsor={selectedSponsor}
        availableTypes={availableTypes}
        availableStatuses={availableStatuses}
        availableSponsors={availableSponsors}
        onFilterChange={handleFilterChange}
      />

      <BillTable bills={paginatedBills} onRowClick={handleRowClick} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <BillModal bill={selectedBill} open={!!selectedBill} onClose={handleCloseModal} />
    </>
  );
}
