import { deleteCookie, getCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../lib/prisma';

export default async function handler(peticion: NextApiRequest, respuesta: NextApiResponse) {
    if (peticion.method !== 'POST') {
        respuesta.status(405).json({
            mensaje: 'Sólo se permiten peticiones POST a este enlace.'
        });
    } else {
        const cookieSesion = getCookie('token-sesion', {
            req: peticion,
            res: respuesta
        });
        if (cookieSesion) {
            const idSesion = (await prisma.sesion.findFirst({
                where: {
                    token: cookieSesion.toString()
                },
                select: {
                    id: true
                }
            }))?.id;
            if (idSesion) {
                await prisma.sesion.delete({
                    where: {
                        id: idSesion
                    }
                });
                deleteCookie('token-sesion', {
                    req: peticion,
                    res: respuesta
                });
                respuesta.status(200).json({
                    mensaje: 'ok'
                });
            }
        } else {
            respuesta.status(200).json({
                mensaje: 'La sesión para su token no fue encontrada.'
            });
        }
    }
}