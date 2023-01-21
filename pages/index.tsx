import { prisma } from "../lib/prisma";
import { getCookie } from "cookies-next";
import { NextPageContext } from "next";
import { NextRouter, withRouter } from "next/router";
import React from "react"

interface withRouterProps {
    router: NextRouter;
}

interface Props extends withRouterProps {

}

interface Estado {
    usuario: string,
    password: string
}

interface EntradaFormulario {

}

export async function getServerSideProps({req: peticion}: NextPageContext) {
    const tokenSesion = getCookie('token-sesion', {
        req: peticion
    });
    if (tokenSesion) {
        const sesion = await prisma.sesion.findFirst({
            where: {
                token: tokenSesion.toString()
            }
        })
        if (sesion) {
            return {
                redirect: {
                    destination: '/inicio',
                    permanent: false
                }
            }
        } else {
            return {
                props: {}
            }
        }
    } else {
        return {
            props: {}
        }
    }
}

class Login extends React.Component<Props, Estado> {
    controlUsuario: React.RefObject<HTMLInputElement>;
    controlPassword: React.RefObject<HTMLInputElement>;
    constructor(props: Props) {
        super(props);
        this.state = {
            usuario: '',
            password: ''
        }

        this.controlUsuario = React.createRef();
        this.controlPassword = React.createRef();

        this.actualizarUsuario = this.actualizarUsuario.bind(this);
        this.actualizarPassword = this.actualizarPassword.bind(this);
        this.intentarIngreso = this.intentarIngreso.bind(this);
    }

    actualizarUsuario(evento: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            usuario: evento.target.value
        });
    }

    actualizarPassword(evento: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            password: evento.target.value
        });
    }

    intentarIngreso(evento: React.MouseEvent<HTMLButtonElement>) {
        evento.preventDefault();
        const inputsInvalidos = [];
        if (!this.state.usuario && this.controlUsuario.current) {
            this.controlUsuario.current.className = 'error';
            this.controlUsuario.current.labels ? this.controlUsuario.current.labels[0].className = 'error' : '';
            inputsInvalidos.push(this.controlUsuario.current);
        }
        if (!this.state.password && this.controlPassword.current) {
            this.controlPassword.current.className = 'error';
            this.controlPassword.current.labels ? this.controlPassword.current.labels[0].className = 'error' : '';
            inputsInvalidos.push(this.controlPassword.current);
        }
        if (inputsInvalidos.length) {
            inputsInvalidos[0].focus();
            return;
        }
        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                usuario: this.state.usuario,
                password: this.state.password
            })
        })
            .then(async (respuesta) => {
                const jsonRespuesta = await respuesta.json();
                if (jsonRespuesta) {
                    if (jsonRespuesta.mensaje === 'ok') {
                        this.props.router.push('/inicio');
                    } else {
                        alert(jsonRespuesta.info);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(): React.ReactNode {
        return (
            <div className='contenedor-login float-down'>
                <form className='formulario-login'>
                    <h1>Ed-UCV</h1>
                    <div className='entrada-formulario'>
                        <label htmlFor='inputUsuarioLogin'>Usuario</label>
                        <input id='inputUsuarioLogin' onChange={this.actualizarUsuario} onBlur={evento => {evento.target.className = ''; evento.target.labels ? evento.target.labels[0].className = '' : ''}} value={this.state.usuario} ref={ this.controlUsuario } placeholder='Usuario' />
                    </div>
                    <div className='entrada-formulario'>
                        <label htmlFor='inputPasswordLogin'>Contraseña</label>
                        <input id='inputPasswordLogin' onChange={ this.actualizarPassword } onBlur={evento => {evento.target.className = ''; evento.target.labels ? evento.target.labels[0].className = '' : ''}} value={ this.state.password } ref={ this.controlPassword } placeholder='Contraseña' type={'password'} />
                    </div>
                    <div style={{ borderTop: 'solid 1px var(--bg)' }} />
                    <div style={{ display: 'flex', justifyContent: 'right' }}>
                        <button className='primary' onClick={ this.intentarIngreso } >Ingresar</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);