import { getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { obtenerUsuarioPorTokenSesion } from "../../lib/comunesPrisma";
import { TipoPersona } from "../../lib/TiposEdUCV";
import { prisma } from '../../lib/prisma';

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
            const usuarioSesionPeticion = await obtenerUsuarioPorTokenSesion(token.toString());
            if (usuarioSesionPeticion && usuarioSesionPeticion.tipoPersona === TipoPersona.Administrativo) {
                const materias = await prisma.materia.findMany();
                respuesta.status(200).json({
                    mensaje: 'ok',
                    datos: {
                        materias
                    }
                });
            } else {
                respuesta.status(200).json({
                    mensaje: 'Su sesión ha expirado o su usuario es inexistente.'
                });
            }
        } else {
            respuesta.status(200).json({
                mensaje: 'Su sesión ha expirado o su usuario es inexistente.'
            });
        }
    }
}