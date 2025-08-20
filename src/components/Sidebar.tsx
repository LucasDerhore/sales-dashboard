import { NavLink } from "react-router-dom";
import { MdDashboard, MdInventory, MdPeopleAlt, MdAssessment, MdPointOfSale } from "react-icons/md";

const Sidebar = () => {
  const linkClass = "flex items-center gap-2 p-3 hover:bg-gray-200 rounded";
  const activeClass = "bg-blue-500 text-white";

  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">Sales Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <NavLink to="/dashboard" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <MdDashboard /> Dashboard
        </NavLink>
        <NavLink to="/products" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <MdInventory /> Produits
        </NavLink>
        <NavLink to="/clients" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <MdPeopleAlt /> Clients
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <MdAssessment /> Rapports
        </NavLink>
        <NavLink to="/sales" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ""}`}>
          <MdPointOfSale /> Ventes
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
