import * as React from 'react';
import { Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { ClientsSection } from './components';
import ClientsService from './services/clients-service';

const FeeCalculator = () => {
  
  const [clients, setClients] = React.useState([]);
  const [clientTitle, setClientTitle] = React.useState('');
  const [transactionDate, setTransactionDate] = React.useState('');
  const [transactionValue, setTransactionValue] = React.useState('');
  const [transactionFee, setTransactionFee] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState(null);
  
  const dateNow = new Date(transactionDate);
  const transactionDayOfWeek = dateNow.getDay();

  const calculateFee = async () => {
    const fetchedClients = await ClientsService.fetchAll();
    const foundClient = fetchedClients.find(({ title }) => clientTitle === title);

    if ((!transactionDate) || (!transactionValue) || (!clientTitle)) {
      const error = 'Please insert transaction date, client name and transaction value.'
      setErrorMessage(error);
    } else if (transactionDayOfWeek === 0 || transactionDayOfWeek === 6) {
      const fee = 0;
      setTransactionFee(fee);
      setErrorMessage(null);
    } else if (foundClient.transactionsCount > 10) {
      const fee =
        ((transactionValue * 0.01) *
          (1 - (foundClient.discountPercentage) / 100) *
          (1 - (foundClient.additionalDiscountPercentage) / 100))
          .toFixed(2);
      setTransactionFee(fee);
      setErrorMessage(null);
    } else {
      const fee =
        ((transactionValue * 0.01) *
          (1 - (foundClient.discountPercentage) / 100))
          .toFixed(2);
      setTransactionFee(fee);
      setErrorMessage(null);
    }
  }

  React.useEffect(() => {
    (async () => {
      const fethedClients = await ClientsService.fetchAll();
      setClients(fethedClients);
    })();
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '70%',
      ml: '15%',
      mt: 8
    }}>
      <Paper sx={{ height: '100%' }} component="form">

        <Typography variant="h4" sx={{ textAlign: 'center', p: 3 }}>Transaction information</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            type="date"
            fullWidth
            value={transactionDate}
            onChange={(event) => setTransactionDate(event.target.value)}
          />
          <TextField
            label="Client name"
            type="text"
            InputProps={{ inputProps: { minLength: 3 } }}
            select
            fullWidth
            options={clients}
            value={clientTitle}
            onChange={(event) => setClientTitle(event.target.value)}
          >
            {clients.map(({ id, title }) => (
              <MenuItem key={id} value={title}>{title}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Transaction Value"
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            fullWidth
            value={transactionValue}
            onChange={(event) => setTransactionValue(event.target.value)}
          />

          <Typography variant="h5" sx={{ textAlign: 'center' }}>{transactionDate} {clientTitle} {transactionValue}</Typography>

          <Box
            sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => calculateFee()}
            >Calculate transaction fee
            </Button>
          </Box>

          <Typography variant="h5" sx={{ textAlign: 'center', m: 4 }}>
            {transactionDate} {clientTitle} {transactionFee} <br></br>{errorMessage}</Typography>
        </Box>
      </Paper>

      <ClientsSection />

    </Box >
  );
};

export default FeeCalculator;
