import { useState, useEffect } from "react";
import { Client } from "../types/Client";

type Props = {
  client: Client | null;
  onSubmit: (data: Omit<Client, "id">, id?: number) => void;
  onCancel: () => void;
};

const ClientForm = ({ client, onSubmit, onCancel }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
    } else {
      setName("");
      setEmail("");
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email }, client?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mt-6 space-y-4">
      <div>
        <label className="block text-sm">Nom</label>
        <input
          type="text"
          className="border p-2 rounded w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          className="border p-2 rounded w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {client ? "Mettre à jour" : "Ajouter"}
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600 px-4 py-2">
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ClientForm;
