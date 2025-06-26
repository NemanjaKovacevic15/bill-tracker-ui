import styled from 'styled-components';
import { Box, FormControl } from '@mui/material';

export const Wrapper = styled(Box)`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

export const StyledFormControl = styled(FormControl)`
  min-width: 160px;
  flex: 1 1 auto;
`;
