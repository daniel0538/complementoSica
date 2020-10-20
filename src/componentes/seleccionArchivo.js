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

    try {
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
        Validar(this.props.modulo, this.state.file.name, encabezadosTodos)
      
      }; if (leerArchivo) {
        reader.readAsBinaryString(this.state.file);
      } else {
        reader.readAsArrayBuffer(this.state.file);
      };
    }catch (error) {
      this.setState({ error })
    }
     
     
  }

  render() {
    const page =
    <div><br/>
          <TextField
            // style={{color:'white'}}className='entrada'
            className='archivo'
            type="file"
            onChange={this.handleChange}
            required
          />
          <br/><br/>
          <input type='submit'
            className="boton"
            value="Validar"
            onClick={this.handleFile}
          />
      </div>

    if (this.state.error) {
      return (page)
    }
      return (page)
  }
}

export default ExcelToJson;