import { Page, View, Text, Font, Document, StyleSheet } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf' },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    fontFamily: 'Roboto',
    padding: 40,
    lineHeight: 1.6,
    backgroundColor: '#fff',
  },
  headerBox: {
    marginBottom: 20,
  },
  headerLine: {
    fontSize: 10,
    marginBottom: 2,
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
  },
  text: {
    marginBottom: 6,
  },
  bold: {
    fontWeight: 'bold',
  },
  rightAlignedBox: {
    marginTop: 12,
    alignItems: 'flex-end',
  },
  rightText: {
    textAlign: 'right',
    marginBottom: 4,
  },
  legalNote: {
    fontSize: 9,
    marginTop: 30,
    color: '#555',
  },
});

export default function CertificatPDF({ data }) {
  const {
    editeur = {
      name: 'Christophe FAUQUET',
      company: 'SARL REPFONE',
      product: 'SASGESTION V1.0.1',
      siret: '81211835400024',
      releaseDate: '01/03/2020',
      version: 'V1.0.1',
      location: 'Paris',
      date: '22-05-2022',
    },
    client = {
      name: 'Admin khaled',
      company: 'demo reparateur',
      license: 'S86DE',
      email: 'boutique@demo.com',
      startDate: '22-05-2022',
      endDate: '',
      location: 'Paris',
      date: '22-05-2022',
    },
  } = data || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.headerBox}>
          <Text style={styles.headerLine}>SARL REPFONE ( by SAS GESTION)</Text>
          <Text style={styles.headerLine}>57 Rue des Moines, 75017 Paris</Text>
          <Text style={styles.headerLine}>contact@sasgestion.com</Text>
          <Text style={styles.headerLine}>SIRET (siège) - {editeur.siret}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Attestation individuelle</Text>
        <Text style={styles.text}>
          Relative à l&apos;utilisation d&apos;un logiciel de gestion commercial satisfaisant les conditions
          d&apos;inaltérabilité, de sécurisation, de conservation et d&apos;archivage des données (CGI, art. 286, I-3° bis)
        </Text>

        {/* Volet 1 */}
        <Text style={styles.sectionTitle}>Volet 1</Text>
        <Text style={styles.text}>
          Je soussigné, <Text style={styles.bold}>{editeur.name}</Text>, représentant légal de la société{' '}
          <Text style={styles.bold}>{editeur.company}</Text>, éditeur du logiciel de gestion de point de vente{' '}
          <Text style={styles.bold}>{editeur.product}</Text>, atteste que ce logiciel, mis sur le marché à compter du{' '}
          {editeur.releaseDate}, dans sa version n° {editeur.version}, satisfait aux conditions d&apos;inaltérabilité, de
          sécurisation, de conservation et d&apos;archivage des données en vue du contrôle de l&apos;administration fiscale,
          prévues au 3° bis du I de l&apos;article 286 du code général des impôts.
        </Text>
        <Text style={styles.text}>
          J&apos;atteste que la dernière version majeure de ce logiciel SaaS est identifiée avec la racine suivante :{' '}
          {editeur.version}. Je m&apos;engage à ce que ces subdivisions ne soient utilisées par {editeur.company} que pour
          l&apos;identification des versions mineures ultérieures, à l&apos;exclusion de toute version majeure. Les versions
          majeures et mineures du logiciel ou système s&apos;entendent au sens du : I-C-1 § 340 du BOI-TVA-DECLA-30-10-30.
        </Text>

      

        {/* Volet 2 */}
        <Text style={styles.sectionTitle}>Volet 2</Text>
        <Text style={styles.text}>
          Je soussigné, <Text style={styles.bold}>{client.name}</Text>, représentant légal de la société{' '}
          <Text style={styles.bold}>{client.company}</Text>, certifie avoir acquis le {client.date}, auprès de{' '}
          {editeur.company} (www.sasgestion.com) du distributeur, le logiciel de gestion commercial mentionné au
          volet 1 de cette attestation.
        </Text>
        <Text style={styles.text}>
          J&apos;atteste utiliser ce logiciel de gestion commercial pour enregistrer les règlements de mes clients depuis
          le {client.startDate}
        </Text>
        <Text style={styles.text}>Licence N° : {client.license}</Text>
        <Text style={styles.text}>Email pour l&apos;envoi de : {client.email}</Text>
        <Text style={styles.text}>Date de début : {client.startDate}</Text>
        <Text style={styles.text}>Date de fin : {client.endDate || '...'}</Text>

        <View style={styles.rightAlignedBox}>
          <Text style={styles.rightText}>Fait à {client.location}, le {client.date}</Text>
          <Text style={[styles.rightText, styles.bold]}>
            Signature du représentant légal :
          </Text>
        </View>

        {/* Legal note */}
        <Text style={styles.legalNote}>
          Il est rappelé que l’établissement d’une fausse attestation est un délit pénal passible de 3 ans
          d’emprisonnement et de 45 000 € d’amende (Code pénal, art. 441-1). L&apos;usage d&apos;une fausse attestation est
          passible des mêmes peines.
        </Text>
      </Page>
    </Document>
  );
}
