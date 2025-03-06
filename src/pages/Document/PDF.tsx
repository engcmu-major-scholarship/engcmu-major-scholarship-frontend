import {
  Document as PDFDocument,
  Page,
  View,
  Text,
  Image,
} from '@react-pdf/renderer';
import { pdfStyleSheet } from './pdfStylesheet';
import garuda from '../../assets/garuda.png';
import { RecipientData } from '../Recipient/useRecipientController';
import { Degree } from '../../types/Degree';
import { DocumentData } from './useDocumentController';

const convertDateToThaiFormat = (date?: Date) => {
  if (!date) {
    return '';
  }
  const thaiMonths = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];
  const thaiYear = date.getFullYear() + 543;

  return `${date.getDate()} ${thaiMonths[date.getMonth()]} ${thaiYear}`;
};

const degreeString = (degree: Degree) => {
  switch (degree) {
    case Degree.BACHELOR:
      return 'ปริญญาตรี';
    case Degree.MASTER:
      return 'ปริญญาโท';
    case Degree.DOCTOR:
      return 'ปริญญาเอก';
    default:
      return '';
  }
};

const PDF = ({
  data,
  recipientDatas,
}: {
  data: DocumentData;
  recipientDatas: RecipientData[];
}) => {
  return (
    <PDFDocument>
      <Page size="A4" style={pdfStyleSheet.page}>
        <View style={pdfStyleSheet.header}>
          <View
            style={[
              pdfStyleSheet.headerContent,
              { justifyContent: 'flex-start' },
            ]}
          >
            <Image style={{ width: '60px' }} src={garuda} />
          </View>
          <View style={pdfStyleSheet.headerContent}>
            <Text>บันทึกข้อความ</Text>
          </View>
          <View style={pdfStyleSheet.headerContent}></View>
        </View>
        <View style={pdfStyleSheet.fieldRow}>
          <View style={pdfStyleSheet.field}>
            <Text style={{ fontWeight: 'bold' }}>ส่วนงาน</Text>
            <Text>{data.recordDepartment}</Text>
          </View>
          <View style={pdfStyleSheet.field}>
            <Text style={{ fontWeight: 'bold' }}>โทร</Text>
            <Text>{data.recordTel}</Text>
          </View>
        </View>
        <View style={pdfStyleSheet.fieldRow}>
          <View style={pdfStyleSheet.field}>
            <Text style={{ fontWeight: 'bold' }}>ที่</Text>
            <Text>อว 8393(14).8 / {data.recordDocNumber}</Text>
          </View>
          <View style={pdfStyleSheet.field}>
            <Text style={{ fontWeight: 'bold' }}>วันที่</Text>
            <Text>{convertDateToThaiFormat(data.recordDocDate)}</Text>
          </View>
        </View>
        <View style={pdfStyleSheet.field}>
          <Text style={{ fontWeight: 'bold' }}>เรื่อง</Text>
          <Text>{data.recordHeadings}</Text>
        </View>
        <View style={pdfStyleSheet.hr} />
        <View style={pdfStyleSheet.field}>
          <Text>เรียน</Text>
          <Text>{data.recordApprover}</Text>
        </View>
        <View>
          <Text>{data.recordContent}</Text>
        </View>
        <View style={pdfStyleSheet.row}>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>จึงเรียนมาเพื่อโปรดพิจารณาลงนาม</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </View>
        <View style={[pdfStyleSheet.row, { marginTop: 30 }]}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>({data.recordApproverName})</Text>
            <Text>{data.recordApproverPosition}</Text>
          </View>
        </View>
      </Page>
      <Page size="A4" style={pdfStyleSheet.page}>
        <View style={pdfStyleSheet.header}>
          <View style={pdfStyleSheet.headerContent}></View>
          <View style={pdfStyleSheet.headerContent}>
            <Image style={{ width: '60px' }} src={garuda} />
          </View>
          <View style={pdfStyleSheet.headerContent}></View>
        </View>
        <View>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {data.heading}
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={[pdfStyleSheet.hr, { width: '40%' }]} />
        </View>
        <View>
          <Text>{data.content}</Text>
        </View>
        <View style={pdfStyleSheet.table}>
          <View style={pdfStyleSheet.tableRow}>
            <View style={[pdfStyleSheet.tableCell, { flex: 1 }]}>
              <Text>ที่</Text>
            </View>
            <View style={[pdfStyleSheet.tableCell, { flex: 6 }]}>
              <Text>ชื่อ-สกุล</Text>
            </View>
            <View style={pdfStyleSheet.tableCell}>
              <Text>รหัสประจำตัว</Text>
            </View>
            <View style={pdfStyleSheet.tableCell}>
              <Text>ทุนละ</Text>
            </View>
            <View style={pdfStyleSheet.tableCell}>
              <Text>หลักสูตร</Text>
            </View>
          </View>
          {recipientDatas.map((recipient, index) => (
            <View style={pdfStyleSheet.tableRow} key={index}>
              <View style={[pdfStyleSheet.tableCell, { flex: 1 }]}>
                <Text>{index + 1}</Text>
              </View>
              <View style={[pdfStyleSheet.tableCell, { flex: 6 }]}>
                <Text>{`${recipient.firstName} ${recipient.lastName}`}</Text>
              </View>
              <View style={pdfStyleSheet.tableCell}>
                <Text>{recipient.studentId}</Text>
              </View>
              <View style={pdfStyleSheet.tableCell}>
                <Text>
                  {recipient.defaultAmount
                    ? recipient.defaultAmount
                    : recipient.requestAmount}
                  .-
                </Text>
              </View>
              <View style={pdfStyleSheet.tableCell}>
                <Text>{degreeString(recipient.degress)}</Text>
              </View>
            </View>
          ))}
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          <Text>ประกาศ ณ วันที่ {convertDateToThaiFormat(data.docDate)}</Text>
        </View>
        <View style={[pdfStyleSheet.row, { marginTop: 50 }]}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>({data.approverName})</Text>
            <Text>{data.approverPosition}</Text>
          </View>
        </View>
      </Page>
    </PDFDocument>
  );
};

export default PDF;
