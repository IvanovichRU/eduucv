import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(peticion: NextApiRequest, respuesta: NextApiResponse) {
    if (peticion.method !== 'GET') {
        respuesta.status(405).json({
            mensaje: 'Sólo se permiten peticiones GET a este enlace.'
        });
    } else {
        const datos = peticion.body;
        respuesta.status(200).json({
            mensaje: 'ok'
        });
    }
}