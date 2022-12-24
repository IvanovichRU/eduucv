import React from "react"

interface Props {

}

interface Estado {
    usuario: string,
    password: string
}

export default class Login extends React.Component<Props, Estado> {
    constructor(props: Props) {
        super(props);
        this.state = {
            usuario: '',
            password: ''
        }

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
            usuario: evento.target.value
        });
    }

    intentarIngreso() {
        const datosPost = new FormData();
        datosPost.append('usuario', this.state.usuario);
        datosPost.append('password', this.state.password);
        fetch('api/login', {
            method: 'POST',
            body: datosPost
        })
            .then(respuesta => {
                console.log(respuesta);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render(): React.ReactNode {
        return (
            <div>
                <h3>Usuario</h3>
                <input onChange={this.actualizarUsuario} value={this.state.usuario} />
                <h3>Contraseña</h3>
                <input type={'password'} />
                <button onClick={ this.intentarIngreso } >Ingresar</button>
            </div>
        );
    }
}