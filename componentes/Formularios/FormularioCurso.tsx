import { Docente, Materia } from "@prisma/client";
import React from "react";
import DataTable from "react-data-table-component";
import Select from "react-select";
import { dateAInputFecha } from "../../lib/comunesFront";
import { estiloSelect } from "../../lib/TiposEdUCV";


// Creamos una interfaz/tipo para manejar los datos que llegan
// desde el catálogo al formulario y que a su vez, se manejan
// dentro del formulario.
interface DatosFormularioCurso {
    idCurso: number;
    materia: Materia;
    docente: Docente;
    fechaInicio: string;
    fechaFin: string;
}

// Creamos una interfaz/tipo para las propiedades de este
// formulario.
interface Props {
    datosActuales?: DatosFormularioCurso;
    cerrarModal: () => void;
}

// Creamos una interfaz/tipo para el estado de este
// formulario.
interface State {
    materias: Materia[];
    docentes: Docente[];
    idCurso?: number;
    materia?: number;
    docente?: number;
    fechaInicio?: string;
    fechaFinal?: string;
}

export default class FormularioCurso extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            materias: [],
            docentes: [],
        };

        this.guardarOCrearCurso = this.guardarOCrearCurso.bind(this);
    }

    componentDidMount(): void {

        // Creamos un arreglo de promesas para esperar que todas culminen.
        const promesasDatosNecesarios = [
            fetch('api/materias'),
            fetch('api/docentes')
        ];

        // Manejamos las peticiones con Promise.all, al concluir, asignamos
        // los datos obtenidos al estado del formulario.
        Promise.all(promesasDatosNecesarios)
            .then(async respuestas => {
                const materias = (await respuestas[0].json()).datos.materias;
                const docentes = (await respuestas[1].json()).datos.docentes;
                this.setState({
                    materias: materias.length ? materias : [],
                    docentes: docentes.length ? docentes : [],
                    idCurso: this.props.datosActuales?.idCurso,
                    materia: this.props.datosActuales?.materia.id,
                    docente: this.props.datosActuales?.docente.id,
                    fechaInicio: this.props.datosActuales ? dateAInputFecha(new Date(this.props.datosActuales.fechaInicio)) : undefined,
                    fechaFinal: this.props.datosActuales ? dateAInputFecha(new Date(this.props.datosActuales.fechaFin)) : undefined,
                });
            })
            .catch(razon => {
                console.log(razon);
            });
    }

    async guardarOCrearCurso(evento: React.MouseEvent<HTMLButtonElement>): Promise<void> {

        // Prevenimos el evento submit del formulario.
        evento.preventDefault();
        if (this.props.datosActuales) {

            // Hacemos una petición para hacer update al curso en edición.
            const respuesta = await fetch('api/curso', {
                method: 'POST',
                body: JSON.stringify({
                    idCurso: this.props.datosActuales.idCurso,
                    idMateria: this.state.materia,
                    idDocente: this.state.docente,
                    fechaInicio: this.state.fechaInicio,
                    fechaFinal: this.state.fechaFinal
                })
            });

            // Obtenemos un objeto a partir del json().
            const jsonRespuesta = await respuesta.json();

            // Si el servidor responde con mensaje ok, cerramos
            // el modal y actualizamos la tabla de cursos.
            if (jsonRespuesta.mensaje === 'ok') {
                this.props.cerrarModal();
            } else {

                // Sino, alertamos al usuario con el mensaje
                // que devolvió el servidor.
                alert(jsonRespuesta.mensaje);
            }
        } else {

            // Hacemos una petición para crear un nuevo curso.
            const respuesta = await fetch('api/curso', {
                method: 'POST',
                body: JSON.stringify({
                    idMateria: this.state.materia,
                    idDocente: this.state.docente,
                    fechaInicio: this.state.fechaInicio,
                    fechaFinal: this.state.fechaFinal
                })
            });

            // Obtenemos un objeto a partir del json()
            const jsonRespuesta = await respuesta.json();

            // Si el servidor responde con mensaje ok, cerramos
            // el modal y actualizamos la tabla de cursos.
            if (jsonRespuesta.mensaje === 'ok') {
                this.props.cerrarModal();
            } else {

                // Sino, alertamos al usuario con el mensaje
                // que devolvió el servidor.
                alert(jsonRespuesta.mensaje);
            }
        }
    }

    render(): React.ReactNode {
        return (
            <form className='formulario'>
                <h1>Curso</h1>
                <div style={{ borderTop: 'solid 1px var(--primary)' }}></div>
                <div className='modal-formulario'>
                    <div className='entrada-formulario'>
                        <label>Materia</label>
                        <Select defaultValue={ this.props.datosActuales !== undefined ? { label: this.props.datosActuales.materia.nombre, value: this.props.datosActuales.materia.id } : null } onChange={(valor: any) => this.setState({ materia: valor.value })} options={ this.state.materias.map((materia) => ({ label: materia.nombre, value: materia.id })) } styles={estiloSelect}/>
                    </div>
                    <div className='entrada-formulario'>
                        <label>Docente</label>
                        <Select defaultValue={ this.props.datosActuales !== undefined ? { label: `${this.props.datosActuales.docente.nombre} ${this.props.datosActuales.docente.primerApellido}`, value: this.props.datosActuales.docente.id } : null } onChange={(valor: any) => this.setState({ docente: valor.value })} options={ this.state.docentes.map(docente => ({ label: docente.nombre + ' ' + docente.primerApellido, value: docente.id })) } styles={estiloSelect} />
                    </div>
                    <div className='entrada-formulario'>
                        <label>Fecha Inicio</label>
                        <input className='fecha' defaultValue={ this.state.fechaInicio }  type='date' onChange={evento => this.setState({ fechaInicio: evento.target.value })}  />
                    </div>
                    <div className='entrada-formulario'>
                        <label>Fecha Final</label>
                        <input defaultValue={ this.state.fechaFinal } className='fecha' style={{ fontSize: '1.3em', backgroundColor: 'var(--bg-light)' }} type='date' onChange={evento => this.setState({ fechaFinal: evento.target.value })} />
                    </div>
                </div>
                <div className='botones-formulario'>
                    <button type='button' onClick={ this.props.cerrarModal } className='secondary'>Cancelar</button>
                    <button type='button' onClick={ this.guardarOCrearCurso } className='primary'>{ this.props.datosActuales ? 'Guardar' : 'Crear' }</button>
                </div>
            </form>
        );
    }
}