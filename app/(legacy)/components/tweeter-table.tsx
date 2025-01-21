import { Table, TableBody, TableCell, TableRow } from '../../../components/ui/table';
import { Tweeter_Specifications } from '../types';

function createData(
  specs: string,
  value2: string
) {
  return { specs, value2 };
}

export default function TweeterTable(spec: Tweeter_Specifications, styling: string) {
    const rows = [
        createData('Nominal Impedance', spec.nominal_impedance),
        createData('DC resistance, Re', spec.dc_resistance),
        createData('Voice coil diameter', spec.voice_coil_diameter),
        createData('Air gap height', spec.air_gap_height),
        createData('Sensitivity (2.83V/1m)', spec.sensitivity),
        createData('Magnetic flux density', spec.magnetic_flux_density),
        createData('Magnet weight', spec.magnet_weight),
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