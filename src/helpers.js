export function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const COOLORS = {
    'UPEN': '#e63c38', 
    'APEN': '#fb8e03',
    'PROC': '#47a34b',
    'FIN': '#04aec3',
    'WARR': '#66757F',
    'NO_WARR': '#FFFFFF'
};
export const TEXTS = {
    'UPEN': 'Pendiente sin asignar', 
    'APEN': 'Pendiente asignado',
    'PROC': 'En proceso',
    'FIN': 'Finalizado',
    'WARR': 'En Garantía',
    'NO_WARR': 'Sin Garantía'
};

export const PREV_TEXTS = {
    'UPEN': '', 
    'APEN': 'UPEN',
    'PROC': 'APEN',
    'FIN': 'PROC',
    'WARR': 'FIN',
    'NO_WARR': 'WARR'
};

export const NEXT_TEXTS = {
    'UPEN': 'APEN', 
    'APEN': 'PROC',
    'PROC': 'FIN',
    'FIN': 'WARR',
    'WARR': 'NO_WARR',
    'NO_WARR': ''
};