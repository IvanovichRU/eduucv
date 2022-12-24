import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(pet: NextApiRequest, res: NextApiResponse) {
    if (pet.method !== 'POST') {
        res.status(405).send({
            mensaje: 'Sólo se permiten peticiones POST a este enlace.'
        });
    } else {
        const parametros = pet;
        console.log(parametros);
        res.status(200).json({mensaje: 'ok'});
    }
}