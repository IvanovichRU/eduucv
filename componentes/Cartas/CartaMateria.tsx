import React from "react";

interface PropsCartaMateria {
    materia: string;
    profesor: string;
    siguienteClase?: string;
}

export default class CartaMateria extends React.Component<PropsCartaMateria, {}> {
    render() {
        return (
            <div style={{ padding: '0.75em', backgroundColor: 'var(--bg-light)', width: '100%', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ fontSize: '1.25em', alignSelf: 'flex-start' }}><b>{ this.props.materia }</b></p>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', alignSelf: 'flex-start' }}>{ this.props.profesor }</p>
                <div style={{ padding: '1em', margin: '0.5em', width: '85%' }}>
                    <p style={{ textAlign: 'center' }} >Sin pendientes ✨</p>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.8em', textAlign: 'right', alignSelf: 'flex-end' }}>{ this.props.siguienteClase }</p>
            </div>
        )
    }
}