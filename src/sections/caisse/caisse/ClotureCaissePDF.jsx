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
    fontSize: 10,
    fontFamily: 'Roboto',
    padding: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginVertical: 10,
    textDecoration: 'underline',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    width: '60%',
  },
  value: {
    width: '40%',
    textAlign: 'right',
  },
  header: {
    marginBottom: 20,
  },
  shopInfo: {
    marginBottom: 4,
  },
});

const paymentLines = [
  'Espèce',
  'CB',
  'Chèque',
  'Virement',
  'Paypal',
  'crédit/paiement en plusieurs fois',
  'Bonus Réparation Déduction',
  'Bonus Réparation Déduction', // Appears twice in source
];

const renderPaymentSection = (title, data = {}) => (
  <>
    <Text style={styles.sectionTitle}>{title}</Text>
    {paymentLines.map((label, idx) => (
      <View key={idx} style={styles.row}>
        <Text style={styles.label}>{label} :</Text>
        <Text style={styles.value}>x0 0 €</Text>
      </View>
    ))}
    <View style={styles.row}>
      <Text style={[styles.label, { fontWeight: 'bold' }]}>Total :</Text>
      <Text style={[styles.value, { fontWeight: 'bold' }]}>0 €</Text>
    </View>
  </>
);

export default function ClotureCaissePDF({ date = '08-08-2025' }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Clôture de caisse {date}</Text>

        {/* Header / Boutique Info */}
        <View style={styles.header}>
          <Text style={[styles.shopInfo, { fontWeight: 'bold' }]}>demo reparateur</Text>
          <Text style={styles.shopInfo}>Rue Général Delacroix - Bazin</Text>
          <Text style={styles.shopInfo}>97139 Les Abymes</Text>
          <Text style={styles.shopInfo}>Tél.: 0690751575</Text>
          <Text style={styles.shopInfo}>SIRET :</Text>
          <Text style={styles.shopInfo}>N°TVA Intracom :</Text>
        </View>

        {/* Sections */}
        <Text style={styles.sectionTitle}>Ouverture caisse:</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Dépôt espèce:</Text>
          <Text style={styles.value}>0.00€</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Retrait espèce:</Text>
          <Text style={styles.value}>0.00€</Text>
        </View>

        {renderPaymentSection('Encaissement')}
        {renderPaymentSection('Avoir')}
        {renderPaymentSection('Rachat')}
        {renderPaymentSection('Total Caisse journalier')}
      </Page>
    </Document>
  );
}
