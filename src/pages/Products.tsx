import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Product } from "../types/Product";
import ProductTable from "../components/ProductTable";
import ProductForm from "../components/ProductForm";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = () => {
    api.get("/products");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrUpdate = (productData: Omit<Product, "id">, id?: number) => {
    if (id) {
      api.put(`/products/${id}`, productData).then(fetchProducts);
    } else {
      api.post("/products", productData).then(fetchProducts);
    }
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("Supprimer ce produit ?")) {
      api.delete(`/products/${id}`).then(fetchProducts);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Produits</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => {
          setEditingProduct(null);
          setShowForm(true);
        }}
      >
        + Ajouter un produit
      </button>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={handleAddOrUpdate}
          onCancel={() => {
            setEditingProduct(null);
            setShowForm(false);
          }}
        />
      )}

      <ProductTable
        products={products}
        onEdit={(p) => {
          setEditingProduct(p);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;