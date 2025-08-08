import { Page, View, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate, today } from 'src/utils/format-time';

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
    lineHeight: 1.5,
    backgroundColor: '#fff',
  },
  logo: { width: 100, marginBottom: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  bold: { fontWeight: 'bold' },
  redHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecoration: 'underline',
    marginBottom: 10,
  },
  topRightInfo: {
    textAlign: 'right',
    marginBottom: 10,
  },
  table: { display: 'table', width: 'auto', marginTop: 10 },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    paddingVertical: 4,
  },
  tableHeader: { fontWeight: 'bold', backgroundColor: '#eee' },
  col1: { width: '5%' },
  col2: { width: '35%' },
  col3: { width: '10%' },
  col4: { width: '15%' },
  col5: { width: '15%' },
  col6: { width: '10%' },
  col7: { width: '10%' },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#eee',
    paddingVertical: 4,
    borderTopWidth: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  footerTextLabel: {
    width: '70%',
    textAlign: 'right',
    paddingRight: 10,
    fontWeight: 'bold',
  },
  footerTextValue: {
    width: '30%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default function EtatStockPdf({ data, company }) {
  const totalAchat = data.reduce((sum, item) => sum + item.buyPrice * item.qty, 0);
  const totalVente = data.reduce((sum, item) => sum + item.sellPrice * item.qty, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.bold}>{company?.name}</Text>
            <Text>{company?.address}</Text>
            <Text>Tél.: {company?.phone}</Text>
            <Text>SIRET: {company?.siret}</Text>
            <Text>N°TVA Intracom : {company?.tva}</Text>
          </View>
          <View>
            <Text style={styles.topRightInfo}>État du stock</Text>
            <Text style={styles.topRightInfo}>date : {fDate(today())}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Nom du produit</Text>
            <Text style={styles.col3}>QTE</Text>
            <Text style={styles.col4}>Prix achat UHT</Text>
            <Text style={styles.col5}>Prix de vente UHT</Text>
            <Text style={styles.col6}>Total prix achat HT</Text>
            <Text style={styles.col7}>Total prix de vente HT</Text>
          </View>

          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={styles.col2}>{item.title}</Text>
              <Text style={styles.col3}>{item.qty}</Text>
              <Text style={styles.col4}>{item.buyPrice.toFixed(2)}€</Text>
              <Text style={styles.col5}>{item.sellPrice.toFixed(2)}€</Text>
              <Text style={styles.col6}>{(item.buyPrice * item.qty).toFixed(2)}€</Text>
              <Text style={styles.col7}>{(item.sellPrice * item.qty).toFixed(2)}€</Text>
            </View>
          ))}
        </View>

        {/* Footer Totals */}
        <View style={styles.footerRow}>
          <Text style={styles.footerTextLabel}>TOTAL ACHAT HT</Text>
          <Text style={styles.footerTextValue}>{totalAchat.toFixed(2)} €</Text>
        </View>
        <View style={styles.footerRow}>
          <Text style={styles.footerTextLabel}>TOTAL VENTE HT</Text>
          <Text style={styles.footerTextValue}>{totalVente.toFixed(2)} €</Text>
        </View>
      </Page>
    </Document>
  );
}
