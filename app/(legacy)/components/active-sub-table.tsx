import { Table, TableBody, TableCell, TableRow } from '../../../components/ui/table';
import { Active_Subwoofer_Specifications } from '../types';

function createData(
  specs: string,
  value2: string
) {
  return { specs, value2 };
}

export default function ActiveSubwooferTable(spec: Active_Subwoofer_Specifications, styling: string) {
    const rows = [
        createData('Speaker ', spec.speaker),
        createData('subwoofer  ', spec.subwoofer),
        createData('Daya amplifier ', spec.daya_amplifier),
        createData('Filter LPF variabel ', spec.filter_lpf_variabel),
        createData('Input level ', spec.input_level),
        createData('Power input ', spec.power_input),
        createData('Box type ', spec.box_type),
      ];
  return (
    <>
      <Table>
        <TableBody className='border'>
            {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell className={`${styling} border p-2`}>{row.specs}</TableCell>
              <TableCell className={`${styling} border p-2`}>{row.value2 ? row.value2: '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}