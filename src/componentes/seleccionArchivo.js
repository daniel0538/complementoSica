import React from "react";
import * as XLSX from "xlsx";
import Validar from './validacion'
import '../styles/estilos.css'
import TextField from '@material-ui/core/TextField';

class ExcelToJson extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: {},
      data: [],
    }
    this.handleFile = this.handleFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.setState({ file: files[0] });
  };


  handleFile() {
    const reader = new FileReader();
    const leerArchivo = !!reader.readAsBinaryString;
    const encabezadosTodos = []
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: leerArchivo ? 'binary' : 'array', bookVBA: true });
      for (let i = 0; i < wb.SheetNames.length; i++) {
        const wsname = wb.SheetNames[i];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
        this.setState({ data: data });
        encabezadosTodos.push(this.state.data[0])
      }
      Validar(this.props.name, this.state.file.name, encabezadosTodos)
    };

    if (leerArchivo) {
      reader.readAsBinaryString(this.state.file);
    } else {
      reader.readAsArrayBuffer(this.state.file);
    };
  }

  render() {
    return (
      <div>
        <TextField type="file"
          className="archivo"
          id="file"
          onChange={this.handleChange} 
          required/>
        <br/><br/>
        <input type='submit'
          className="enviar"
          value="Validar"
          onClick={this.handleFile} />
      </div>

    )
  }
}

export default ExcelToJson;