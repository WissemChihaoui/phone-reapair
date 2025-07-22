import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fCurrency } from 'src/utils/format-number';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          fontSize: 9,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: '40px 40px 60px 40px',
        },
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        },
        logo: {
          width: 100,
          marginBottom: 10,
        },
        title: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
        },
        subtitle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 4,
          color: '#F48023',
        },
        text: {
          fontSize: 10,
          marginBottom: 2,
        },
        tableHeader: {
          flexDirection: 'row',
          backgroundColor: '#f0f0f0',
          padding: 6,
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
        },
        tableRow: {
          flexDirection: 'row',
          padding: 6,
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
        },
        colNum: { width: '5%', textAlign: 'center' },
        colProduit: { width: '30%' },
        colRef: { width: '15%' },
        colClient: { width: '25%' },
        colPrix: { width: '10%', textAlign: 'right' },
        colEtat: { width: '15%', textAlign: 'center' },
      }),
    []
  );

export default function RachatAllPDF({ rachats }) {
  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.container}>
          <View>
            <Text style={styles.subtitle}>demo reparateur</Text>
            <Image src="/logo/logo.png" style={styles.logo} />
            <Text style={styles.text}>Rue Général Delacroix - Bazin</Text>
            <Text style={styles.text}>97139 Les Abymes</Text>
            <Text style={styles.text}>Tél.: 0690751575</Text>
            <Text style={styles.text}>SIRET :</Text>
            <Text style={styles.text}>N°TVA Intracom :</Text>
          </View>
        </View>

        {/* Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.colNum}>N°</Text>
            <Text style={styles.colProduit}>Produit</Text>
            <Text style={styles.colRef}>Ref</Text>
            <Text style={styles.colClient}>Client</Text>
            <Text style={styles.colPrix}>Prix</Text>
            <Text style={styles.colEtat}>Etat</Text>
          </View>

          {rachats?.map((rachat, index) => (
            <View key={rachat.id || index} style={styles.tableRow}>
              <Text style={styles.colNum}>{index + 1}</Text>
              <Text style={styles.colProduit}>{rachat.product?.title || ''}</Text>
              <Text style={styles.colRef}>{rachat.reference || ''}</Text>
              <Text style={styles.colClient}>{rachat.client?.name || ''}</Text>
              <Text style={styles.colPrix}>{fCurrency(rachat.price || 0)}</Text>
              <Text style={styles.colEtat}>{rachat.state || ''}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
