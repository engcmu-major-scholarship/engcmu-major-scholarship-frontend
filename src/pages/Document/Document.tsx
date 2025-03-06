import {
  Document as PDFDocument,
  Page,
  View,
  Text,
  Image,
  PDFViewer,
} from '@react-pdf/renderer';
import useDocumentController from './useDocumentController';
import { pdfStyleSheet } from './pdfStylesheet';
import garuda from '../../assets/garuda.png';

const PDF = () => {
  return (
    <PDFDocument>
      <Page size="A4" style={pdfStyleSheet.page}>
        <View style={pdfStyleSheet.header}>
          <Image style={{ width: '60px' }} src={garuda} />
          <Text style={{ flexGrow: 1 }}>Section #1</Text>
          <Text style={{ flexGrow: 1 }}>Document #1</Text>
        </View>
      </Page>
    </PDFDocument>
  );
};

const Document = () => {
  useDocumentController();
  return (
    <div className="flex flex-col px-24 py-4 gap-4">
      <PDFViewer className="h-screen">
        <PDF />
      </PDFViewer>
    </div>
  );
};

export default Document;
