import React, { Component } from 'react'
import ExcelToJson from './seleccionArchivo'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import '../styles/estilos.css'
import '../styles/styles.css'


class Modulo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.definirValue = this.definirValue.bind(this);
  }

  definirValue(event) {
    this.setState({ value: event.target.value })
  }

  render() {
    const page =
      <div className='imagen'>
        <img alt='Logo comsistelco' className='imagen2' src='https://www.comsistelco.com/assets/images/logo_web.png' />
        {/*style={{ width: '400px' }}*/}
        <h1 className='titulo'>Valide el archivo</h1>
        <div className='contenedor-formulario'>
          <form>
            <InputLabel style={{ color: 'white' }} id="demo-controlled-open-select-label">Seleccione un modulo</InputLabel>
            <Select labelId="demo-controlled-open-select-label"
              style={{ width: '300px' }}
              value={this.state.value}
              onChange={this.definirValue}
              className='selec' required>
              <MenuItem value='Analisis'>Analisis </MenuItem>
              <MenuItem value='Balance macromedicion'> Balance macromedicion</MenuItem>
              <MenuItem value='Hallazgos'> Hallazgos</MenuItem>
              <MenuItem value='Informativas'>Informativas </MenuItem>
              <MenuItem value='Liquidacion'>Liquidacion </MenuItem>
              <MenuItem value='Novedades'>Novedades </MenuItem>
              <MenuItem value='Storia'> Storia</MenuItem>
            </Select><br />
            <ExcelToJson modulo={this.state.value} />
          </form>
        </div>
      </div>;
    return (page)
  }
}

export default Modulo