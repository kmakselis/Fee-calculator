const serverAddress = 'http://localhost:8000';

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/clients`);
  const clients = await response.json();
  return clients;
};

const create = async (clientProps) => {
  const response = await fetch(`${serverAddress}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientProps),
  });

  const client = await response.json();

  return client;
};

const update = async (id, clientProps) => {
  const response = await fetch(`${serverAddress}/clients/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(clientProps),
  });

  const client = await response.json();

  return client;
};

const remove = async (id) => {
  await fetch(`${serverAddress}/clients/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const ClientsService = {
  fetchAll,
  create,
  update,
  remove,
};

export default ClientsService;
