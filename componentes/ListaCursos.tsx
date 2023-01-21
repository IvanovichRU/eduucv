import { Asignacion } from "@prisma/client";
import React from "react";
import { PropPersona } from "../lib/TiposEdUCV";
import CartaMateria from "./Cartas/CartaMateria";

interface Props {
    persona: PropPersona;
}

interface State {
    cursos: any[];
    asignaciones: Asignacion[];
}

export default class ListaCursos extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cursos: [],
            asignaciones: []
        };
    }

    async componentDidMount() {
        const respuesta = await fetch('api/cursos?' + new URLSearchParams({
            idPersona: this.props.persona.id.toString(),
            tipoPersona: this.props.persona.tipo.toString()
        }));
        const jsonRespuesta = await respuesta.json();
        if (jsonRespuesta.mensaje === 'ok') {
            this.setState({
                cursos: jsonRespuesta.datos.cursos
            });
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                { this.state.cursos.map(curso => (
                    <CartaMateria key={ curso.id } materia={ curso.materia.nombre } profesor={ `${curso.docente.nombre} ${curso.docente.primerApellido}` } />
                )) }
            </div>
        );
    }
}