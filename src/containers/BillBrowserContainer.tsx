import React, { useEffect, useState, useContext } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Bill } from '../types/Bill';
import { BillTable } from '../components/BillTable';
import { FilterBar } from '../components/FilterBar';
import { PaginationControls } from '../components/PaginationControls';
import { BillModal } from '../components/BillModal';
import { FavouritesContext } from '../context/FavouritesContext';
import { fetchBillsFromApi } from '../api/bills';

export function BillBrowserContainer(): React.ReactElement {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedSponsor, setSelectedSponsor] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [activeTab, setActiveTab] = useState(0); 

  const { favourites } = useContext(FavouritesContext) ?? { favourites: [] };

  const itemsPerPage = 10;

  useEffect(() => {
    async function loadBills(): Promise<void> {
      try {
        if (activeTab === 0) {
          const { bills } = await fetchBillsFromApi({
            limit: 1000, 
            skip: 0,
            bill_status: selectedStatus || undefined,
            sponsor: selectedSponsor || undefined,
          });
          setBills(bills);
        } else {
          setBills(favourites);
        }
      } catch (error) {
        console.error('Failed to load bills:', error);
      }
    }

    loadBills();
  }, [selectedStatus, selectedSponsor, activeTab, favourites]);

  function applyLocalFilters(allBills: Bill[]): Bill[] {
    return allBills.filter((bill) =>
      (!selectedType || bill.bill_type === selectedType) &&
      (!selectedStatus || bill.status === selectedStatus) &&
      (!selectedSponsor || bill.sponsor === selectedSponsor)
    );
  }

  const filteredBills = applyLocalFilters(bills);
  const totalPages = Math.ceil(filteredBills.length / itemsPerPage);
  const paginatedBills = filteredBills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  function handleFilterChange(filters: {
    type: string;
    status: string;
    sponsor: string;
  }): void {
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

  const availableTypes = Array.from(new Set(bills.map((b) => b.bill_type))).filter(Boolean);
  const availableStatuses = Array.from(new Set(bills.map((b) => b.status))).filter(Boolean);
  const availableSponsors = Array.from(new Set(bills.map((b) => b.sponsor))).filter(Boolean);

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
