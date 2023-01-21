import React from "react"
import { PropPersona } from "../lib/TiposEdUCV";

interface Props {
    persona: PropPersona;
    cambiarCatalogo: (catalogo: number) => void;
}

interface State {
    tablaActual: number;
}

export default class SelectorTabla extends React.Component<Props, State> {
    tablas: string[];

    constructor(props: Props) {
        super(props);
        this.state = {
            tablaActual: 0
        };

        this.tablas = [
            'Cursos',
            'Alumnos',
            'Docentes',
            'Materias',
            'Administrativos'
        ];
    }

    render(): React.ReactNode {
        return (
            <div className='selector-tabla'>
                {
                    this.tablas.map((tabla, indice) => {
                        return <span key={indice} onClick={() => {this.setState({ tablaActual: indice }); this.props.cambiarCatalogo(indice);}} className={ this.state.tablaActual === indice ? 'tabla-seleccionada' : 'tabla-no-seleccionada' }>{ tabla }</span>
                    })
                }
            </div>
        );
    }
}