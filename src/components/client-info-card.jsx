import * as React from 'react';
import {
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import ClientLogo from './client-logo';

const ClientCard = ({
  title,
  discountPercentage,
  transactionsCount,
  additionalDiscountPercentage,
  img,
  onDelete,
  onEdit,
}) => (
  <Card sx={{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }}
  >
    <Box sx={{ position: 'relative', width: '100%', pt: '60%' }}>
      <ClientLogo src={img} sx={{ position: 'absolute', top: 0, left: 0 }} />
    </Box>

    <Box sx={{ m: 2, display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h6" component="div">{title}</Typography>
    </Box>
    <CardContent sx={{
      display: 'flex', justifyContent: 'center', height: '100%', flexGrow: 1,
    }}
    >

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'left',
        m: 1,
        width: '50%',
      }}
      >
        <Box sx={{ m: 1 }}>
          <Typography variant="subtitle" component="div">Transactions:</Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <Typography variant="subtitle" component="div">Discount:</Typography>
        </Box>
        <Box sx={{ m: 1 }}>
          <Typography variant="subtitle" component="div">Conditional discounts:</Typography>
        </Box>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left',
        alignItems: 'left',
        m: 1,
        width: '50%',
      }}
      >
        <Box sx={{ fontWeight: 'bold', m: 1 }}>
          <Typography variant="subtitle" component="div">{transactionsCount}</Typography>
        </Box>
        <Box sx={{ fontWeight: 'bold', m: 1 }}>
          <Typography variant="subtitle" component="div">{discountPercentage} %</Typography>
        </Box>
        <Box sx={{ fontWeight: 'bold', m: 1 }}>
          <Typography variant="subtitle" component="div">{additionalDiscountPercentage} %</Typography>
        </Box>
      </Box>
    </CardContent>
    <CardActions sx={{ p: 2, alignSelf: 'center' }}>
      <Button
        size="small"
        variant="contained"
        color="primary"
        onClick={onEdit}
      >
        Update
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        onClick={onDelete}
      >
        Delete
      </Button>
    </CardActions>
  </Card>
);

export default ClientCard;
