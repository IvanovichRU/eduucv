import React, { PropsWithChildren } from "react";
import styles from './Base.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faTableColumns, faBook, faCode, faUser, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface PropiedadesBase extends PropsWithChildren {

}

type EstadoBase = {
    mostrarMenu: boolean;
}

export default class Base extends React.Component<PropiedadesBase, EstadoBase> {
    constructor(props: PropiedadesBase) {
        super(props);
        this.state = {
            mostrarMenu: false
        }

        this.mostrarMenu = this.mostrarMenu.bind(this);
    }

    mostrarMenu() {
        console.log(this.state.mostrarMenu);
        this.setState(estadoAntiguo => ({mostrarMenu: !estadoAntiguo.mostrarMenu}))
    }

    render() {
        return (
            <div>
                <div className={styles.contenido}>
                    <div style={{ position: 'absolute', width: '100%', display: 'flex', bottom: '0', transform: this.state.mostrarMenu ? 'translateY(100%)' : 'translateY(0%)' }}>
                        <div id='barra-nav' className={styles['barra-nav']}>
                            <div style={{ position: 'absolute', top: '-30px' }} onClick={ this.mostrarMenu }>
                                <FontAwesomeIcon icon={ faChevronUp } />
                            </div>
                            <FontAwesomeIcon icon={ faUser } size='4x' />
                            <h2>Kevin D.</h2>
                            <div className={ styles['opcion-nav']}>
                                <FontAwesomeIcon icon={faHouseUser} />
                                <h3>Inicio</h3>
                            </div>
                            <div className={ styles['opcion-nav']}>
                                <FontAwesomeIcon icon={faTableColumns} />
                                <h3>Dashboard</h3>
                            </div>
                            <div className={ styles['opcion-nav']}>
                                <FontAwesomeIcon icon={faBook} />
                                <h3>Mis Cursos</h3>
                            </div>
                            <div className={ styles['opcion-nav']}>
                                <FontAwesomeIcon icon={faCode} />
                                <h3>Proyectos</h3>
                            </div>
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        )
    }
}