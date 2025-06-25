import React from 'react';
import styled from 'styled-components';
import { Pagination } from '@mui/material';

const StyledPaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({ currentPage, totalPages, onPageChange }: PaginationControlsProps): React.ReactElement {
  function handleChange(_: React.ChangeEvent<unknown>, value: number): void {
    onPageChange(value);
  }

  return (
    <StyledPaginationContainer>
      <Pagination count={totalPages} page={currentPage} onChange={handleChange} color="primary" />
    </StyledPaginationContainer>
  );
}
