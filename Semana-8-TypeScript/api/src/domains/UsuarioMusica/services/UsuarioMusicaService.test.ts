/* eslint-disable @typescript-eslint/no-explicit-any */
import { Musica } from "../../Musicas/models/Musica";
import { Usuario } from "../../Usuarios/models/Usuario";
import { UsuarioMusica } from "../models/UsuarioMusica";
import { UsuarioMusicaService } from "./UsuarioMusicaService";

jest.mock( "../models/UsuarioMusica", () => ( {
    UsuarioMusica: {
        findAll: jest.fn(),
        create: jest.fn(),
        destroy: jest.fn(),
    },
} ) );

jest.mock( "../../Usuarios/models/Usuario", () => ( {
    Usuario: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
} ) );

jest.mock( "../../Musicas/models/Musica", () => ( {
    Musica: {
        findAll: jest.fn(),
        findByPk: jest.fn(),
    }
} ) );

//------------------------------------ Teste - Função getMusicaComUsuario -----------------------------------------------------//

describe( "getMusicaComUsuario", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe o id de um usuário => Busca todas as músicas atreladas à esse usuário.", async() => {
        const idUsuario = "1";

        const mockUsuarioMusica = [
            {
                id: "2",
                foto: "teste",
                titulo: "teste",
                artistaId: "teste",
                categoria: "teste",
                Usuarios: [
                    {
                        id: "1",
                    },
                ],
            },
        ];
        ( Musica.findAll as any ).mockResolvedValue( mockUsuarioMusica );

        const usuarioMusica = await UsuarioMusicaService.getMusicaComUsuario( idUsuario );

        expect( usuarioMusica ).toEqual( mockUsuarioMusica );
        expect( Musica.findAll ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------ Teste - Função getUsuarioComMusica -----------------------------------------------------//

describe( "getUsuarioComMusica", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe o id de uma música => Busca todos os usuários atrelados à essa música.", async() => {
        const idMusica = "1";

        const mockUsuarioMusica = [
            {
                id: "2",
                nome: "teste",
                email: "teste.teste@outlook.com",
                cargo: "user",
                categoria: "sertanejo",
                Musicas: [
                    {
                        id: "1",
                    },
                ],
            },
        ];
        ( Usuario.findAll as any ).mockResolvedValue( mockUsuarioMusica );

        const usuarioMusica = await UsuarioMusicaService.getUsuarioComMusica( idMusica );

        expect( usuarioMusica ).toEqual( mockUsuarioMusica );
        expect( Usuario.findAll ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------ Teste - Função postUsuarioMusica -------------------------------------------------------//

describe( "postUsuarioMusica", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id de usuário e um id de música => Cria relacionamento entre os dois.", async() => {
        const idMusica = "1";
        const idUsuario = "1";

        ( Usuario.findByPk as any ).mockResolvedValue( {} );
        ( Musica.findByPk as any ).mockResolvedValue( {} );

        ( UsuarioMusica.create as jest.MockedFunction< typeof UsuarioMusica.create > ).mockResolvedValue( {} );

        await UsuarioMusicaService.postUsuarioMusica( idMusica, idUsuario );

        expect( UsuarioMusica.create ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------ Teste - Função deleteUsuarioMusica -----------------------------------------------------//

describe( "deleteUsuarioMusica", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id de usuário e um id de música => Destrói objeto referente ao id passado.", async() => {
        const idMusica = "1";
        const idUsuario = "1";

        ( Musica.findByPk as any ).mockResolvedValue( {
            id: idMusica,
        } );
        ( Usuario.findByPk as any ).mockResolvedValue( {
            id: idUsuario,
        } );

        ( UsuarioMusica.destroy as any ).mockResolvedValue( {} );

        await UsuarioMusicaService.deleteUsuarioMusica( idMusica, idUsuario );

        expect( Musica.findByPk ).toHaveBeenCalledTimes( 1 );
        expect( Usuario.findByPk ).toHaveBeenCalledTimes( 1 );
        expect( UsuarioMusica.destroy ).toHaveBeenCalledWith( { where: { idMusica, idUsuario } } );
        expect( UsuarioMusica.destroy ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//