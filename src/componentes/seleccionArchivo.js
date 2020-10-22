import React from "react";
import * as XLSX from "xlsx";
import Validar from './validacion';
import TextField from '@material-ui/core/TextField';
import '../styles/estilos.css'
import '../styles/styles.css'

class ExcelToJson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      file: {},
      data: [],
      separador:''
    }

    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    this.setState({ file: files[0] });
    this.setState({separador:'|'})
  };

  handleFile() {
    const reader = new FileReader();
    const lecturaDelArchivo = !!reader.readAsBinaryString;
    const encabezadosTodos = []
    try {
      reader.onload = (e) => {
        try {
          const archivo = e.target.result;
          const hojasArchivo = XLSX.read(archivo, { type: lecturaDelArchivo ? 'binary' : 'array', bookVBA: true });
          for (let i = 0; i < hojasArchivo.SheetNames.length; i++) {
            const hoja = hojasArchivo.SheetNames[i];
            const encabezadosPorHoja = hojasArchivo.Sheets[hoja];
            const data = XLSX.utils.sheet_to_json(encabezadosPorHoja, { header: 1 });
            this.setState({ data: data });
            encabezadosTodos.push(this.state.data[0])
          }
          Validar(this.props.modulo, this.state.file.name, encabezadosTodos)

            } catch (error) {
              this.setState({ error })
              alert('no se encontro ' + this.state.file.name + ' en el modulo ' + this.props.modulo)
          }
      };
          if (lecturaDelArchivo) {
            reader.readAsBinaryString(this.state.file);
          } else {
            reader.readAsArrayBuffer(this.state.file);
          };
      } catch (error) {
        this.setState({ error })
    }
  }

  render() {
    const page =
      <div><br />
        <TextField
          type="file"
          onChange={this.handleChange}
          required/><br/><br/>
        <input 
          type='submit'
          className="boton"
          value="Validar"
          onClick={this.handleFile}/>

        <p style={{ fontFamily:'Arial', color:'rgb(218, 214, 214)'}}>
          {this.props.modulo} {this.state.separador} {this.state.file.name}
        </p>
      </div>

    if (this.state.error) {
      return (page)
    }
      return (page)
  }
}

export default ExcelToJson;