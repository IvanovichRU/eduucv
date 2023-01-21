import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { estilosTabla, PropPersona } from "../lib/TiposEdUCV";
import Modal from 'react-modal';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import FormularioDocente from "./Formularios/FormularioDocente";

interface FilaDocente {
    datos: any;
    nombre: string;
    email: string;
    cursosActivos: number;
}

interface Props {
    persona: PropPersona;
}

interface State {
    docentes: any;
    mobile: boolean;
    cargarModal: boolean;
    datosModal?: any;
}

export default class CatalogoDocentes extends React.Component<Props, State> {
    columnas: TableColumn<FilaDocente>[];

    constructor(props: Props) {
        super(props);
        this.state = {
            docentes: [],
            mobile: false,
            cargarModal: false
        }

        this.columnas = [
            {
                name: 'Nombre',
                selector: row => row.nombre
            },
            {
                name: 'Email',
                selector: row => row.email
            },
            {
                name: 'Cursos Activos',
                selector: row => row.cursosActivos
            },
        ];
    }
    
    componentDidMount(): void {
        this.obtenerAlumnos();
        Modal.setAppElement('body');
    }

    async obtenerAlumnos(): Promise<void> {
        const respuesta = await fetch('api/docentes', {
            method: 'GET'
        });
        const jsonRespuesta = await respuesta.json();
        if (jsonRespuesta.mensaje === 'ok') {
            this.setState({ 
                docentes: jsonRespuesta.datos.docentes,
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
        const datosFinales: FilaDocente[] = this.state.docentes.map((docente: any): FilaDocente => ({
            datos: docente,
            nombre: docente.nombre + ' ' + docente.primerApellido + (docente.segundoApellido ? ` ${docente.segundoApellido}` : ''),
            email: docente.email,
            cursosActivos: docente.cursos.length
        }));
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <DataTable
                    key='docentes'
                    columns={ this.columnas }
                    data={ datosFinales }
                    responsive={ true }
                    striped={ true }
                    highlightOnHover={ true }
                    customStyles={ estilosTabla }
                    onRowClicked={(fila) => {
                        this.setState({
                            datosModal: {
                                idDocente: fila.datos.id,
                                nombre: fila.datos.nombre,
                                primerApellido: fila.datos.primerApellido,
                                segundoApellido: fila.datos.segundoApellido,
                                email: fila.datos.email,
                                fechaNacimiento: fila.datos.fechaNacimiento,
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
                        contentLabel='Docente'
                    >
                        <FormularioDocente datosActuales={ this.state.datosModal } cerrarModal={() => this.obtenerAlumnos()} />
                    </ReactModal>
                </div>
            </div>
        );
    }
}