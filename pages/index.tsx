import CartaMateria from "../componentes/Cartas/CartaMateria"

export default function Home() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
            <h1 style={{ position: 'sticky', top: '0' }} className="float-up">Inicio</h1>
            <div>
                <h3>Bienvenido a Ed-UCV</h3>
                <p style={{ opacity: '0.6' }}>
                    Abajo se muestran tus cursos actuales.
                </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                <CartaMateria materia="Programación Estructurada" profesor="Isabel" siguienteClase="Hoy, de 8 a 10" />
                <CartaMateria materia="Sistemas de Información" profesor="Norma" />
                <CartaMateria materia="Estructura de Datos" profesor="Norma" />
                <CartaMateria materia="Programación Orientada a Objetos" profesor="Aironou" />
            </div>
        </div>
    )
}
