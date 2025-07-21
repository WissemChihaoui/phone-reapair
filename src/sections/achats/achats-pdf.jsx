import { useMemo } from 'react';
import { Page, View, Text, Font, Image, Document, StyleSheet } from '@react-pdf/renderer';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [{ src: '/fonts/Roboto-Regular.ttf' }, { src: '/fonts/Roboto-Bold.ttf' }],
});

const useStyles = () =>
  useMemo(
    () =>
      StyleSheet.create({
        // layout
        page: {
          fontSize: 9,
          lineHeight: 1.6,
          fontFamily: 'Roboto',
          backgroundColor: '#FFFFFF',
          padding: '40px 24px 120px 24px',
        },
        footer: {
          left: 0,
          right: 0,
          bottom: 0,
          padding: 24,
          margin: 'auto',
          borderTopWidth: 1,
          borderStyle: 'solid',
          position: 'absolute',
          borderColor: '#e9ecef',
        },
        container: {
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        // margin
        mb4: { marginBottom: 4 },
        mb8: { marginBottom: 8 },
        mb40: { marginBottom: 40 },
        // text
        h3: { fontSize: 16, fontWeight: 700 },
        h4: { fontSize: 13, fontWeight: 700 },
        body1: { fontSize: 10 },
        subtitle1: { fontSize: 10, fontWeight: 700 },
        body2: { fontSize: 9 },
        subtitle2: { fontSize: 9, fontWeight: 700 },
        // table
        table: { display: 'flex', width: '100%' },
        row: {
          padding: '10px 0 8px 0',
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderStyle: 'solid',
          borderColor: '#e9ecef',
        },
        cell_1: { width: '5%' },
        cell_2: { width: '50%' },
        cell_3: { width: '15%', paddingLeft: 32 },
        cell_4: { width: '15%', paddingLeft: 8 },
        cell_5: { width: '15%' },
        cell_org: { width: '20%' },
        cell_num: { width: '25%' },
        cell_ht: { width: '15%', textAlign: 'right' },
        cell_ttc: { width: '15%', textAlign: 'right' },
        cell_date: { width: '25%', textAlign: 'right' },
        noBorder: { paddingTop: '10px', paddingBottom: 0, borderBottomWidth: 0 },
      }),
    []
  );

// ----------------------------------------------------------------------

export function AchatsPDF({ invoice }) {
  const styles = useStyles();

  const totalHT = invoice.items.reduce((sum, item) => sum + item.priceHT, 0);
  const totalTTC = invoice.items.reduce((sum, item) => sum + item.totalTTC, 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={[styles.container, styles.mb40]}>
          <View >
            <Image source="/logo/logo.png" style={{ width: "100%" }} />
            <Text style={[styles.subtitle2, styles.mb4]}>{invoice.invoiceFrom.name}</Text>
            <Text style={styles.body2}>{invoice.invoiceFrom.fullAddress}</Text>
            <Text style={styles.body2}>Tél.: {invoice.invoiceFrom.phoneNumber}</Text>
            <Text style={styles.body2}>SIRET :</Text>
            <Text style={styles.body2}>N°TVA Intracom :</Text>
          </View>
          <View style={{ width: '40%', alignItems: 'flex-end' }}>
            <Text style={styles.body2}>
              Dépense du periode {fDate(invoice.period.start)} à {fDate(invoice.period.end)}
            </Text>
          </View>
        </View>

        {/* TABLE HEADER */}
        <View style={[styles.row, { backgroundColor: '#f0f0f0' }]}>
          <Text style={[styles.cell_org, styles.subtitle2]}>Organisme</Text>
          <Text style={[styles.cell_num, styles.subtitle2]}>N° Facture</Text>
          <Text style={[styles.cell_ht, styles.subtitle2]}>Prix HT</Text>
          <Text style={[styles.cell_ttc, styles.subtitle2]}>Total TTC</Text>
          <Text style={[styles.cell_date, styles.subtitle2]}>Date</Text>
        </View>

        {/* TABLE ROWS */}
        {invoice.items.map((item, index) => (
          <View
            key={item.id}
            style={[styles.row, { backgroundColor: index % 2 === 1 ? '#e0e0e0' : 'transparent' }]}
          >
            <Text style={styles.cell_org}>{item.organisme}</Text>
            <Text style={styles.cell_num}>{item.numero}</Text>
            <Text style={styles.cell_ht}>{fCurrency(item.priceHT)}</Text>
            <Text style={styles.cell_ttc}>{fCurrency(item.totalTTC)}</Text>
            <Text style={styles.cell_date}>{fDate(item.date)} 02:00</Text>
          </View>
        ))}

        {/* TOTAL ROW */}
        <View style={[styles.row, { marginTop: 8 }]}>
          <Text style={styles.cell_org} />
          <Text style={styles.cell_num} />
          <Text style={[styles.cell_ht, styles.subtitle2]}>Total HT</Text>
          <Text style={[styles.cell_ttc, styles.subtitle2]}>{fCurrency(totalHT)}</Text>
          <Text style={styles.cell_date} />
        </View>

        <View style={styles.row}>
          <Text style={styles.cell_org} />
          <Text style={styles.cell_num} />
          <Text style={[styles.cell_ht, styles.subtitle2]}>Total TTC</Text>
          <Text style={[styles.cell_ttc, styles.subtitle2]}>{fCurrency(totalTTC)}</Text>
          <Text style={styles.cell_date} />
        </View>
      </Page>
    </Document>
  );
}
