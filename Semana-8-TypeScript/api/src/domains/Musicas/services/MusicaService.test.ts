/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryError } from "../../../../errors/QueryError";
import { Musica, MusicaInterface } from "../models/Musica";
import { MusicaService } from "./MusicaService";

jest.mock( "../models/Musica", () => ( { 
    Musica: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
} ) );

//----------------------------------------------- Teste - Função getMusicas ---------------------------------------------------//

describe( "getMusicas", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna as músicas armazenadas", async() => {
        const mockMusicas = [
            {
                id: "1",
                foto: "teste",
                titulo: "teste",
                artistaId: "teste",
                categoria: "teste",
            } as MusicaInterface,
            {
                id: "2",
                foto: "teste2",
                titulo: "teste2",
                artistaId: "teste2",
                categoria: "teste2",
            } as MusicaInterface,
        ];
        ( Musica.findAll as jest.MockedFunction< typeof Musica.findAll > ).mockResolvedValue( mockMusicas );

        const musicas = await MusicaService.getMusicas();

        expect( musicas ).toEqual( mockMusicas );
        expect( Musica.findAll ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método é chamado => Retorna um erro.", async() => {
        ( Musica.findAll as any ).mockResolvedValue( null );
        await expect( MusicaService.getMusicas() ).rejects.toThrow( new QueryError( "Nenhuma música foi encontrada!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função getMusicaId --------------------------------------------------//

describe( "getMusicaId", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna a música com o id especificado.", async() => {
        const id = "1";

        const mockMusica = {
            id: "1",
            foto: "teste",
            titulo: "teste",
            artistaId: "teste",
            categoria: "teste",
        } as MusicaInterface;
        ( Musica.findByPk as jest.MockedFunction< typeof Musica.findByPk > ).mockResolvedValue( mockMusica );

        const musica = await MusicaService.getMusicaId( id );

        expect( musica ).toEqual( mockMusica );
        expect( Musica.findByPk ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método recebe um id que não existe => Retorna erro.", async() => {
        const id = "1";
        ( Musica.findByPk as any ).mockResolvedValue( null );
        await expect( MusicaService.getMusicaId( id ) ).rejects.toThrow( new QueryError( "Nenhuma música foi encontrada com esse id!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função getMusicaTitulo ----------------------------------------------//

describe( "getMusicaTitulo", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna a música com o titulo especificado.", async() => {
        const titulo = "teste";
        const mockMusica = {
            id: "1",
            foto: "teste",
            titulo: "teste",
            artistaId: "teste",
            categoria: "teste",
        } as MusicaInterface;
        ( Musica.findOne as jest.MockedFunction< typeof Musica.findOne > ).mockResolvedValue( mockMusica );

        const musica = await MusicaService.getMusicaTitulo( titulo );

        expect( musica ).toEqual( mockMusica );
        expect( Musica.findOne ).toHaveBeenCalledTimes( 1 );
        expect( Musica.findOne ).toHaveBeenCalledWith( {
            where: { titulo: titulo, },
        } );
    } );

    test( "Método recebe um nome que não existe => Retorna erro.", async() => {
        const titulo = "";
        ( Musica.findOne as any ).mockResolvedValue( null );
        await expect( MusicaService.getMusicaTitulo( titulo ) ).rejects.toThrow( new QueryError( "Nenhuma música foi encontrada com esse nome!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função postMusica ---------------------------------------------------//

describe( "postMusica", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe dados de uma nova música => Chama o create para criar a música.", async() => {
        const mockCreateMusica = {
            foto: "teste",
            titulo: "teste",
            artistaId: "teste",
            categoria: "teste",
        } as MusicaInterface;
        ( Musica.create as jest.MockedFunction< typeof Musica.create > ).mockResolvedValue( {} );

        await MusicaService.postMusica( mockCreateMusica );

        expect( Musica.create ).toHaveBeenCalledTimes( 1 );
        expect( Musica.create ).toHaveBeenCalledWith( mockCreateMusica );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função putMusica ----------------------------------------------------//

describe( "putMusica", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id e um objeto com informações => Atualiza a música daquele id com as informações do objeto.", async() => {
        const id = "1";

        const mockUpdateMusica = {
            foto: "atualizacao_teste",
            titulo: "atualizacao_teste",
            artistaId: "atualizacao_teste",
            categoria: "atualizacao_teste",
        } as MusicaInterface;

        const musica = {
            id: "1",
            foto: "teste",
            titulo: "teste",
            artistaId: "teste",
            categoria: "teste",
            update: jest.fn(),
        };
        ( Musica.findByPk as any ).mockResolvedValue( musica );
        ( Musica.update as any ).mockResolvedValue( {} );

        await MusicaService.putMusica( id, mockUpdateMusica );

        expect( Musica.findByPk ).toHaveBeenCalledWith( id );
        expect( musica.update ).toHaveBeenCalledWith( mockUpdateMusica );
        expect( musica.update ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função deleteMusica -------------------------------------------------//

describe( "deleteMusica", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id => Destrói objeto referente ao id passado.", async() => {
        const id = "1";

        const musica = {
            id: "1",
            foto: "teste",
            titulo: "teste",
            artistaId: "teste",
            categoria: "teste",
            destroy: jest.fn(),
        };
        ( Musica.findByPk as any ).mockResolvedValue( musica );
        ( Musica.destroy as any ).mockResolvedValue( {} );

        await MusicaService.deleteMusica( id );

        expect( Musica.findByPk ).toHaveBeenCalledWith( id );
        expect( musica.destroy ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//