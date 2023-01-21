import { prisma } from "../../lib/prisma";
import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { TipoPersona } from "../../lib/TiposEdUCV";
import { obtenerUsuarioPorTokenSesion } from "../../lib/comunesPrisma";

export default async function handler(peticion: NextApiRequest, respuesta: NextApiResponse) {

    // Manejamos las peticiones tipo POST, para crear o actualizar un curso.
    if (peticion.method === 'POST') {

        // Verificamos que el cliente tenga una sesión iniciada.
        const token = getCookie('token-sesion', {
            req: peticion,
            res: respuesta
        });

        // Si sí existe una sesión de este cliente:
        if (token) {

            // Obtenemos el usuario correspondiente a la sesión del cliente.
            const usuario = await obtenerUsuarioPorTokenSesion(token.toString());

            // Si el usuario existe y es un administrativo:
            if (usuario && usuario.tipoPersona === TipoPersona.Administrativo) {

                // Leemos los parámetros enviados en la petición.
                const parametros = JSON.parse(peticion.body);

                // Si el parámetro idAlumno existe, haremos una actualización:
                if (parametros.idAlumno) {

                    // Actualizamos el alumno mediante prisma.
                    const alumnoActualizado = await prisma.alumno.update({
                        where: {
                            id: parametros.idAlumno
                        },
                        data: {
                            nombre: parametros.nombre,
                            primerApellido: parametros.primerApellido,
                            segundoApellido: parametros.segundoApellido,
                            email: parametros.email,
                            fechaNacimiento: new Date(parametros.fechaNacimiento),
                            semestre: parametros.semestre
                        }
                    });

                    // Si la actualización fue exitosa:
                    if (alumnoActualizado) {

                        // Respondemos con ok.
                        respuesta.status(200).json({
                            mensaje: 'ok'
                        });
                    
                    // De lo contrario:
                    } else {

                        // Respondemos con mensaje de error.
                        respuesta.status(200).json({
                            mensaje: 'Hubo un error al crear el nuevo alumno.'
                        });
                    }

                // Si el parámetro idCurso no existe, haremos una creación.
                } else {

                    // Creamos un nuevo usuario para el alumno.
                    const nuevoUsuario = await prisma.usuario.create({
                        data: {
                            usuario: parametros.usuario,
                            password: parametros.password,
                            tipoPersona: TipoPersona.Alumno
                        }
                    });

                    // Creamos el nuevo alumno.
                    const nuevoAlumno = await prisma.alumno.create({
                        data: {
                            nombre: parametros.nombre,
                            primerApellido: parametros.primerApellido,
                            segundoApellido: parametros.segundoApellido,
                            email: parametros.email,
                            fechaNacimiento: new Date(parametros.fechaNacimiento),
                            semestre: parametros.semestre,
                            idUsuario: nuevoUsuario.id
                        }
                    });

                    // Si la creación fue exitosa:
                    if (nuevoAlumno) {

                        // Respondemos con ok.
                        respuesta.status(200).json({
                            mensaje: 'ok'
                        });

                    // Si la creación no fue exitosa:
                    } else {

                        // Respondemos con un mensaje de error.
                        respuesta.status(200).json({
                            mensaje: 'Hubo un error al crear el nuevo alumno.'
                        });
                    }
                }

            // Si el usuario no existe o no es administrativo:
            } else {

                // Repondemos con mensaje adecuado.
                respuesta.status(200).json({
                    mensaje: 'No tiene permisos para crear alumnos.'
                });
            }

        // Si no existe sesión de este cliente:
        } else {

            // Respondemos con mensaje adecuado.
            respuesta.status(200).json({
                mensaje: 'No ha iniciado sesión.'
            });
        }

    // Manejamos las peticiones tipo GET, para obtener información de un curso.
    } else if (peticion.method === 'GET') {
        
    }
}