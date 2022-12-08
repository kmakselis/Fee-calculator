import * as React from 'react';
import { Box, Grid, Modal, Typography } from '@mui/material';
import ClientsService from '../services/clients-service';
import { ClientCard, ClientForm, AdminToolbar } from './index';

const ClientsSection = () => {
  const [clients, setClients] = React.useState([]);
  const [clientEditing, setClientEditing] = React.useState(null);
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setClientEditing(null);
  };

  const fetchAllClients = async () => {
    const fetchedClients = await ClientsService.fetchAll();
    setClients(fetchedClients);
  };

  const createClient = async (clientProps) => {
    await ClientsService.create(clientProps);
    await fetchAllClients();
    setModalOpen(false);
  };

  const deleteClient = async (id) => {
    await ClientsService.remove(id);
    fetchAllClients();
  };

  const editClient = (id) => {
    const foundClient = clients.find((c) => c.id === id);
    setClientEditing(foundClient);
    setModalOpen(true);
  };

  const updateClient = async (clientProps) => {
    await ClientsService.update(clientEditing.id, clientProps);
    await fetchAllClients();
    closeModal();
  };

  React.useEffect(() => {
    (async () => {
      const fethedClients = await ClientsService.fetchAll();
      setClients(fethedClients);
    })();
  }, []);

  return (
    <>
      <AdminToolbar openModal={() => setModalOpen(true)} />

      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        >
          <ClientForm
            onSubmit={clientEditing ? updateClient : createClient}
            formTitle={clientEditing ? 'Update client' : 'Create new client'}
            submitText={clientEditing ? 'Update' : 'Create'}
            initValues={clientEditing}
          />
        </Box>
      </Modal>
      <Box>
        <Typography variant="h3" sx={{ textAlign: 'center', mt: 5 }}>Clients information</Typography>
        <Grid container spacing={2} sx={{ py: 5, px: 2 }}>
          {clients.map(({
            id,
            title,
            discountPercentage,
            transactionsCount,
            additionalDiscountPercentage,
            img,
          }) => (
            <Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <ClientCard
                title={title}
                discountPercentage={discountPercentage}
                transactionsCount={transactionsCount}
                additionalDiscountPercentage={additionalDiscountPercentage}
                img={img}
                onDelete={() => deleteClient(id)}
                onEdit={() => editClient(id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  )
}

export default ClientsSection;
