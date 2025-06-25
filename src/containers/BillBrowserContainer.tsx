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
  const [totalBills, setTotalBills] = useState(0);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [activeTab, setActiveTab] = useState(0); // 0 = All, 1 = Favourites

  const { favourites } = useContext(FavouritesContext) ?? { favourites: [] };

  const itemsPerPage = 10;

  useEffect(() => {
    async function loadBills(): Promise<void> {
      try {
        if (activeTab === 0) {
          const { bills, total } = await fetchBillsFromApi({
            limit: itemsPerPage,
            skip: (currentPage - 1) * itemsPerPage,
            bill_type: selectedType || undefined,
            bill_status: selectedStatus || undefined,
            sponsor: selectedSponsor || undefined,
          });
          setBills(bills);
          setTotalBills(total);
        } else {
          setBills(favourites);
          setTotalBills(favourites.length);
        }
      } catch (error) {
        console.error('Failed to load bills:', error);
      }
    }

    loadBills();
  }, [currentPage, selectedType, selectedStatus, selectedSponsor, activeTab, favourites]);

  const totalPages = Math.ceil(totalBills / itemsPerPage);
  const currentItems =
    activeTab === 1
      ? bills.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      : bills;

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

      <BillTable bills={currentItems} onRowClick={handleRowClick} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <BillModal bill={selectedBill} open={!!selectedBill} onClose={handleCloseModal} />
    </>
  );
}
