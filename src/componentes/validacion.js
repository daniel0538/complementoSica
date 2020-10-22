import { headers } from './encabezados'
function Validar(nombreModulo, nombreActividad, encabezadosTodos) {

    const encabezadosPredeterminados = []
    let validacionEncabezados = false;

    encabezadosPredeterminados.push(...headers[nombreModulo][nombreActividad])

    for (let i = 0; i < encabezadosTodos.length && encabezadosPredeterminados.length; i++) {
        let celdasActuales = encabezadosTodos[i], celdasPredeterminadas = encabezadosPredeterminados[i];
        if (celdasActuales.length === celdasPredeterminadas.length) {
            for (let j = 0; j < celdasActuales.length; j++) {
                for (let k = 0; k < celdasPredeterminadas.length; k++) {
                    if (celdasActuales[j] !== celdasPredeterminadas[k]) {
                        break
                    } else {
                        validacionEncabezados = true
                        break
                    }
                }
                if (validacionEncabezados === false) {
                    break
                }
            }
        } else {
            break
        }
    };
    if (validacionEncabezados === true) {
        alert(`--Es valido--`)
    } else {
        alert(`No es valido: las celdas no coinciden`)
    }
};
export default Validar