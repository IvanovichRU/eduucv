import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { estilosTabla, PropPersona } from "../lib/TiposEdUCV";
import Modal from 'react-modal';
import FormularioCurso from "./Formularios/FormularioCurso";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";

interface FilaCurso {
    datos: any;
    nombre: string;
    docente: string;
    numeroAlumnos: number;
    cadenaTermino: string;
}

interface Props {
    persona: PropPersona
}

interface State {
    cursos: any;
    mobile: boolean;
    cargarModal: boolean;
    datosModal?: any;
}

export default class CatalogoCursos extends React.Component<Props, State> {
    columnas: TableColumn<FilaCurso>[];

    constructor(props: Props) {
        super(props);
        this.state = {
            cursos: [],
            mobile: false,
            cargarModal: false
        }
        this.columnas = [
            {
                name: 'Materia',
                selector: row => row.nombre
            },
            {
                name: 'Docente',
                selector: row => row.docente
            },
            {
                name: 'Alumnos',
                selector: row => row.numeroAlumnos
            },
            {
                name: 'Duración',
                selector: row => row.cadenaTermino
            }
        ]
    }

    componentDidMount(): void {
        this.obtenerCursos();
        Modal.setAppElement('body');
    }

    async obtenerCursos() {
        const respuesta = await fetch('api/cursos?' + new URLSearchParams({
            idPersona: this.props.persona.id.toString()
        }), {
            method: 'GET'
        });
        const jsonRespuesta = await respuesta.json();
        if (jsonRespuesta.mensaje === 'ok') {
            this.setState({ 
                cursos: jsonRespuesta.datos.cursos,
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
        const datosFinales: FilaCurso[] = this.state.cursos.map((curso: any): FilaCurso => ({
            datos: curso,
            nombre: curso.materia.nombre,
            docente: curso.docente.nombre + ' ' + curso.docente.primerApellido,
            numeroAlumnos: curso.alumnos.length,
            cadenaTermino: `${new Date(curso.fechaInicio).toLocaleDateString('es', { dateStyle: 'short' })} a ${new Date(curso.fechaFinal).toLocaleDateString('es', { dateStyle: 'short' })}`
        }));
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DataTable
                    key='cursos'
                    columns={ this.columnas }
                    data={ datosFinales }
                    responsive={ true }
                    striped={ true }
                    highlightOnHover={ true }
                    customStyles={ estilosTabla }
                    onRowClicked={(fila) => {
                        this.setState({
                            datosModal: {
                                idCurso: fila.datos.id,
                                materia: fila.datos.materia,
                                docente: fila.datos.docente,
                                fechaInicio: fila.datos.fechaInicio,
                                fechaFin: fila.datos.fechaFinal
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
                        isOpen={ this.state.cargarModal ? true : false }
                        overlayClassName='modal-personalizado-overlay'
                        className='modal-personalizado-contenido'
                        onRequestClose={() => this.setState({ cargarModal: false })}
                        closeTimeoutMS={200}
                        contentLabel='Curso'
                    >
                        <FormularioCurso datosActuales={ this.state.datosModal } cerrarModal={() => this.obtenerCursos()} />
                    </ReactModal>
                </div>
            </div>
        );
    }
}