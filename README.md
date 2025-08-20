# 🧾 Sales Dashboard (React + Vite + Tailwind + JSON Server)

Un tableau de bord simple de gestion des ventes, développé avec React, TypeScript, TailwindCSS et simulé via une fausse API avec JSON Server.

---

## ✨ Fonctionnalités

- 📊 Dashboard récapitulatif des ventes
- 🧑‍💼 Gestion des produits, clients et ventes
- ➕ Ajout de ventes avec formulaire dynamique
- 🔍 Filtres par client et dates
- 📤 Export des ventes au format **CSV** ou **PDF**
- ⚡ Interface responsive avec TailwindCSS

---

## 📦 Stack technique

- [React + Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [JSON Server](https://github.com/typicode/json-server)
- [React PDF](https://react-pdf.org/)
- [PapaParse](https://www.papaparse.com/)

---

## 🚀 Lancer le projet en local

### 1. Clone le repo

```bash
git clone https://github.com/LucasDerhore/sales-dashboard.git
cd sales-dashboard
```

### 2. Installe les dépendances

```bash
npm install
```

### 3. Démarre l’API mockée

```bash
npx json-server --watch db.json --port 3001
```

### 4. Lance l’app React

```bash
npm run dev
```

---

## 📂 Arborescence simplifiée

```
src/
├── components/         # Composants réutilisables
│   └── SalesPDF.tsx    # Génération PDF des ventes
├── pages/
│   └── Sales.tsx       # Page principale des ventes
├── types/              # Types TypeScript (Product, Client, Sale)
├── App.tsx
└── main.tsx
```

---

## 📄 Exemple de données (db.json)

```json
{
  "products": [
    { "id": 1, "name": "Produit A", "price": 10 }
  ],
  "clients": [
    { "id": 1, "name": "Client X" }
  ],
  "sales": [
    {
      "id": 1,
      "productId": 1,
      "clientId": 1,
      "quantity": 2,
      "date": "2025-08-01"
    }
  ]
}
```

---

## 🙌 Auteur

Développé par [Lucas Derhore](https://github.com/LucasDerhore) – dans le cadre d’un projet d’entraînement pour les entretiens React.

---

## 📝 Licence

MIT — libre à réutiliser, partager, apprendre ✌️