import React, { PropsWithChildren } from "react";
import styles from './Base.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser, faTableColumns, faBook, faCode, faUser, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import BarraNavegacion from "../BarraNavegacion";

interface PropiedadesBase extends PropsWithChildren {

}

type EstadoBase = {
    ocultarNav: boolean;
}

export default class Base extends React.Component<PropiedadesBase, EstadoBase> {
    render() {
        return (
            <div style={{ backgroundColor: 'var(--bg)' }}>
                <BarraNavegacion />
                <div style={{ width: '100%', height: '100%' }}>
                    { this.props.children }
                </div>
            </div>
        );
    }
}