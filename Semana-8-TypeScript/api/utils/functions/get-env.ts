export function getEnv( nome: string ) : string{
    const value = process.env[ nome ];
    if ( !value ) {
        throw new Error( `Está faltando: process.env['${nome}'].` );
    }
    return value;
}