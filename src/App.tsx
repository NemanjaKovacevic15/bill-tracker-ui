import { BillBrowserContainer } from './containers/BillBrowserContainer';
import { CssBaseline, Container, Typography } from '@mui/material';

function App(): React.ReactElement {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          style={{ marginTop: '24px' }}
        >
          Bill Tracker UI
        </Typography>
        <BillBrowserContainer />
      </Container>
    </>
  );
}

export default App;
