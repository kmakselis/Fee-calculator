import React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
} from '@mui/material';

const ClientForm = ({
  onSubmit,
  formTitle,
  submitText,
  initValues,
}) => {
  const [title, setTitle] = React.useState(initValues?.title ?? '');
  const [discountPercentage, setDiscountPercentage] = React.useState(initValues?.discountPercentage ?? 0);
  const [transactionsCount, setTransactionsCount] = React.useState(initValues?.transactionsCount ?? 0);
  const [additionalDiscountPercentage, setAdditionalDiscountPercentage] = React.useState(initValues?.additionalDiscountPercentage ?? 0);
  const [img, setImg] = React.useState(initValues?.img ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      title,
      discountPercentage,
      transactionsCount,
      additionalDiscountPercentage,
      img,
    });
  };

  return (
    <Paper component="form" sx={{ p: 3 }} onSubmit={handleSubmit}>
      <Typography variant="h4" sx={{ textAlign: 'center', pb: 2 }}>{formTitle}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Title"
          fullWidth
          variant="filled"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Discount percentage"
          fullWidth
          type='number'
          InputProps={{ inputProps: { min: 0 } }}
          variant="filled"
          value={discountPercentage}
          onChange={(event) => setDiscountPercentage(event.target.value)}
        />
        <TextField
          label="Transactions Count"
          fullWidth
          type='number'
          InputProps={{ inputProps: { min: 0 } }}
          variant="filled"
          value={transactionsCount}
          onChange={(event) => setTransactionsCount(event.target.value)}
        />
        <TextField
          label="Additional discount percentage"
          fullWidth
          type='number'
          InputProps={{ inputProps: { min: 0 } }}
          variant="filled"
          value={additionalDiscountPercentage}
          onChange={(event) => setAdditionalDiscountPercentage(event.target.value)}
        />
        <TextField
          label="Client logo"
          fullWidth
          variant="filled"
          value={img}
          onChange={(event) => setImg(event.target.value)}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="success"
            size="large"
          >
            {submitText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ClientForm;
