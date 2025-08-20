import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Client } from "../types/Client";
import ClientForm from "../components/ClientForm";

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchClients = () => {
    api.get("/clients").then((res) => setClients(res.data));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddOrUpdate = (data: Omit<Client, "id">, id?: number) => {
    const req = id ? api.put(`/clients/${id}`, data) : api.post("/clients", data);
    req.then(fetchClients);
    setEditingClient(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Supprimer ce client ?")) {
      api.delete(`/clients/${id}`).then(fetchClients);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingClient(null);
          setShowForm(true);
        }}
      >
        + Ajouter un client
      </button>

      {showForm && (
        <ClientForm
          client={editingClient}
          onSubmit={handleAddOrUpdate}
          onCancel={() => {
            setEditingClient(null);
            setShowForm(false);
          }}
        />
      )}

      <div className="bg-white rounded shadow mt-6">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="p-4">Nom</th>
              <th className="p-4">Email</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b text-sm">
                <td className="p-4">{client.name}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4 space-x-2">
                  <button
                    className="text-blue-600 hover:underline"
                    onClick={() => {
                      setEditingClient(client);
                      setShowForm(true);
                    }}
                  >
                    Éditer
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDelete(client.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;