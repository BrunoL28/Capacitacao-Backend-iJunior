/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryError } from "../../../../errors/QueryError";
import { Artista, ArtistaInterface } from "../models/Artista";
import { ArtistaService } from "./ArtistaService";

jest.mock( "../models/Artista", () => ( { 
    Artista: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
} ) );

//----------------------------------------------- Teste - Função getArtistas ------------------------------------------------//

describe( "getArtistas", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna os artistas armazenados.", async() => {
        const mockArtistas = [
            {
                id: "1",
                nome: "teste",
                nacionalidade: "teste",
                foto: "teste",
            } as ArtistaInterface,
            {
                id: "2",
                nome: "teste2",
                nacionalidade: "teste2",
                foto: "teste2",
            } as ArtistaInterface,
        ];
        ( Artista.findAll as jest.MockedFunction< typeof Artista.findAll > ).mockResolvedValue( mockArtistas );

        const artistas = await ArtistaService.getArtistas();

        expect( artistas ).toEqual( mockArtistas );
        expect( Artista.findAll ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método é chamado => Retorna um erro.", async() => {
        ( Artista.findAll as any ).mockResolvedValue( null );
        await expect( ArtistaService.getArtistas() ).rejects.toThrow( new QueryError( "Nenhum artista foi encontrado!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função getArtistaId ------------------------------------------------//

describe( "getArtistaId", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna o artista com o id especificado.", async() => {
        const id = "1";
        const mockArtista = {
            id: "1",
            nome: "teste",
            nacionalidade: "teste",
            foto: "teste",
        } as ArtistaInterface;
        ( Artista.findByPk as jest.MockedFunction< typeof Artista.findByPk > ).mockResolvedValue( mockArtista );

        const artista = await ArtistaService.getArtistaId( id );

        expect( artista ).toEqual( mockArtista );
        expect( Artista.findByPk ).toHaveBeenCalledTimes( 1 );

    } );

    test( "Método recebe um id que não existe => Retorna Erro.", async() => {
        const id = "1";
        ( Artista.findByPk as any ).mockResolvedValue( null );
        await expect( ArtistaService.getArtistaId( id ) ).rejects.toThrow( new QueryError( "Nenhum artista foi encontrado com esse id!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função getArtistaNome ----------------------------------------------//

describe( "getArtistaNome", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna o artista com o nome especificado.", async() => {
        const nome = "teste";
        const mockArtista = {
            id: "1",
            nome: "teste",
            nacionalidade: "teste",
            foto: "teste",
        } as ArtistaInterface;
        ( Artista.findOne as jest.MockedFunction< typeof Artista.findOne > ).mockResolvedValue( mockArtista );

        const artista = await ArtistaService.getArtistaNome( nome );

        expect( artista ).toEqual( mockArtista );
        expect( Artista.findOne ).toHaveBeenCalledTimes( 1 );
        expect( Artista.findOne ).toHaveBeenCalledWith( { 
            where: { nome: nome, },
        } );
    } );

    test( "Método recebe um nome que não existe => Retorna Erro.", async() => {
        const nome = "";
        ( Artista.findOne as any ).mockResolvedValue( null );
        await expect( ArtistaService.getArtistaNome( nome ) ).rejects.toThrow( new QueryError( "Nenhum artista foi encontrado com esse nome!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função postArtista --------------------------------------------------//

describe( "postArtista", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe dados de um novo artista => Chama o create para criar o artista.", async() => {
        const mockCreateArtista = {
            nome: "teste",
            nacionalidade: "teste",
            foto: "teste",
        } as ArtistaInterface;
        ( Artista.create as jest.MockedFunction< typeof Artista.create > ).mockResolvedValue( {} );

        await ArtistaService.postArtista( mockCreateArtista );

        expect( Artista.create ).toHaveBeenCalledTimes( 1 );
        expect( Artista.create ).toHaveBeenCalledWith( mockCreateArtista );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função putArtista ---------------------------------------------------//

describe( "putArtista", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id e um objeto com informações => Atualiza o artista daquele id com as informações do objeto.", async() => {
        const id = "1";

        const mockUpdateArtista = {
            nome: "atualizacao_teste",
            nacionalidade: "atualizacao_teste",
            foto: "atualizacao_teste",
        } as ArtistaInterface;

        const artista = {
            id: "1",
            nome: "teste",
            nacionalidade: "teste",
            foto: "teste",
            update: jest.fn(),
        };
        ( Artista.findByPk as any).mockResolvedValue( artista );
        ( Artista.update as any ).mockResolvedValue( {} );

        await ArtistaService.putArtista( id, mockUpdateArtista );

        expect( Artista.findByPk ).toHaveBeenCalledWith( id );
        expect( artista.update ).toHaveBeenCalledWith( mockUpdateArtista );
        expect( artista.update ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//----------------------------------------------- Teste - Função deleteArtista ------------------------------------------------//

describe( "deleteArtista", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id => Destrói o objeto referente ao id passado.", async() => {
        const id = "1";

        const artista = {
            id: "1",
            nome: "teste",
            nacionalidade: "teste",
            foto: "teste",
            destroy: jest.fn(),
        };

        ( Artista.findByPk as any).mockResolvedValue( artista );
        ( Artista.destroy as any ).mockResolvedValue( {} );

        await ArtistaService.deleteArtista( id );

        expect( Artista.findByPk ).toHaveBeenCalledWith( id );
        expect( artista.destroy ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//