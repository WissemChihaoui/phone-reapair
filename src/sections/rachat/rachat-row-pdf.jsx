import { useMemo } from 'react';
import { Page, View, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// Font registration
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});

// Styles
const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        page: {
          fontSize: 10,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: 40,
          lineHeight: 1.6,
        },
        header: {
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 24,
        },
        section: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        },
        block: {
          width: '48%',
        },
        label: {
          fontWeight: 'bold',
          marginBottom: 4,
        },
        text: {
          marginBottom: 2,
        },
        rachatDetails: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#f0f0f0',
          padding: 6,
          marginBottom: 8,
        },
        tableHeader: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
          borderBottomStyle: 'solid',
          paddingBottom: 4,
          marginBottom: 4,
        },
        tableRow: {
          flexDirection: 'row',
          paddingVertical: 4,
        },
        colProduit: { width: '25%' },
        colAccessoire: { width: '25%' },
        colSerie: { width: '25%' },
        colEtat: { width: '15%' },
        colPrix: { width: '10%', textAlign: 'right' },
        footer: {
          marginTop: 24,
        },
        signature: {
          textAlign: 'right',
          marginTop: 40,
        },
      }),
    []
  );

// Component
export default function RachatPDF({ data }) {
  const styles = useStyles();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>RACHAT</Text>

        {/* Header info */}
        <View style={styles.section}>
          <View style={styles.block}>
            <Text style={styles.label}>SARL REPFONE (by SAS GESTION)</Text>
            <Text style={styles.text}>57 Rue des Moines, 75017 Paris</Text>
            <Text style={styles.text}>contact@sasgestion.com</Text>
            <Text style={styles.text}>SIRET (siège): 81211835400024</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Client</Text>
            <Text style={styles.text}>{data?.client?.name}</Text>
            <Text style={styles.text}>{data?.client?.address}</Text>
            <Text style={styles.text}>{data?.client?.city}</Text>
            <Text style={styles.text}>Tel: {data?.client?.phone}</Text>
            <Text style={styles.text}>CIN: {data?.client?.cin || ''}</Text>
          </View>
        </View>

        {/* Rachat number + date */}
        <View style={styles.rachatDetails}>
          <Text>RACHAT: {data?.invoiceNumber}</Text>
          <Text>Date: {fDateTime(data?.date)}</Text>
        </View>

        {/* Table */}
        <View style={styles.tableHeader}>
          <Text style={styles.colProduit}>Produit</Text>
          <Text style={styles.colAccessoire}>Accessoire</Text>
          <Text style={styles.colSerie}>N° Série</Text>
          <Text style={styles.colEtat}>État</Text>
          <Text style={styles.colPrix}>Prix</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.colProduit}>{data?.product?.title}</Text>
          <Text style={styles.colAccessoire}>{data?.accessory || '-'}</Text>
          <Text style={styles.colSerie}>{data?.serialNumber || '-'}</Text>
          <Text style={styles.colEtat}>{data?.state}</Text>
          <Text style={styles.colPrix}>{fCurrency(data?.price)}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Règlement Espèce le {fDateTime(data?.date)}</Text>
          <Text style={styles.signature}>Signature</Text>
        </View>
      </Page>
    </Document>
  );
}
