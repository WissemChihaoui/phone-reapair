import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { fDate, today } from 'src/utils/format-time';
// import logo from '/public/logo/myphone-logo.png';

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
  section: { marginBottom: 10 },
  bold: { fontWeight: 'bold' },
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
  col2: { width: '45%' },
  col3: { width: '20%' },
  col4: { width: '15%' },
  col5: { width: '15%' },
});

export function InventairePDF() {
  const inventaire = {
    inventaireId: '1',
    createdBy: 'triosteck',
    note: 'test',
    createdAt: today(),
    confirmed: false,
    items: [
      { title: 'Engine Oil', crmQty: 5, realQty: 4 },
      { title: 'Air Filter', crmQty: 10, realQty: 9 },
      { title: 'Brake Pads', crmQty: 8, realQty: 8 },
    ],
    company: {
      name: 'demo reparateur',
      address: 'Rue Général Delacroix - Bazin\n97139 Les Abymes',
      phone: '0690751575',
      siret: '',
      tva: '',
    },
  };

  const { createdBy, createdAt, items = [], company } = inventaire;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            {/* <Image src={logo} style={styles.logo} /> */}
            <Text style={styles.bold}>{company?.name}</Text>
            <Text>{company?.address}</Text>
            <Text>Tél.: {company?.phone}</Text>
            <Text>SIRET: {company?.siret}</Text>
            <Text>N°TVA Intracom : {company?.tva}</Text>
          </View>
          <View>
            <Text style={styles.bold}>Créer par:</Text>
            <Text>{createdBy}</Text>
            <Text style={[styles.bold, { marginTop: 8 }]}>Date de l&apos;inventaire:</Text>
            <Text>{fDate(createdAt)}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.col1}>#</Text>
            <Text style={styles.col2}>Non du produit</Text>
            <Text style={styles.col3}>EAN</Text>
            <Text style={styles.col4}>QTE</Text>
            <Text style={styles.col4}>QTE Réel</Text>
            <Text style={styles.col5}>Ecart</Text>
          </View>

          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.col1}>{index + 1}</Text>
              <Text style={styles.col2}>{item.title}</Text>
              <Text style={styles.col3}>-</Text>
              <Text style={styles.col4}>{item.crmQty}</Text>
              <Text style={styles.col4}>{item.realQty}</Text>
              <Text style={styles.col5}>{Math.abs(item.crmQty - item.realQty)}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
