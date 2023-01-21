import { StylesConfig } from "react-select";

export enum TipoPersona {
    Alumno,
    Docente,
    Administrativo
}

export interface PropPersona {
    id: number;
    tipo: TipoPersona;
    nombre: string;
    primerApellido: string;
    segundoApellido?: string;
    email?: string;
    fechaNacimiento?: string;
}

export const estiloSelect: StylesConfig = {
    control: (estilosBase, estado) => ({
        ...estilosBase,
        backgroundColor: 'var(--bg-light)',
        border: 'none'
    }),
    option: (estilosBase, estado) => ({
        ...estilosBase,
        backgroundColor: estado.isFocused ? 'var(--primary)' : 'var(--bg-light-contrast)',
        color: 'var(--text)'
    }),
    singleValue: (estilosBase, estado) => ({
        ...estilosBase,
        color: 'var(--text)',
    }),
    input: (estilosBase, estado) => ({
        ...estilosBase,
        color: 'var(--text)'
    }),
    menu: (estilosBase, estado) => ({
        ...estilosBase,
        backgroundColor: 'var(--bg-light-contrast)'
    }),
    container: (estilosBase, estado) => ({
        ...estilosBase
    })
};



export const estilosTabla = {
    headRow: {
        style: {
            backgroundColor: 'var(--bg-light)',
            color: 'var(--text)'
        }
    },
    rows: {
        style: {
            backgroundColor: 'var(--bg)',
            color: 'var(--text)',
            cursor: 'pointer'
        },
        stripedStyle: {
            backgroundColor: 'var(--bg-light-contrast)',
            color: 'var(--text)'
        },
        highlightOnHoverStyle: {
            backgroundColor: 'var(--primary)',
            outline: 'none',
            borderBottom: 'none'
        }
    },
    pagination: {
        style: {
            backgroundColor: 'var(--bg)',
            color: 'var(--text)'
        },
        pageButtonsStyle: {
            color: 'var(--text)',
            '&:disabled': {
                color: 'rgba(255, 255, 255, 0.5)',
                fill: 'rgba(255, 255, 255, 0.5)'
            }
        }
    },
    noData: {
        style: {
            backgroundColor: 'var(--bg-light)',
            color: 'var(--text)'
        }
    }
}