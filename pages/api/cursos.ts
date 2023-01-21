import { prisma } from "../../lib/prisma";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { obtenerPersonaPorIdUsuario, obtenerUsuarioPorTokenSesion } from "../../lib/comunesPrisma";
import { TipoPersona } from "../../lib/TiposEdUCV";

interface parametrosGET {
    idPersona: number;
    tipoPersona: TipoPersona;
}

export default async function handler(peticion: NextApiRequest, respuesta: NextApiResponse) {
    if (peticion.method !== 'GET') {
        respuesta.status(405).json({
            mensaje: 'Sólo se permiten peticiones GET a este enlace.'
        });
    } else {
        const datos: parametrosGET = {
            idPersona: Number.parseInt(peticion.query.idPersona as string),
            tipoPersona: Number.parseInt(peticion.query.tipoPersona as string)
        };
        const token = getCookie('token-sesion', {
            req: peticion,
            res: respuesta
        });
        if (token) {
            const usuarioSesionPeticion = await obtenerUsuarioPorTokenSesion(token.toString());
            if (usuarioSesionPeticion) {
                switch (usuarioSesionPeticion.tipoPersona) {
                    case TipoPersona.Alumno: {
                        const alumnoSesionPeticion = await obtenerPersonaPorIdUsuario(usuarioSesionPeticion.id);
                        if (alumnoSesionPeticion && (alumnoSesionPeticion.id === datos.idPersona)) {
                            const cursosAlumno = await prisma.alumno.findUnique({
                                where: {
                                    id: alumnoSesionPeticion.id
                                },
                                include: {
                                    cursos: {
                                        select: {
                                            curso: {
                                                select: {
                                                    materia: {
                                                        select: {
                                                            id: true,
                                                            nombre: true
                                                        }
                                                    },
                                                    docente: {
                                                        select: {
                                                            id: true,
                                                            nombre: true,
                                                            primerApellido: true,
                                                            segundoApellido: true
                                                        }

                                                    }
                                                }
                                            }   
                                        }
                                    }
                                }
                            });
                            respuesta.status(200).json({
                                mensaje: 'ok',
                                datos: {
                                    cursos: cursosAlumno?.cursos.map(curso => curso.curso) 
                                }
                            });
                        }
                        break;
                    }
                    case TipoPersona.Docente: {
                        const docenteSesionPeticion = await obtenerPersonaPorIdUsuario(usuarioSesionPeticion.id);
                        if (docenteSesionPeticion && (docenteSesionPeticion.id === datos.idPersona)) {
                            const cursosDocente = await prisma.curso.findMany({
                                where: {
                                    idDocente: docenteSesionPeticion.id
                                }
                            });
                            respuesta.status(200).json({
                                mensaje: 'ok',
                                datos: {
                                    cursos: cursosDocente
                                }
                            })
                        }
                        break;
                    }
                    case TipoPersona.Administrativo: {
                        let cursos;
                        if (Number.isNaN(datos.tipoPersona)) {
                            cursos = await prisma.curso.findMany({
                                include: {
                                    docente: true,
                                    materia: true,
                                    alumnos: true
                                }
                            });
                            respuesta.status(200).json({
                                mensaje: 'ok',
                                datos: {
                                    cursos: cursos
                                }
                            })
                        }
                        if (datos.tipoPersona === TipoPersona.Alumno) {
                            cursos = await prisma.alumno.findUnique({
                                where: {
                                    id: datos.idPersona
                                },
                                select: {
                                    cursos: true
                                }
                            });
                            respuesta.status(200).json({
                                mensaje: 'ok',
                                datos: {
                                    cursos: cursos?.cursos
                                }
                            });
                        } else if (datos.tipoPersona === TipoPersona.Docente) {
                            cursos = await prisma.curso.findMany({
                                where: {
                                    idDocente: datos.idPersona 
                                }
                            });
                            respuesta.status(200).json({
                                mensaje: 'ok',
                                datos: {
                                    cursos: cursos
                                }
                            });
                        }
                        break;
                    }
                }
            } else {
                respuesta.status(200).json({
                    mensaje: 'Su sesión ha expirado o su usuario es inexistente.'
                })
            }
        } else {
            respuesta.status(200).json({
                mensaje: 'Su sesión ha expirado o su usuario es inexistente.'
            });
        }
    }
}