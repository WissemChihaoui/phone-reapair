import { useMemo } from 'react';
import { Page, View, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

// Register font
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
          lineHeight: 1.6,
          backgroundColor: '#fff',
          padding: '40px 24px 80px 24px',
        },
        header: {
          fontSize: 14,
          fontWeight: 'bold',
          marginBottom: 20,
          textAlign: 'center',
        },
        tableHeader: {
          flexDirection: 'row',
          backgroundColor: '#f0f0f0',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
          borderBottomStyle: 'solid',
          padding: 6,
          fontWeight: 'bold',
        },
        tableRow: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: '#e9ecef',
          borderBottomStyle: 'solid',
          padding: 6,
        },
        colName: { width: '25%' },
        colEmail: { width: '25%' },
        colPhone: { width: '20%' },
        colAddress: { width: '30%' },
      }),
    []
  );

// Component
export default function ClientsPDF({ clients }) {
  const styles = useStyles();

  // fallback: two sample clients if none provided
  const sampleClients = [
    {
      name: 'John Doe',
      company: "Société",
      email: 'john@example.com',
      phone: '0612345678',
      address: '123 Rue Lafayette, Paris',
    },
    {
      name: 'Jane Smith',
      company: "Société",
      email: 'jane@smithmail.com',
      phone: '0678123456',
      address: '45 Avenue de la République, Lyon',
    },
  ];

  const data = clients?.length ? clients : sampleClients;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Liste des Clients</Text>

        {/* Table Headers */}
        <View style={styles.tableHeader}>
          <Text style={styles.colName}>Nom</Text>
          <Text style={styles.colName}>Société</Text>
          <Text style={styles.colEmail}>Email</Text>
          <Text style={styles.colPhone}>Téléphone</Text>
          <Text style={styles.colAddress}>Adresse</Text>
        </View>

        {/* Table Rows */}
        {data.map((client, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.colName}>{client.name}</Text>
            <Text style={styles.colName}>{client.company}</Text>
            <Text style={styles.colEmail}>{client.email}</Text>
            <Text style={styles.colPhone}>{client.phone}</Text>
            <Text style={styles.colAddress}>{client.address}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
}
