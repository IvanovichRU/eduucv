import { prisma } from "../lib/prisma";
import CartaMateria from "../componentes/Cartas/CartaMateria";
import React from "react";
import { NextPageContext } from "next";
import { Alumno } from "@prisma/client";

interface Props {
    alumnos: Alumno[];
}

export async function getServerSideProps({ req }: NextPageContext) {
    const alumnos = await prisma.alumno.findMany();
    return { props: { alumnos: alumnos.map((alumno: Alumno) => ({
        ...alumno,
        creadoEn: alumno.creadoEn.toISOString(),
        actualizadoEn: alumno.actualizadoEn.toISOString()
    }))} };
}

export default class Inicio extends React.Component<Props> {

    render(): React.ReactNode {
        return (
            <div className="float-up" style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                <h1 style={{ position: 'sticky', top: '0' }} >Inicio</h1>
                <div>
                    <h3>Bienvenido a Ed-UCV</h3>
                    <p style={{ opacity: '0.6' }}>
                        Abajo se muestran tus pendientes actuales.
                    </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em' }}>
                    <CartaMateria materia="Programación Estructurada" profesor="Isabel" siguienteClase="Hoy, de 8 a 10" />
                    <CartaMateria materia="Sistemas de Información" profesor="Norma" />
                    <CartaMateria materia="Estructura de Datos" profesor="Norma" />
                    <CartaMateria materia="Programación Orientada a Objetos" profesor="Aironou" />
                </div>
                <ul>
                    {
                        this.props.alumnos.map(alumno => (<li key={alumno.id} >{ alumno.nombre }</li>))
                    }
                </ul>
            </div>
        );
    }
}
