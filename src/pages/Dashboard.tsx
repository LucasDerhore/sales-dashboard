import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [averageBasket, setAverageBasket] = useState(0);
  const [salesByMonth, setSalesByMonth] = useState<{ month: string; total: number }[]>([]);
  const [recentSales, setRecentSales] = useState<any[]>([]);

  useEffect(() => {
    // Produits
    axios.get("http://localhost:3001/products").then((res) => {
      setProductCount(res.data.length);
    });

    // Clients
    axios.get("http://localhost:3001/clients").then((res) => {
      setClientCount(res.data.length);
    });

    // Ventes pour total + panier moyen + chart
    axios.get("http://localhost:3001/sales?_expand=product").then((res) => {
      const sales = res.data;

      const total = sales.reduce(
        (sum: number, sale: any) => sum + sale.quantity * (sale.product?.price ?? 0),
        0
      );
      const avg = sales.length > 0 ? total / sales.length : 0;

      setTotalSales(total);
      setAverageBasket(avg);

      // Regrouper les ventes par mois
      const grouped: { [key: string]: number } = {};
      sales.forEach((sale: any) => {
        const month = dayjs(sale.date).format("YYYY-MM");
        const amount = sale.quantity * (sale.product?.price ?? 0);
        grouped[month] = (grouped[month] || 0) + amount;
      });

      const formatted = Object.entries(grouped)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([month, total]) => ({
          month: dayjs(month).format("MMM YYYY"),
          total: Number(total.toFixed(2)),
        }));

      setSalesByMonth(formatted);
    });

    // Ventes récentes (triées + client + produit)
    axios
      .get("http://localhost:3001/sales?_expand=product&_expand=client&_sort=date&_order=desc&_limit=5")
      .then((res) => {
        setRecentSales(res.data);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {/* Cartes de résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Produits" value={productCount} />
        <StatCard label="Clients" value={clientCount} />
        <StatCard label="Total des ventes (€)" value={totalSales.toFixed(2)} />
        <StatCard label="Panier moyen (€)" value={averageBasket.toFixed(2)} />
      </div>

      {/* Graphique des ventes mensuelles */}
      <SalesChart data={salesByMonth} />

      {/* Ventes récentes */}
      <div className="bg-white rounded-lg shadow mt-6 p-6">
        <h2 className="text-lg font-bold mb-4">Ventes récentes</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-2">Date</th>
              <th className="pb-2">Produit</th>
              <th className="pb-2">Client</th>
              <th className="pb-2">Quantité</th>
              <th className="pb-2">Montant (€)</th>
            </tr>
          </thead>
          <tbody>
            {recentSales.map((sale) => (
              <tr key={sale.id} className="border-b text-sm">
                <td className="py-2">{dayjs(sale.date).format("DD/MM/YYYY")}</td>
                <td className="py-2">{sale.product?.name}</td>
                <td className="py-2">{sale.client?.name}</td>
                <td className="py-2">{sale.quantity}</td>
                <td className="py-2">
                  {(sale.product?.price * sale.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;