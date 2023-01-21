import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Modal from 'react-modal';
import DataTable, { TableColumn } from "react-data-table-component";
import { estilosTabla, PropPersona } from "../lib/TiposEdUCV";
import FormularioAlumno from "./Formularios/FormularioAlumno";
import ReactModal from "react-modal";

interface FilaAlumno {
    datos: any;
    folio: number;
    nombre: string;
    semestre: number;
    cursosActivos: number;
}

interface Props {
    persona: PropPersona;
}

interface State {
    alumnos: any;
    mobile: boolean;
    cargarModal: boolean;
    datosModal?: any;
}

export default class CatalogoAlumnos extends React.Component<Props, State> {
    columnas: TableColumn<FilaAlumno>[];

    constructor(props: Props) {
        super(props);
        this.state = {
            alumnos: [],
            mobile: false,
            cargarModal: false
        }

        this.columnas = [
            {
                name: '# Control',
                selector: row => row.folio
            },
            {
                name: 'Nombre',
                selector: row => row.nombre
            },
            {
                name: 'Semestre',
                selector: row => row.semestre
            },
            {
                name: 'Cursos Activos',
                selector: row => row.cursosActivos
            }
        ]
    }

    componentDidMount(): void {
        this.obtenerAlumnos();
        Modal.setAppElement('body');
    }

    async obtenerAlumnos() {
        const respuesta = await fetch('api/alumnos', {
            method: 'GET'
        });
        const jsonRespuesta = await respuesta.json();
        if (jsonRespuesta.mensaje === 'ok') {
            this.setState({ 
                alumnos: jsonRespuesta.datos.alumnos,
                mobile: (window.innerWidth > 768),
                cargarModal: false
            });
        } else {
            this.setState({ 
                mobile: (window.innerWidth > 768),
                cargarModal: false
            });
        }
    }

    render(): React.ReactNode {
        const datosFinales: FilaAlumno[] = this.state.alumnos.map((alumno: any): FilaAlumno => ({
            datos: alumno,
            folio: (alumno.id).toString().padStart(4, '0'),
            nombre: alumno.nombre + ' ' + alumno.primerApellido + (alumno.segundoApellido ? ` ${alumno.segundoApellido}` : ''),
            semestre: alumno.semestre,
            cursosActivos: alumno.cursos.length
        }));
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DataTable
                    key='alumnos'
                    columns={ this.columnas }
                    data={ datosFinales }
                    responsive={ true }
                    striped={ true }
                    highlightOnHover={ true }
                    customStyles={ estilosTabla }
                    onRowClicked={(fila) => {
                        this.setState({
                            datosModal: {
                                idAlumno: fila.datos.id,
                                nombre: fila.datos.nombre,
                                primerApellido: fila.datos.primerApellido,
                                segundoApellido: fila.datos.segundoApellido,
                                email: fila.datos.email,
                                fechaNacimiento: fila.datos.fechaNacimiento,
                                semestre: fila.datos.semestre,
                                usuario: fila.datos.usuario,
                                password: fila.datos.usuario.password
                            },
                            cargarModal: true
                        });
                    }}
                    pagination
                    paginationComponentOptions={{
                        rowsPerPageText: 'Registros por página',
                        rangeSeparatorText: 'de'
                    }}
                    noDataComponent={<div style={{ padding: '1rem', fontWeight: 'bold' }}>No hay registros.</div>}
                />
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'right' }}>
                    <button className='primary' onClick={() => this.setState({ cargarModal: true, datosModal: undefined })}>
                        {
                            this.state.mobile ? 'Agregar' : <FontAwesomeIcon icon={ faPlus } />
                        }
                    </button>
                    <ReactModal
                        isOpen={ this.state.cargarModal }
                        overlayClassName='modal-personalizado-overlay'
                        className='modal-personalizado-contenido'
                        onRequestClose={() => this.setState({ cargarModal: false })}
                        closeTimeoutMS={200}
                        contentLabel='Alumno'
                    >
                        <FormularioAlumno datosActuales={ this.state.datosModal } cerrarModal={() => this.obtenerAlumnos()} />
                    </ReactModal>
                </div>
            </div>
        )
    }
}