import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// Register font
Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
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
          padding: '40px 24px 120px 24px',
        },
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        body2: { fontSize: 9 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        bold: { fontSize: 12, fontWeight: 'bold' },

        table: { display: 'flex', width: '100%' },
        row: {
          padding: '10px 0 8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e9ecef',
        },
        cell_num: { width: '10%' },
        cell_ref: { width: '12%' },
        cell_art: { width: '16%' },
        cell_ht: { width: '6%', textAlign: 'right' },
        cell_taux: { width: '6%', textAlign: 'right' },
        cell_tva: { width: '6%', textAlign: 'right' },
        cell_ttc: { width: '6%', textAlign: 'right' },
        cell_total: { width: '8%', textAlign: 'right' },
        cell_date: { width: '12%', textAlign: 'right' },
        noBorder: { paddingTop: '10px', paddingBottom: 0, borderBottomWidth: 0 },
      }),
    []
  );

// Main component
export function ExportFamillePDF({ invoice }) {
  const styles = useStyles();

  const renderGroupTable = (key, rows) => {
    const sum = (field) => rows.reduce((acc, row) => acc + (row[field] || 0), 0);

    const totalHT = sum('ht');
    const totalTVA = sum('tva');
    const totalTTC = sum('ttc');

    return (
      <>
        <Text style={[styles.subtitle1, { marginTop: 20, marginBottom: 6 }]}>comptable {key}</Text>

        {/* Table Header */}
        <View style={[styles.row, { backgroundColor: '#f0f0f0' }]}>
          <Text style={styles.cell_num}>N° Facture</Text>
          <Text style={styles.cell_ref}>Référence</Text>
          <Text style={styles.cell_art}>Articles</Text>
          <Text style={styles.cell_ht}>HT</Text>
          <Text style={styles.cell_taux}>TAUX</Text>
          <Text style={styles.cell_tva}>TVA</Text>
          <Text style={styles.cell_ttc}>TTC</Text>
          <Text style={styles.cell_total}>total TVA</Text>
          <Text style={styles.cell_total}>total HT</Text>
          <Text style={styles.cell_total}>total TTC</Text>
          <Text style={styles.cell_date}>Date</Text>
        </View>

        {/* Table Body */}
        {rows.map((item, idx) => (
          <View key={idx} style={styles.row}>
            <Text style={styles.cell_num}>{item.numero}</Text>
            <Text style={styles.cell_ref}>{item.reference}</Text>
            <Text style={styles.cell_art}>{item.articles}</Text>
            <Text style={styles.cell_ht}>{fCurrency(item.ht)}</Text>
            <Text style={styles.cell_taux}>{item.taux}</Text>
            <Text style={styles.cell_tva}>{fCurrency(item.tva)}</Text>
            <Text style={styles.cell_ttc}>{fCurrency(item.ttc)}</Text>
            <Text style={styles.cell_total}>{fCurrency(item.tva)}</Text>
            <Text style={styles.cell_total}>{fCurrency(item.ht)}</Text>
            <Text style={styles.cell_total}>{fCurrency(item.ttc)}</Text>
            <Text style={styles.cell_date}>
              {fDate(item.date)}{' '}
              {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
        ))}

        {/* Totals in 3x3 Grid */}
        <View style={{ marginTop: 12 }}>
          {[
            [
              { label: 'Total HT', val: totalHT },
              { label: 'Total TVA', val: totalTVA },
              { label: 'Total TTC', val: totalTTC },
            ],
            [
              { label: 'Total HT avoir', val: 0 },
              { label: 'Total TVA avoir', val: 0 },
              { label: 'Total TTC avoir', val: 0 },
            ],
            [
              { label: 'Total HT Facture', val: totalHT },
              { label: 'Total TVA Facture', val: totalTVA },
              { label: 'Total TTC Facture', val: totalTTC },
            ],
          ].map((line, lineIdx) => (
            <View key={lineIdx} style={{ flexDirection: 'row', marginBottom: 6 }}>
              {line.map((col, colIdx) => (
                <View
                  key={colIdx}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 8,
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>{col.label}</Text>
                  <Text>{fCurrency(col.val)}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={[styles.container, styles.mb40]}>
          <View>
            <Image source="/logo/logo.png" style={{ width: 100 }} />
            <Text style={[styles.subtitle2, styles.mb4]}>{invoice.invoiceFrom.name}</Text>
            <Text style={styles.body2}>{invoice.invoiceFrom.fullAddress}</Text>
            <Text style={styles.body2}>Tél.: {invoice.invoiceFrom.phoneNumber}</Text>
            <Text style={styles.body2}>SIRET :</Text>
            <Text style={styles.body2}>N°TVA Intracom :</Text>
          </View>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <Text style={styles.bold}>Export comptable famille</Text>
            <Text style={styles.body2}>
              de {fDate(invoice.period.start)} à {fDate(invoice.period.end)}
            </Text>
          </View>
        </View>

        {/* Render each group */}
        {Object.entries(invoice.grouped).map(([key, rows]) => renderGroupTable(key, rows))}
      </Page>
    </Document>
  );
}
