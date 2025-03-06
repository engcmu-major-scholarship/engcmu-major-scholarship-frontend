import { Font, StyleSheet } from '@react-pdf/renderer';
import THSarabunNew from '../../assets/fonts/THSarabunNew.ttf';
import THSarabunNewBold from '../../assets/fonts/THSarabunNew_Bold.ttf';
import THSarabunNewItalic from '../../assets/fonts/THSarabunNew_Italic.ttf';
import THSarabunNewBoldItalic from '../../assets/fonts/THSarabunNew_BoldItalic.ttf';

Font.register({
  family: 'THSarabunNew',
  src: THSarabunNew,
});

Font.register({
  family: 'THSarabunNewBold',
  src: THSarabunNewBold,
});

Font.register({
  family: 'THSarabunNewItalic',
  src: THSarabunNewItalic,
});

Font.register({
  family: 'THSarabunNewBoldItalic',
  src: THSarabunNewBoldItalic,
});

export const pdfStyleSheet = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'THSarabunNew',
    fontSize: 16,
  },
  header: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
