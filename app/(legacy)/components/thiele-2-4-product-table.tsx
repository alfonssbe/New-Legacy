import { Table, TableBody, TableCell, TableRow } from '../../../components/ui/table';
import { Thiele_Small_Parameters_Specifications } from '../types';

function createData(
  specs: string,
  value2: string,
  value4: String
) {
  return { specs, value2, value4 };
}

export default function Thiele24ProductTable(spec2: Thiele_Small_Parameters_Specifications, spec4: Thiele_Small_Parameters_Specifications, styling: string) {
    const rows = [
        createData('Parameter “Thiele-Small” :', '2 Ω', '4 Ω'),
        createData('Fs (Hz)', spec2.fs.concat(' Hz'), spec4.fs.concat(' Hz')),
        createData('DCR (Ω)', spec2.dcr.concat(' Ω'), spec4.dcr.concat(' Ω')),
        createData('Qts', spec2.qts, spec4.qts),
        createData('Qes', spec2.qes, spec4.qes),
        createData('Qms', spec2.qms, spec4.qms),
        createData('Mms (g)', spec2.mms.concat(' g'), spec4.fs.concat(' g')),
        createData('Cms (mm/N)', spec2.cms.concat(' mm/N'), spec4.cms.concat(' mm/N')),
        createData('BL Product (Tm)', spec2.bl_product.concat(' Tm'), spec4.bl_product.concat(' Tm')),
        createData('Vas (liters)', spec2.vas.concat(' liters'), spec4.vas.concat(' liters')),
        createData('No (%)', spec2.no.concat('%'), spec4.no.concat('%')),
        createData('Sd (cm2)', spec2.sd.concat(' cm2'), spec4.sd.concat(' cm2')),
        createData('Xmax (mm)', spec2.xmax.concat(' mm'), spec4.xmax.concat(' mm')),
      ];
  return (
    <>
      <Table>
        <TableBody className='border'>
            {rows.map((row, index) => (
            <TableRow key={index} className={`${index===0? 'font-bold': ''}`}>
              <TableCell className={`${styling} border p-2`}>{row.specs}</TableCell>
              <TableCell className={`${styling} border p-2`}>{row.value2 ? row.value2: '-'}</TableCell>
              <TableCell className={`${styling} border p-2`}>{row.value4 ? row.value4: '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}