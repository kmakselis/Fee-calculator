import React from 'react';
import {
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';

const AdminToolbar = ({ openModal }) => (
  <Paper sx={{ p: 1, mt: 5, bgcolor: '#EFF5F5', width: '100%' }}>
    <Typography variant="h6" sx={{ textAlign: 'center'}}>Admin tools</Typography>
    <Box
      sx={{
        p: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
      }}
    >
      <Button variant="contained" color="success" onClick={openModal}>Create new client</Button>
    </Box>
  </Paper>
);

export default AdminToolbar;
