import { useState, useEffect } from "react";
import { Product } from "../types/Product";

type Props = {
  product: Product | null;
  onSubmit: (p: Omit<Product, "id">, id?: number) => void;
  onCancel: () => void;
};

const ProductForm = ({ product, onSubmit, onCancel }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
    } else {
      setName("");
      setPrice(0);
      setStock(0);
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, price, stock }, product?.id);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium">Nom du produit</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Prix (€)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          required
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {product ? "Mettre à jour" : "Ajouter"}
        </button>
        <button type="button" onClick={onCancel} className="text-gray-600 px-4 py-2">
          Annuler
        </button>
      </div>
    </form>
  );
};

export default ProductForm;