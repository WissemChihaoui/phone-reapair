import { Page, View, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';
import { fDateTime } from 'src/utils/format-time'; // Adjust based on your utils path

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 10,
    padding: 40,
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#2d2d2d',
    color: '#fff',
    padding: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    padding: 6,
  },
  colArticle: { width: '40%' },
  colQte: { width: '10%', textAlign: 'center' },
  colDate: { width: '20%' },
  colType: { width: '15%' },
  colBoutique: { width: '15%' },
});

export default function DestockagePDF({ rows }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Déstockage</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.colArticle}>Article</Text>
          <Text style={styles.colQte}>Qte</Text>
          <Text style={styles.colDate}>Date</Text>
          <Text style={styles.colType}>Type</Text>
          <Text style={styles.colBoutique}>Boutique</Text>
        </View>

        {/* Table Rows */}
        {rows.map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.colArticle}>{row.name}</Text>
            <Text style={styles.colQte}>{row.qte || 1}</Text>
            <Text style={styles.colDate}>{fDateTime(row.createdAt)}</Text>
            <Text style={styles.colType}>{row.type}</Text>
            <Text style={styles.colBoutique}>{row.admin}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
