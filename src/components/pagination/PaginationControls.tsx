import React from 'react';
import { Pagination } from '@mui/material';
import { StyledPaginationContainer } from './styles/Pagination.styles';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange
}: PaginationControlsProps): React.ReactElement {
  function handleChange(_: React.ChangeEvent<unknown>, value: number): void {
    onPageChange(value);
  }

  return (
    <StyledPaginationContainer>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} color="primary" />
    </StyledPaginationContainer>
  );
}
