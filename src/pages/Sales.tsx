import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Papa from "papaparse";
import { api } from "../lib/api";

type Product = {
  id: number;
  name: string;
  price: number;
};

type Client = {
  id: number;
  name: string;
};

type Sale = {
  id: number;
  productId: number;
  clientId: number;
  date: string;
  quantity: number;
  product?: Product;
  client?: Client;
};

const Sales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [clients, setClients] = useState<Client[]>([]);

  const [form, setForm] = useState({
    productId: 0,
    clientId: 0,
    quantity: 1,
    date: dayjs().format("YYYY-MM-DD"),
  });

  const [filters, setFilters] = useState({
    clientId: 0,
    from: "",
    to: "",
  });

  const fetchAll = () => {
    // ⚡ L’API /sales renvoie déjà product + client inclus
    api.get("/sales").then((res) => setSales(res.data));
    api.get("/products").then((res) => setProducts(res.data));
    api.get("/clients").then((res) => setClients(res.data));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "quantity" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.productId || !form.clientId || form.quantity < 1) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    api.post("/sales", form).then(() => {
      setForm({
        productId: 0,
        clientId: 0,
        quantity: 1,
        date: dayjs().format("YYYY-MM-DD"),
      });
      fetchAll();
    });
  };

  const filteredSales = sales.filter((sale) => {
    const clientMatch = filters.clientId === 0 || sale.clientId === filters.clientId;
    const date = dayjs(sale.date);
    const fromMatch = filters.from ? date.isAfter(dayjs(filters.from).subtract(1, "day")) : true;
    const toMatch = filters.to ? date.isBefore(dayjs(filters.to).add(1, "day")) : true;
    return clientMatch && fromMatch && toMatch;
  });

  const exportToCSV = () => {
    const csv = Papa.unparse(
      filteredSales.map((sale) => ({
        Date: dayjs(sale.date).format("YYYY-MM-DD"),
        Produit: sale.product?.name ?? "",
        Client: sale.client?.name ?? "",
        Quantité: sale.quantity,
        PrixUnitaire: sale.product?.price ?? 0,
        Montant: ((sale.product?.price ?? 0) * sale.quantity).toFixed(2),
      }))
    );

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "ventes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Ventes</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 mb-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm">Produit</label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value={0}>-- Choisir un produit --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Client</label>
            <select
              name="clientId"
              value={form.clientId}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            >
              <option value={0}>-- Choisir un client --</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Quantité</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min={1}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
        </div>
        <div className="text-right">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Ajouter la vente
          </button>
        </div>
      </form>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
        <div className="flex gap-4 flex-wrap">
          <div>
            <label className="block text-sm">Client</label>
            <select
              value={filters.clientId}
              onChange={(e) =>
                setFilters((f) => ({ ...f, clientId: Number(e.target.value) }))
              }
              className="border p-2 rounded w-52"
            >
              <option value={0}>Tous les clients</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">De (date)</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={filters.from}
              onChange={(e) =>
                setFilters((f) => ({ ...f, from: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm">À (date)</label>
            <input
              type="date"
              className="border p-2 rounded"
              value={filters.to}
              onChange={(e) =>
                setFilters((f) => ({ ...f, to: e.target.value }))
              }
            />
          </div>
        </div>

        <button
          className="bg-gray-700 text-white px-4 py-2 rounded"
          onClick={exportToCSV}
        >
          Exporter en CSV
        </button>
      </div>

      <div className="bg-white rounded shadow p-6">
        <h2 className="text-lg font-bold mb-4">Liste des ventes</h2>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="pb-2">Date</th>
              <th className="pb-2">Produit</th>
              <th className="pb-2">Client</th>
              <th className="pb-2">Quantité</th>
              <th className="pb-2">Montant (€)</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) => (
              <tr key={sale.id} className="border-b text-sm">
                <td className="py-2">{dayjs(sale.date).format("DD/MM/YYYY")}</td>
                <td className="py-2">{sale.product?.name}</td>
                <td className="py-2">{sale.client?.name}</td>
                <td className="py-2">{sale.quantity}</td>
                <td className="py-2">
                  {((sale.product?.price ?? 0) * sale.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;