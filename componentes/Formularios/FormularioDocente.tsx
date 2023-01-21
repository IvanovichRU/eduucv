import { Usuario } from "@prisma/client";
import React from "react";
import { dateAInputFecha } from "../../lib/comunesFront";

interface DatosFormularioDocente {
    idDocente: number;
    nombre: string;
    primerApellido: string;
    segundoApellido: string;
    email: string;
    fechaNacimiento: string;
    usuario: Usuario;
}

interface Props {
    datosActuales?: DatosFormularioDocente;
    cerrarModal: () => void;
}

interface State {
    idDocente?: number;
    nombre?: string;
    primerApellido?: string;
    segundoApellido?: string;
    email?: string;
    fechaNacimiento?: string;
    usuario?: string;
    password?: string;
}

export default class FormularioDocente extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {

        }

        this.guardarOCrearDocente = this.guardarOCrearDocente.bind(this);
    }

    componentDidMount(): void {
        if (this.props.datosActuales) {
            this.setState({
                idDocente: this.props.datosActuales.idDocente,
                nombre: this.props.datosActuales.nombre,
                primerApellido: this.props.datosActuales.primerApellido,
                segundoApellido: this.props.datosActuales.segundoApellido,
                email: this.props.datosActuales.email,
                fechaNacimiento: dateAInputFecha(new Date(this.props.datosActuales.fechaNacimiento)),
                usuario: this.props.datosActuales.usuario.usuario,
                password: this.props.datosActuales.usuario.password
            });
        }
    }

    async guardarOCrearDocente(evento: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        evento.preventDefault();
        if (this.props.datosActuales) {
            const respuesta = await fetch('api/docente', {
                method: 'POST',
                body: JSON.stringify({
                    idAlumno: this.props.datosActuales.idDocente,
                    nombre: this.state.nombre,
                    primerApellido: this.state.primerApellido,
                    segundoApellido: this.state.segundoApellido,
                    email: this.state.email,
                    fechaNacimiento: this.state.fechaNacimiento,
                })
            });
            const jsonRespuesta = await respuesta.json();
            if (jsonRespuesta.mensaje === 'ok') {
                this.props.cerrarModal();
            } else {
                alert(jsonRespuesta.mensaje);
            }
        } else {
            const respuesta = await fetch('api/docente', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: this.state.nombre,
                    primerApellido: this.state.primerApellido,
                    segundoApellido: this.state.segundoApellido,
                    email: this.state.email,
                    fechaNacimiento: this.state.fechaNacimiento,
                    usuario: this.state.usuario,
                    password: this.state.password
                })
            });
            const jsonRespuesta = await respuesta.json();
            if (jsonRespuesta.mensaje === 'ok') {
                this.props.cerrarModal();
            } else {
                alert(jsonRespuesta.mensaje);
            }
        }
    }

    render(): React.ReactNode {
        return (
            <form className='formulario'>
                <h1 style={{ position: 'sticky', top: '0', backgroundColor: 'var(--bg)' }}>Docente</h1>
                <div style={{ borderTop: 'solid 1px var(--primary)' }}></div>
                <div className='modal-formulario'>
                    <div className='entrada-formulario'>
                        <label>Nombre</label>
                        <input defaultValue={ this.state.nombre } onChange={evento => this.setState({ nombre: evento.target.value })} />
                    </div>
                    <div className='entrada-formulario'>
                        <label>Primer Apellido</label>
                        <input defaultValue={ this.state.primerApellido } onChange={evento => this.setState({ primerApellido: evento.target.value })} />
                    </div>
                    <div className='entrada-formulario'>
                        <label>Segundo Apellido</label>
                        <input defaultValue={ this.state.segundoApellido } onChange={evento => this.setState({ segundoApellido: evento.target.value })} />
                    </div>
                    <div className='entrada-formulario'>
                        <label>Email</label>
                        <input defaultValue={ this.state.email } type='email' onChange={evento => this.setState({ email: evento.target.value })} />
                    </div>
                    <div className='entrada-formulario'>
                        <label>Fecha de Nacimiento</label>
                        <input defaultValue={ this.state.fechaNacimiento } style={{ fontSize: '1.3em', backgroundColor: 'var(--bg-light)' }} type='date' onChange={evento => this.setState({ fechaNacimiento: evento.target.value })} />
                    </div>
                    {
                        this.props.datosActuales?.usuario ? null : 
                            <>
                                <div className='entrada-formulario'>
                                    <label>Nombre de Usuario</label>
                                    <input defaultValue={ this.state.usuario } type='text' onChange={evento => this.setState({ usuario: evento.target.value })} />
                                </div>
                                <div className='entrada-formulario'>
                                    <label>Contraseña</label>
                                    <input defaultValue={ this.state.password } type='password' onChange={evento => this.setState({ password: evento.target.value })} />
                                </div>
                            </>
                    }
                </div>
                <div style={{ marginTop: 'auto', alignSelf: 'end', display: 'flex', gap: '1rem', padding: '8px 2px', flexWrap: 'wrap' }}>
                    <button type='button' onClick={ this.props.cerrarModal } className='secondary'>Cancelar</button>
                    <button type='button' onClick={ this.guardarOCrearDocente } className='primary'>{ this.props.datosActuales ? 'Guardar' : 'Crear' }</button>
                </div>
            </form>
        )
    }
}