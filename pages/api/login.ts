import { setCookie } from "cookies-next";
import { randomBytes } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { actualizarUltimoInicioUsuario } from "../../lib/comunesPrisma";
import { prisma } from "../../lib/prisma";

export default async function handler(peticion: NextApiRequest, respuesta: NextApiResponse) {
    if (peticion.method !== 'POST') {
        respuesta.status(405).json({
            mensaje: 'Sólo se permiten peticiones POST a este enlace.'
        });
    } else {
        const credenciales = peticion.body;
        const usuarioConsultado = await prisma.usuario.findUnique({
            where: {
                usuario: credenciales.usuario
            }
        });
        if (usuarioConsultado) {
            if (usuarioConsultado.password === credenciales.password) {
                actualizarUltimoInicioUsuario(usuarioConsultado.id);
                const tokenSesion = randomBytes(16);
                await prisma.sesion.create({
                    data: {
                        token: tokenSesion.toString('hex'),
                        idUsuario: usuarioConsultado.id
                    }
                });
                setCookie('token-sesion', tokenSesion.toString('hex'), {
                    req: peticion,
                    res: respuesta,
                    maxAge: 60 * 60 * 24 * 7
                });
                respuesta.status(200).json({ mensaje: 'ok', usuario: usuarioConsultado });
            } else {
                respuesta.status(200).json({ mensaje: 'error', info: 'La contraseña es incorrecta.' });
            }
        } else {
            respuesta.status(200).json({ mensaje: 'error', info: 'Usuario no encontrado.' });
        }
    }
}