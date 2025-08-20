import { Product } from "../types/Product";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

const ProductTable = ({ products, onEdit, onDelete }: Props) => {
  return (
    <table className="w-full bg-white rounded-lg shadow mt-6">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-4">Nom</th>
          <th className="p-4">Prix (€)</th>
          <th className="p-4">Stock</th>
          <th className="p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="p-4">{product.name}</td>
            <td className="p-4">{product.price}</td>
            <td className="p-4">{product.stock}</td>
            <td className="p-4 space-x-2">
              <button
                className="text-blue-600 hover:underline"
                onClick={() => onEdit(product)}
              >
                Éditer
              </button>
              <button
                className="text-red-600 hover:underline"
                onClick={() => onDelete(product.id)}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;