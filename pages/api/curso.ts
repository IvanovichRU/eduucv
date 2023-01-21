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

                // Si el parámetro idCurso existe, haremos una actualización:
                if (parametros.idCurso) {

                    // Actualizamos el curso mediante prisma.
                    const cursoActualizado = await prisma.curso.update({
                        where: {
                            id: parametros.idCurso
                        },
                        data: {
                            idMateria: parametros.idMateria,
                            idDocente: parametros.idDocente,
                            fechaInicio: new Date(parametros.fechaInicio),
                            fechaFinal: new Date(parametros.fechaFinal)
                        }
                    });

                    // Si la actualización fue exitosa:
                    if (cursoActualizado) {

                        // Respondemos con ok.
                        respuesta.status(200).json({
                            mensaje: 'ok'
                        });
                    
                    // De lo contrario:
                    } else {

                        // Respondemos con mensaje de error.
                        respuesta.status(200).json({
                            mensaje: 'Hubo un error al crear el nuevo curso.'
                        });
                    }

                // Si el parámetro idCurso no existe, haremos una creación.
                } else {

                    // Creamos el nuevo curso.
                    const nuevoCurso = await prisma.curso.create({
                        data: {
                            idMateria: parametros.idMateria,
                            idDocente: parametros.idDocente,
                            fechaInicio: new Date(parametros.fechaInicio),
                            fechaFinal: new Date(parametros.fechaFinal)
                        }
                    });

                    // Si la creación fue exitosa:
                    if (nuevoCurso) {

                        // Respondemos con ok.
                        respuesta.status(200).json({
                            mensaje: 'ok'
                        });

                    // Si la creación no fue exitosa:
                    } else {

                        // Respondemos con un mensaje de error.
                        respuesta.status(200).json({
                            mensaje: 'Hubo un error al crear el nuevo curso.'
                        });
                    }
                }

            // Si el usuario no existe o no es administrativo:
            } else {

                // Repondemos con mensaje adecuado.
                respuesta.status(200).json({
                    mensaje: 'No tiene permisos para crear cursos.'
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