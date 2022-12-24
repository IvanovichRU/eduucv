import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(pet: NextApiRequest, res: NextApiResponse) {
    if (pet.method === 'POST') {
        const alumno = await prisma.alumno.create({
            data: {
                nombre: 'Kevin',
                primerApellido: 'Domínguez',
                segundoApellido: 'Jiménez'
            }
        });
        res.status(200).json(alumno);
    }
    res.status(200).json({resultado: 'fallo'});
}