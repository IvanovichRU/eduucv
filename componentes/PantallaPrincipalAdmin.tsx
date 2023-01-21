import React from "react";
import { PropPersona } from "../lib/TiposEdUCV";
import CatalogoAlumnos from "./CatalogoAlumnos";
import CatalogoCursos from "./CatalogoCursos";
import CatalogoDocentes from "./CatalogoDocentes";
import SelectorTabla from "./SelectorTabla";

enum Catalogo {
    Cursos,
    Alumnos,
    Docentes,
    Materias,
    Administrativos
};

interface Props {
    persona: PropPersona;
}

interface State {
    catalogo: Catalogo
}

export default class PantallaPrincipalAdmin extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            catalogo: Catalogo.Cursos
        };
    }

    manejarCatalogo() {
        switch (this.state.catalogo) {
            case Catalogo.Cursos: return <CatalogoCursos persona={ this.props.persona } />;
            case Catalogo.Alumnos: return <CatalogoAlumnos persona={ this.props.persona } />;
            case Catalogo.Docentes: return <CatalogoDocentes persona={ this.props.persona } />;
       }
    }

    render(): React.ReactNode {
        return (
            <div className='float-up contenedor-principal'>
                <SelectorTabla persona={ this.props.persona } cambiarCatalogo={(catalogo) => this.setState({ catalogo: catalogo })}  />
                {
                    this.manejarCatalogo()
                }
            </div>
        )
    }
}