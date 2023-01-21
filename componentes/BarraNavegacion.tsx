import React, { ReactNode } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NextRouter, withRouter } from "next/router";

interface withRouterProps {
    router: NextRouter;
}

interface Props extends withRouterProps {

}

interface State {
    mostrarBarraNavegacion: boolean;
    mobile: boolean;
}

class BarraNavegacion extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            mostrarBarraNavegacion: false,
            mobile: false
        };

        this.mostrarBarra = this.mostrarBarra.bind(this);
        this.intentarCerrarSesion = this.intentarCerrarSesion.bind(this);
    }
    
    mostrarBarra() {
        this.setState({
            mostrarBarraNavegacion: !this.state.mostrarBarraNavegacion
        });
    }

    async intentarCerrarSesion() {
        const respuesta = await fetch('api/logout', {
            method: 'POST'
        });
        const jsonRespuesta = await respuesta.json();
        if (jsonRespuesta.mensaje === 'ok') {
            this.props.router.push('/');
        }
    }

    componentDidMount(): void {
        this.setState({
            mobile: (window.innerWidth < 768)
        })
    }

    render(): ReactNode {
        if (!this.state.mobile) {
            return (
                <>
                    <div className='contenedor-barra-nav'>
                        <FontAwesomeIcon icon={ faBars } transform={{ rotate: 180 }} size='2x' onClick={ this.mostrarBarra } />
                        <h1>Ed-UCV</h1>
                    </div>
                    <div className={ this.state.mostrarBarraNavegacion ? 'float-down' : 'float-down-reverse' } style={{ display: 'flex', flexDirection: 'row', position: 'absolute', width: '100%', backgroundColor: 'var(--bg)',  zIndex: '10', justifyContent: 'left', padding: '1rem' }}>
                        <button className='alarm' onClick={ this.intentarCerrarSesion }>Cerrar sesión</button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='contenedor-barra-nav'>
                        <FontAwesomeIcon icon={ faBars } transform={{ rotate: 180 }} onClick={ this.mostrarBarra } />
                        <h2>Ed-UCV</h2>
                    </div>
                    <div className={ this.state.mostrarBarraNavegacion ? 'float-down' : 'float-down-reverse' } style={{ display: 'flex', flexDirection: 'column', position: 'absolute', width: '100%', backgroundColor: 'var(--bg)',  zIndex: '10', padding: '1rem' }}>
                        <button className='alarm' onClick={ this.intentarCerrarSesion }>Cerrar sesión</button>
                    </div>
                </>
            );
        }
    }
}

export default withRouter(BarraNavegacion);