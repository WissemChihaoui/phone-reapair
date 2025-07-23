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
        noBorder: { paddingTop: '10px', paddingBottom: 0, borderBottomWidth: 0 },
      }),
    []
  );

// ----------------------------------------------------------------------

export function InvoicePDF({ invoice, currentStatus }) {
  const {
    items,
    taxes,
    dueDate,
    discount,
    shipping,
    subtotal,
    invoiceTo,
    createDate,
    totalAmount,
    invoiceFrom,
    invoiceNumber,
  } = invoice;

  const styles = useStyles();

  const renderHeader = (
    <View style={[styles.container, styles.mb40]}>
      <View>
        <Image source="/logo/logo.png" style={{ width: 100 }} />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={[styles.h3, { textTransform: 'capitalize' }]}>Facture</Text>
        <Text>{invoiceNumber}</Text>
        <Text style={[styles.subtitle2, styles.mb4]}>Date</Text>
        <Text style={styles.body2}>{fDate(createDate)}</Text>
      </View>
    </View>
  );

  const renderFooter = (
    <View style={[styles.footer]} fixed>
      <Text style={styles.body2}>
        Je déclare avoir pris connaissance et accepté sans réserves les termes des Conditions
        Générales de Vente, Prestation et SAV ci-jointes et partie intégrante de la relation
        contractuelle.
      </Text>
    </View>
  );

  const renderInfo = (
    <View style={[styles.container, styles.mb40]}>
      <View style={{ width: '50%' }}>
        <Text style={[styles.subtitle2, styles.mb4]}>Entreprise</Text>
        <Text style={styles.body2}>{invoiceFrom?.name}</Text>
        <Text style={styles.body2}>{invoiceFrom?.fullAddress}</Text>
        <Text style={styles.body2}>Phone: {invoiceFrom?.phoneNumber}</Text>
      </View>

      <View style={{ width: '50%' }}>
        <Text style={[styles.subtitle2, styles.mb4]}>Informations Client</Text>
        <Text style={styles.body2}>{invoiceTo?.name}</Text>
        <Text style={styles.body2}>{invoiceTo?.fullAddress}</Text>
        <Text style={styles.body2}>Phone: {invoiceTo?.phoneNumber}</Text>
      </View>
    </View>
  );

  const renderTable = (
    <>
      <Text style={[styles.subtitle1, styles.mb8]}>Détails de la facture</Text>
      <View style={styles.table}>
        <View>
          <View style={styles.row}>
            <View style={styles.cell_1}>
              <Text style={styles.subtitle2}>#</Text>
            </View>
            <View style={styles.cell_2}>
              <Text style={styles.subtitle2}>Produit</Text>
            </View>
            <View style={styles.cell_3}>
              <Text style={styles.subtitle2}>Prix HT</Text>
            </View>
            <View style={styles.cell_4}>
              <Text style={styles.subtitle2}>QTE</Text>
            </View>
            <View style={styles.cell_4}>
              <Text style={styles.subtitle2}>TVA</Text>
            </View>
            <View style={[styles.cell_5, { textAlign: 'right' }]}>
              <Text style={styles.subtitle2}>Total TTC</Text>
            </View>
          </View>

          {items.map((item, index) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.cell_1}>
                <Text>{index + 1}</Text>
              </View>
              <View style={styles.cell_2}>
                <Text style={styles.subtitle2}>{item.title}</Text>
                <Text>{item.description}</Text>
              </View>
              <View style={styles.cell_3}>
                <Text>{fCurrency(item.price)}</Text>
              </View>
              <View style={styles.cell_4}>
                <Text>{item.quantity}</Text>
              </View>
              <View style={styles.cell_4}>
                <Text>{item.tva || '20%'}</Text>
              </View>
              <View style={[styles.cell_5, { textAlign: 'right' }]}>
                <Text>{fCurrency(item.price * item.quantity)}</Text>
              </View>
            </View>
          ))}
        </View>

        <View>
          {[
            { name: 'Total HT', value: subtotal },
            { name: 'Total TVA', value: taxes },
            { name: 'Frais de livraison', value: shipping },
            { name: 'Remise', value: discount },
            { name: 'Total TTC', value: totalAmount, styles: styles.h4 },
          ].map((item) => (
            <View key={item.name} style={[styles.row, styles.noBorder]}>
              <View style={styles.cell_1} />
              <View style={styles.cell_2} />
              <View style={styles.cell_3} />
              <View style={styles.cell_4}>
                <Text style={item.styles}>{item.name}</Text>
              </View>
              <View style={[styles.cell_5, { textAlign: 'right' }]}>
                <Text style={item.styles}>{fCurrency(item.value)}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {renderHeader}
        {renderInfo}
        {renderTable}
        {renderFooter}
      </Page>
    </Document>
  );
}
