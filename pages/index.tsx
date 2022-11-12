export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <h1 className="float-up">Inicio</h1>
            <div>
                <h3>Bienvenido a Ed-UCV</h3>
                <p style={{ opacity: '0.6' }}>
                    Abajo se muestran tus cursos actuales.
                </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div style={{ padding: '0.5em' }}>
                    <h4>Programación Estructurada</h4>
                </div>
                <div style={{ padding: '0.5em' }}>
                    <h4>Sistemas de Información</h4>
                </div>
                <div style={{ padding: '0.5em' }}>
                    <h4>Estructura de Datos</h4>
                </div>
                <div style={{ padding: '0.5em' }}>
                    <h4>Programación Orientada a Objetos</h4>
                </div>
            </div>
        </div>
    )
}
