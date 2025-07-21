import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDateTime } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// Font setup
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
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: '40px 24px 80px 24px',
        },
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        subtitle2: { fontSize: 9, fontWeight: 'bold' },
        body2: { fontSize: 9 },
        table: { display: 'flex', width: '100%', marginTop: 8 },
        row: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e9ecef',
          padding: '4px 0',
        },
        headerRow: {
          flexDirection: 'row',
          backgroundColor: '#f0f0f0',
          padding: '6px 0',
          fontWeight: 'bold',
        },
        cell: { padding: '0 4px' },
        col_num: { width: '12%' },
        col_pay: { width: '13%' },
        col_ht: { width: '10%', textAlign: 'right' },
        col_tva: { width: '8%', textAlign: 'right' },
        col_total_tva: { width: '10%', textAlign: 'right' },
        col_ttc: { width: '10%', textAlign: 'right' },
        col_marge: { width: '10%', textAlign: 'right' },
        col_date: { width: '17%', textAlign: 'right' },
        totalRow: {
          flexDirection: 'row',
          paddingTop: 6,
        },
        totalLabel: {
          width: '25%',
          fontWeight: 'bold',
        },
        totalValue: {
          width: '12%',
          textAlign: 'right',
        },
      }),
    []
  );

// Component
export function ExportMargePDF({ invoice }) {
  const styles = useStyles();

  const totalHT = invoice.items.reduce((sum, item) => sum + item.priceHT, 0);
  const totalTVA = invoice.items.reduce((sum, item) => sum + item.totalTVA, 0);
  const totalTTC = invoice.items.reduce((sum, item) => sum + item.totalTTC, 0);
  const totalMarge = invoice.items.reduce((sum, item) => sum + item.marge, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.container, styles.mb40]}>
          <View>
            <Image src="/logo/logo.png" style={{ width: 100 }} />
            <Text style={styles.subtitle2}>{invoice.invoiceFrom.name}</Text>
            <Text style={styles.body2}>{invoice.invoiceFrom.fullAddress}</Text>
            <Text style={styles.body2}>Tél.: {invoice.invoiceFrom.phoneNumber}</Text>
            <Text style={styles.body2}>SIRET :</Text>
            <Text style={styles.body2}>N°TVA Intracom :</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.body2}>
              Export comptable Marge de {fDateTime(invoice.period.start)} à {fDateTime(invoice.period.end)}
            </Text>
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.headerRow}>
          <Text style={[styles.cell, styles.col_num]}>N° Facture</Text>
          <Text style={[styles.cell, styles.col_pay]}>Paiement</Text>
          <Text style={[styles.cell, styles.col_ht]}>Prix HT</Text>
          <Text style={[styles.cell, styles.col_tva]}>Taux de TVA</Text>
          <Text style={[styles.cell, styles.col_total_tva]}>Total TVA</Text>
          <Text style={[styles.cell, styles.col_ttc]}>Total TTC</Text>
          <Text style={[styles.cell, styles.col_marge]}>Marge</Text>
          <Text style={[styles.cell, styles.col_date]}>Date</Text>
        </View>

        {/* Table Rows */}
        {invoice.items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={[styles.cell, styles.col_num]}>{item.numero}</Text>
            <Text style={[styles.cell, styles.col_pay]}>
              {item.paiements?.map((p) => `${fCurrency(p.amount)} -> ${p.method}`).join('\n')}
            </Text>
            <Text style={[styles.cell, styles.col_ht]}>{fCurrency(item.priceHT)}</Text>
            <Text style={[styles.cell, styles.col_tva]}>{item.tauxTVA}%</Text>
            <Text style={[styles.cell, styles.col_total_tva]}>{fCurrency(item.totalTVA)}</Text>
            <Text style={[styles.cell, styles.col_ttc]}>{fCurrency(item.totalTTC)}</Text>
            <Text style={[styles.cell, styles.col_marge]}>{fCurrency(item.marge)}</Text>
            <Text style={[styles.cell, styles.col_date]}>{fDateTime(item.date)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={[styles.totalRow, { marginTop: 12 }]}>
          <Text style={styles.totalLabel}>Total HT</Text>
          <Text style={styles.totalValue}>{fCurrency(totalHT)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total TVA</Text>
          <Text style={styles.totalValue}>{fCurrency(totalTVA)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total TTC</Text>
          <Text style={styles.totalValue}>{fCurrency(totalTTC)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Marge</Text>
          <Text style={styles.totalValue}>{fCurrency(totalMarge)}</Text>
        </View>
      </Page>
    </Document>
  );
}
