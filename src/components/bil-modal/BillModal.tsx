import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Tabs, Tab, Typography } from '@mui/material';
import { Bill } from '../../types/Bill';
import { StyledTabPanel } from '../styles/BillModal.styles';

interface BillModalProps {
  bill: Bill | null;
  open: boolean;
  onClose: () => void;
}

export function BillModal({ bill, open, onClose }: BillModalProps): React.ReactElement {
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(_: React.SyntheticEvent, newValue: number): void {
    setSelectedTab(newValue);
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {bill?.bill_no} - {bill?.bill_type}
      </DialogTitle>
      <DialogContent>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="English" />
          <Tab label="Gaeilge" />
        </Tabs>
        <StyledTabPanel>
          {selectedTab === 0 ? (
            <Typography>{bill?.title_en}</Typography>
          ) : (
            <Typography>{bill?.title_ga}</Typography>
          )}
        </StyledTabPanel>
      </DialogContent>
    </Dialog>
  );
}
