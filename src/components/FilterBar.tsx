import styled from 'styled-components';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

const Wrapper = styled(Box)`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 16px;
  flex-wrap: wrap;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 200px;
`;

interface FilterBarProps {
  selectedType: string;
  selectedStatus: string;
  selectedSponsor: string;
  availableTypes: string[];
  availableStatuses: string[];
  availableSponsors: string[];
  onFilterChange: (filters: {
    type: string;
    status: string;
    sponsor: string;
  }) => void;
}

export function FilterBar({
  selectedType,
  selectedStatus,
  selectedSponsor,
  availableTypes,
  availableStatuses,
  availableSponsors,
  onFilterChange,
}: FilterBarProps): React.ReactElement {
  const handleChange =
    (field: 'type' | 'status' | 'sponsor') =>
      (event: SelectChangeEvent): void => {
        onFilterChange({
          type: field === 'type' ? event.target.value : selectedType,
          status: field === 'status' ? event.target.value : selectedStatus,
          sponsor: field === 'sponsor' ? event.target.value : selectedSponsor,
        });
      };

  return (
    <Wrapper>
      {/* Bill Type */}
      <StyledFormControl variant="outlined" size="small">
        <InputLabel id="type-label">Bill Type</InputLabel>
        <Select
          labelId="type-label"
          value={selectedType}
          onChange={handleChange('type')}
          label="Bill Type"
        >
          <MenuItem value="">All</MenuItem>
          {availableTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      {/* Status */}
      <StyledFormControl variant="outlined" size="small">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          value={selectedStatus}
          onChange={handleChange('status')}
          label="Status"
        >
          <MenuItem value="">All</MenuItem>
          {availableStatuses.map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>

      {/* Sponsor */}
      <StyledFormControl variant="outlined" size="small">
        <InputLabel id="sponsor-label">Sponsor</InputLabel>
        <Select
          labelId="sponsor-label"
          value={selectedSponsor}
          onChange={handleChange('sponsor')}
          label="Sponsor"
        >
          <MenuItem value="">All</MenuItem>
          {availableSponsors.map((sponsor) => (
            <MenuItem key={sponsor} value={sponsor}>
              {sponsor}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Wrapper>
  );
}
