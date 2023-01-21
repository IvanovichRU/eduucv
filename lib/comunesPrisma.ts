import { prisma } from "../lib/prisma";
import { TipoPersona } from "./TiposEdUCV";

export function actualizarUltimoInicioUsuario(idUsuario: number) {
    prisma.usuario.update({
        where: {
            id: idUsuario
        },
        data: {
            ultimoInicio: new Date(Date.now()).toISOString()
        }
    });
}

export async function obtenerUsuarioPorTokenSesion(token: string) {
    const sesionToken = await prisma.sesion.findFirst({
        where: {
            token: token
        }
    });
    if (sesionToken) {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: sesionToken.idUsuario
            }
        });
        return usuario;
    } else {
        return null;
    }
}

export async function obtenerPersonaPorIdUsuario(idUsuario: number) {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: idUsuario
        },
        include: {
            alumnos: true,
            docentes: true,
            administrativos: true
        }
    });
    if (usuario) {
        switch (usuario.tipoPersona) {
            case TipoPersona.Alumno: {
                return usuario.alumnos[0];
            }
            case TipoPersona.Docente: {
                return usuario.docentes[0];
            }
            case TipoPersona.Administrativo: {
                return usuario.administrativos[0];
            }
        }
    } else {
        return null;
    }
}