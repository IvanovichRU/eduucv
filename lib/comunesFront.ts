function llenar2Digitos(numero: number | string) {
    return numero.toString().padStart(2, '0');
}

export function dateAInputFecha(fecha: Date) {
    return [
        fecha.getFullYear(),
        llenar2Digitos(fecha.getMonth() + 1),
        llenar2Digitos(fecha.getDate())
    ].join('-');
}