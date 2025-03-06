import { Font, StyleSheet } from '@react-pdf/renderer';
import THSarabunNew from '../../assets/fonts/THSarabunNew.ttf';
import THSarabunNewBold from '../../assets/fonts/THSarabunNew_Bold.ttf';
import THSarabunNewItalic from '../../assets/fonts/THSarabunNew_Italic.ttf';
import THSarabunNewBoldItalic from '../../assets/fonts/THSarabunNew_BoldItalic.ttf';

Font.register({
  family: 'THSarabunNew',
  fonts: [
    { src: THSarabunNew },
    { src: THSarabunNewBold, fontWeight: 'bold' },
    { src: THSarabunNewItalic, fontStyle: 'italic' },
    { src: THSarabunNewBoldItalic, fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

export const pdfStyleSheet = StyleSheet.create({
  page: {
    flexDirection: 'column',
    paddingHorizontal: 48,
    paddingVertical: 24,
    fontFamily: 'THSarabunNew',
    fontSize: 16,
    gap: 10,
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    fontSize: 24,
  },
  headerContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fieldRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  table: {
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  tableRow: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
  },
  tableCell: {
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    flex: 4,
    padding: 2,
    alignItems: 'center',
  },
});
