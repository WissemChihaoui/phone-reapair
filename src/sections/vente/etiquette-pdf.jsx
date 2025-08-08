import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 8,
    fontFamily: 'Roboto',
    padding: 8,
    width: '80mm', // ticket width
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  section: {
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 3,
  },
});

export default function TicketPDF() {
  const items = [
    {
      article: 'ecran iphone 7 blancfdfdf',
      serial: '0',
      qty: 1,
      price: '100.00 €',
    },
    {
      article: 'ecran iphone 7 blancfdfdf',
      serial: '0',
      qty: 1,
      price: '100.00 €',
    },
    {
      article: 'sfsdfsdf',
      serial: '0',
      qty: 1,
      price: '36.00 €',
    },
    {
      article: 'top top',
      serial: '0',
      qty: 1,
      price: '59.00 €',
    },
  ];

  return (
    <Document>
      <Page size={{ width: 226.77, height: 'auto' }} style={styles.page}>
        {/* Header */}
        <Text style={styles.title}>Reçu de vente</Text>
        <View style={styles.row}>
          <Text style={styles.label}>N°:</Text>
          <Text>F2025-0601</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text>22-07-2025 14:40:21</Text>
        </View>

        <View style={styles.divider} />

        {/* Items */}
        {items.map((item, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.label}>Article:</Text>
            <Text>{item.article}</Text>
            <Text>Numéro de série: {item.serial}</Text>
            <Text>Quantité: {item.qty}</Text>
            <Text>Prix: {item.price}</Text>
            <View style={styles.divider} />
          </View>
        ))}

        {/* Totals */}
        <View style={styles.row}>
          <Text style={styles.label}>Total TVA:</Text>
          <Text>49.17 €</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Total TTC:</Text>
          <Text>295.00 €</Text>
        </View>

        <View style={styles.divider} />

        {/* Payment */}
        <View style={styles.row}>
          <Text style={styles.label}>Espèce</Text>
          <Text>295.00 €</Text>
        </View>

        <View style={styles.divider} />

        {/* Footer code */}
        <Text style={{ textAlign: 'center', marginTop: 4 }}>D5HCAQPV</Text>
      </Page>
    </Document>
  );
}
