import { getCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { obtenerUsuarioPorTokenSesion } from "../../lib/comunesPrisma";
import { prisma } from "../../lib/prisma";
import { TipoPersona } from "../../lib/TiposEdUCV";

export default async function handler(peticion: NextApiRequest, respuesta: NextApiResponse) {
    if (peticion.method !== 'GET') {
        respuesta.status(405).json({
            mensaje: 'Sólo se permiten peticiones GET a este enlace.'
        });
    } else {
        const token = getCookie('token-sesion', {
            req: peticion,
            res: respuesta
        });
        if (token) {
            const usuario = await obtenerUsuarioPorTokenSesion(token.toString());
            if (usuario && usuario.tipoPersona === TipoPersona.Administrativo) {
                const alumnos = await prisma.alumno.findMany({
                    include: {
                        cursos: true,
                        usuario: true
                    }
                });
                respuesta.status(200).json({
                    mensaje: 'ok',
                    datos: {
                        alumnos: alumnos
                    }
                });
            } else {
                respuesta.status(200).json({
                    mensaje: 'No tiene permiso para consultar la lista de alumnos.'
                });
            }
        } else {
            respuesta.status(200).json({
                mensaje: 'No ha iniciado sesión.'
            });
        }
    }
}