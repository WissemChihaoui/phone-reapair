import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// Register fonts
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
          fontSize: 9,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: '40px 24px 80px 24px',
          lineHeight: 1.6,
        },
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb16: { marginBottom: 16 },
        mb32: { marginBottom: 32 },
        bold: { fontSize: 12, fontWeight: 'bold' },
        subtitle2: { fontSize: 9, fontWeight: 'bold' },
        body2: { fontSize: 9 },
        tableHeader: {
          flexDirection: 'row',
          backgroundColor: '#f0f0f0',
          padding: '6px 0',
          fontWeight: 'bold',
        },
        tableRow: {
          flexDirection: 'row',
          padding: '4px 0',
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
          borderBottomStyle: 'solid',
        },
        cell: { padding: '0 4px' },
        colProduit: { width: '30%' },
        colSerial: { width: '20%' },
        colHT: { width: '15%', textAlign: 'right' },
        colQte: { width: '10%', textAlign: 'center' },
        colTVA: { width: '10%', textAlign: 'right' },
        colTTC: { width: '15%', textAlign: 'right' },
        totalRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingTop: 6,
        },
        totalLabel: {
          width: '50%',
          textAlign: 'right',
          fontWeight: 'bold',
        },
        totalValue: {
          width: '20%',
          textAlign: 'right',
        },
        footer: {
          marginTop: 24,
          fontSize: 8,
          color: '#333',
        },
      }),
    []
  );

// Component
export default function FacturePDF({ facture }) {
  const styles = useStyles();

  const { client, date, invoiceNumber, product, serialNumber, priceHT, tva, priceTTC, paymentMethod } = facture;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.container, styles.mb32]}>
          <View>
            <Image src="/logo/logo.png" style={{ width: 100, marginBottom: 8 }} />
            <Text style={styles.subtitle2}>demo reparateur</Text>
            <Text style={styles.body2}>Rue Général Delacroix - Bazin</Text>
            <Text style={styles.body2}>97139 Les Abymes</Text>
            <Text style={styles.body2}>Tél.: 0690751575</Text>
            <Text style={styles.body2}>SIRET :</Text>
            <Text style={styles.body2}>N°TVA Intracom :</Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.bold}>FACTURE</Text>
            <Text style={styles.body2}>Facture N° {invoiceNumber}</Text>
            <Text style={styles.body2}>{fDateTime(date)}</Text>
          </View>
        </View>

        {/* Client */}
        <View style={[styles.mb16]}>
          <Text style={styles.subtitle2}>Client</Text>
          <Text style={styles.body2}>{client.name}</Text>
          <Text style={styles.body2}>Tel: {client.phone}</Text>
          <Text style={styles.body2}>Ref: {client.ref}</Text>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.colProduit]}>PRODUIT</Text>
          <Text style={[styles.cell, styles.colSerial]}>IMEI / N° série</Text>
          <Text style={[styles.cell, styles.colHT]}>PRIX HT</Text>
          <Text style={[styles.cell, styles.colQte]}>QTE</Text>
          <Text style={[styles.cell, styles.colTVA]}>TVA</Text>
          <Text style={[styles.cell, styles.colTTC]}>TOTAL TTC</Text>
        </View>

        {/* Table Row */}
        <View style={styles.tableRow}>
          <Text style={[styles.cell, styles.colProduit]}>{product}</Text>
          <Text style={[styles.cell, styles.colSerial]}>{serialNumber}</Text>
          <Text style={[styles.cell, styles.colHT]}>{fCurrency(priceHT)}</Text>
          <Text style={[styles.cell, styles.colQte]}>1</Text>
          <Text style={[styles.cell, styles.colTVA]}>{tva}%</Text>
          <Text style={[styles.cell, styles.colTTC]}>{fCurrency(priceTTC)}</Text>
        </View>

        {/* Totals */}
        <View style={{ marginTop: 16 }}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total HT</Text>
            <Text style={styles.totalValue}>{fCurrency(priceHT)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TVA</Text>
            <Text style={styles.totalValue}>{fCurrency((priceTTC - priceHT).toFixed(2))}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC</Text>
            <Text style={styles.totalValue}>{fCurrency(priceTTC)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Règlement {paymentMethod} le {fDateTime(date)}
            </Text>
            <Text style={styles.totalValue}>{fCurrency(priceTTC)}</Text>
          </View>
        </View>

        {/* Footer Note */}
        <View style={styles.footer}>
          <Text>
            Nos Conditions Générales de Vente et de SAV doivent impérativement être datées et signées. La signature vaut acceptation sans conditions de celles-ci.
          </Text>
          <Text style={{ marginTop: 4 }}>
            Les pénalités applicables en cas de retard de paiement (taux des pénalités de retard et indemnité forfaitaire de 40 €)
          </Text>
        </View>
      </Page>
    </Document>
  );
}
