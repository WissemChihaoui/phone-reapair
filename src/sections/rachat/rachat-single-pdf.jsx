import { useMemo } from 'react';
import { Page, View, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate } from 'src/utils/format-time';
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
        },
        text: {
          fontSize: 10,
          marginBottom: 2,
        },
        headerRow: {
          flexDirection: 'row',
          backgroundColor: '#F48023',
          color: '#fff',
          paddingVertical: 6,
          paddingHorizontal: 10,
        },
        dataRow: {
          flexDirection: 'row',
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
        },
        tableHeader: {
          flexDirection: 'row',
          backgroundColor: '#F48023',
          color: '#fff',
          padding: 6,
        },
        tableRow: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
          padding: 6,
        },
        colProduit: { width: '30%' },
        colAccessoire: { width: '20%' },
        colSerie: { width: '20%' },
        colEtat: { width: '15%', textAlign: 'center' },
        colPrix: { width: '15%', textAlign: 'right' },
        footer: {
          marginTop: 40,
        },
        signature: {
          marginTop: 60,
        },
      }),
    []
  );

export default function RachatSinglePDF({ rachat }) {
  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>RACHAT</Text>

        {/* Repairer and Client Info */}
        <View style={styles.container}>
          <View>
            <Text style={styles.subtitle}>demo reparateur</Text>
            <Text style={styles.text}>Rue Général Delacroix - Bazin</Text>
            <Text style={styles.text}>97139 Les Abymes</Text>
            <Text style={styles.text}>Tél.: 0690751575</Text>
            <Text style={styles.text}>SIRET :</Text>
            <Text style={styles.text}>N°TVA Intracom :</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Client</Text>
            <Text style={styles.text}>{rachat.client?.name || ''}</Text>
            <Text style={styles.text}>{rachat.client?.address || ''}</Text>
            <Text style={styles.text}>{rachat.client?.city || ''}</Text>
            <Text style={styles.text}>Tel : {rachat.client?.phone || ''}</Text>
            <Text style={styles.text}>CIN : {rachat.client?.cin || ''}</Text>
          </View>
        </View>

        {/* Rachat Number and Date */}
        <View style={{ marginBottom: 20 }}>
          <View style={styles.headerRow}>
            <Text style={{ width: '50%', fontWeight: 'bold' }}>RACHAT</Text>
            <Text style={{ width: '50%', fontWeight: 'bold' }}>Date</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={{ width: '50%', fontWeight: 'bold' }}>{rachat.invoiceNumber}</Text>
            <Text style={{ width: '50%', fontWeight: 'bold' }}>
              {fDate(rachat.date, 'dd/MM/yyyy HH:mm')}
            </Text>
          </View>
        </View>

        {/* Product Table */}
        <View>
          <View style={styles.tableHeader}>
            <Text style={styles.colProduit}>PRODUIT</Text>
            <Text style={styles.colAccessoire}>ACCESSOIRE</Text>
            <Text style={styles.colSerie}>N° serie</Text>
            <Text style={styles.colEtat}>Etat</Text>
            <Text style={styles.colPrix}>Prix rachat</Text>
          </View>

          <View style={styles.tableRow}>
            <Text style={styles.colProduit}>{rachat.product?.title || ''}</Text>
            <Text style={styles.colAccessoire}>{rachat.accessory || ''}</Text>
            <Text style={styles.colSerie}>{rachat.serialNumber || ''}</Text>
            <Text style={styles.colEtat}>{rachat.state || ''}</Text>
            <Text style={styles.colPrix}>{fCurrency(rachat.price || 0)}</Text>
          </View>
        </View>

        {/* Payment and Signature */}
        <View style={styles.footer}>
          <Text style={styles.text}>
            Règlement Espèce le {fDate(rachat.date, 'dd/MM/yyyy HH:mm')}
          </Text>
          <Text style={styles.signature}>Signature</Text>
        </View>
      </Page>
    </Document>
  );
}
