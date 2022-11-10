import React, { PropsWithChildren } from "react";
import styles from './Base.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faTableColumns, faBook, faCode, faUser, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";

interface PropiedadesBase extends PropsWithChildren {

}

type EstadoBase = {
    ocultarNav: boolean;
}

export default class Base extends React.Component<PropiedadesBase, EstadoBase> {
    constructor(props: PropiedadesBase) {
        super(props);
        this.state = {
            ocultarNav: true
        }

        this.mostrarMenu = this.mostrarMenu.bind(this);
    }

    mostrarMenu() {
        this.setState(estadoAntiguo => ({ocultarNav: !estadoAntiguo.ocultarNav}))
    }

    render() {

        const claseNav = this.state.ocultarNav ? (`${styles['nav-mostrada']} ${styles['barra-nav']}`) : (`${styles['nav-oculta']} ${styles['barra-nav']}`) ;

        return (
            <div>
                <div className={styles.contenido}>
                    <div style={{ position: 'absolute', width: '100%', display: 'flex', bottom: '0' }}>
                        <div id='barra-nav' className={claseNav}>
                            <div style={{ position: 'absolute', top: '-30px' }} onClick={ this.mostrarMenu }>
                                <FontAwesomeIcon icon={ faChevronUp } className={ this.state.ocultarNav ? styles.giro0 : styles.giro180 } />
                            </div>
                            <FontAwesomeIcon icon={ faUser } size='4x' />
                            <h2>Kevin D.</h2>
                            <Link href={'/'} className={ styles['opcion-nav']} onClick={() => this.setState(() => ({ ocultarNav: true }))} >
                                <FontAwesomeIcon icon={faHouseUser} />
                                <h3>Inicio</h3>
                            </Link>
                            <Link href={'/Dashboard'} className={ styles['opcion-nav']} onClick={() => this.setState(() => ({ ocultarNav: true }))}>
                                <FontAwesomeIcon icon={faTableColumns} />
                                <h3>Dashboard</h3>
                            </Link>
                            <Link href={'/MisCursos'} className={ styles['opcion-nav']} onClick={() => this.setState(() => ({ ocultarNav: true }))}>
                                <FontAwesomeIcon icon={faBook} />
                                <h3>Mis Cursos</h3>
                            </Link>
                            <Link href={'/Proyectos'} className={ styles['opcion-nav']} onClick={() => this.setState(() => ({ ocultarNav: true }))}>
                                <FontAwesomeIcon icon={faCode} />
                                <h3>Proyectos/Programas</h3>
                            </Link>
                        </div>
                    </div>
                    <div style={{ width: '100%', padding: '0.5em' }} onClick={() => this.setState((antiguoEstado, propiedades) => ({ ocultarNav: !antiguoEstado.ocultarNav }))}>
                        { this.props.children }
                    </div>
                </div>
            </div>
        )
    }
}