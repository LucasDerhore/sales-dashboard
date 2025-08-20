import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import dayjs from "dayjs";

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

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  title: { fontSize: 18, marginBottom: 20, textAlign: "center" },
  table: { display: "table", width: "100%", marginTop: 10 },
  row: { flexDirection: "row", borderBottom: "1 solid #ccc", padding: 4 },
  header: { fontWeight: "bold", backgroundColor: "#eee" },
  cell: { flex: 1, padding: 2 },
});

type Props = {
  sales: Sale[];
};

const SalesPDF = ({ sales }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Rapport des ventes</Text>

      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>Date</Text>
        <Text style={styles.cell}>Produit</Text>
        <Text style={styles.cell}>Client</Text>
        <Text style={styles.cell}>Quantité</Text>
        <Text style={styles.cell}>Montant (€)</Text>
      </View>

      {sales.map((sale) => (
        <View key={sale.id} style={styles.row}>
          <Text style={styles.cell}>{dayjs(sale.date).format("DD/MM/YYYY")}</Text>
          <Text style={styles.cell}>{sale.product?.name ?? ""}</Text>
          <Text style={styles.cell}>{sale.client?.name ?? ""}</Text>
          <Text style={styles.cell}>{sale.quantity}</Text>
          <Text style={styles.cell}>
            {((sale.product?.price ?? 0) * sale.quantity).toFixed(2)}
          </Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default SalesPDF;