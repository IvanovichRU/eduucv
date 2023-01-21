import { prisma } from "../lib/prisma";
import React from "react";
import { NextPageContext } from "next";
import { Usuario } from "@prisma/client";
import { getCookie } from "cookies-next";
import { PropPersona, TipoPersona } from "../lib/TiposEdUCV";
import { obtenerPersonaPorIdUsuario } from "../lib/comunesPrisma";
import ListaCursos from "../componentes/ListaCursos";
import PantallaPrincipalAdmin from "../componentes/PantallaPrincipalAdmin";


interface Props {
    usuario: Usuario;
    datosPersona: PropPersona;
}

export async function getServerSideProps({ req: peticion, res: respuesta }: NextPageContext) {
    const tokenSesion = getCookie('token-sesion', {
        req: peticion
    });
    let usuario;
    let personaRelacionada: PropPersona | undefined;
    if (tokenSesion) {
        const sesion = await prisma.sesion.findFirst({
            where: {
                token: tokenSesion.toString()
            }
        });
        if (sesion) {
            usuario = await prisma.usuario.findUnique({
                where: {
                    id: sesion.idUsuario
                },
                include: {
                    alumnos: true,
                    docentes: true,
                    administrativos: true
                }
            });
            if (usuario) {
                const personaUsuario = await obtenerPersonaPorIdUsuario(usuario.id);
                if (personaUsuario) {
                    personaRelacionada = {
                        id: personaUsuario.id,
                        tipo: usuario.tipoPersona,
                        nombre: personaUsuario.nombre,
                        primerApellido: personaUsuario.primerApellido,
                        segundoApellido: personaUsuario.segundoApellido,
                        email: personaUsuario.email,
                        fechaNacimiento: personaUsuario.fechaNacimiento.toISOString()
                    }
                }
            }
        } else {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
        return {
            props: {
                usuario: usuario ? {
                    usuario: usuario.usuario
                } : null,
                datosPersona: personaRelacionada
            }
        }
    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
}

export default class Inicio extends React.Component<Props> {
    render(): React.ReactNode {
        switch (this.props.datosPersona.tipo) {
            case TipoPersona.Alumno: {
                return (
                    <div className="float-up contenedor-principal" >
                        <div>
                            <h3>{'Bienvenido, ' + this.props.datosPersona.nombre}</h3>
                            <p style={{ opacity: '0.6' }}>
                                Abajo se muestran tus pendientes actuales.
                            </p>
                        </div>
                        <ListaCursos persona={ this.props.datosPersona } />
                    </div>
                );
            }
            case TipoPersona.Docente: {
                return (
                    <div>
                        <h2>Cursos</h2>
                    </div>
                );
            }
            case TipoPersona.Administrativo: {
                return (
                    <PantallaPrincipalAdmin persona={ this.props.datosPersona } />
                );
            }
        }
    }
}
