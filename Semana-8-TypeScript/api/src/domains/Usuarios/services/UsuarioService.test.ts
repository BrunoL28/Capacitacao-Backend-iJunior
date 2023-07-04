/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import { NotAuthorizedError } from "../../../../errors/NotAuthorizedError";
import { PermissionError } from "../../../../errors/PermissionError";
import { QueryError } from "../../../../errors/QueryError";
import { Usuario, UsuarioInterface } from "../models/Usuario";
import { UsuarioService } from "./UsuarioService";

jest.mock( "../models/Usuario", () => ( {
    Usuario: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn(),
    },
} ) );

//------------------------------------- Teste - Função encryptPassword --------------------------------------------------------//

describe( "encryptPassword", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe uma senha => Utiliza o algoritmo hash e a retorna criptografada.", async() => {

        const mockHash = jest.spyOn( bcrypt, "hash" );

        const senha = "myPassword";

        mockHash.mockImplementation( () => "myPasswordTest" );

        const encoded = await UsuarioService.encryptPassword( senha );

        expect( encoded ).toEqual( "myPasswordTest" );
        expect( bcrypt.hash ).toHaveBeenCalledWith( senha, 10 );
        expect( bcrypt.hash ).toHaveBeenCalledTimes( 1 );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------- Teste - Função getUsuarios ------------------------------------------------------------//

describe( "getUsuarios", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método é chamado => Retorna os usuários armazenados.", async() => {
        const mockUsuarios = [
            {
                id: "1",
                nome: "teste",
                email: "teste.teste@teste.com.br",
                cargo: "user",
            } as UsuarioInterface,
            {
                id: "2",
                nome: "teste2",
                email: "teste2.teste@teste.com.br",
                cargo: "user",
            } as UsuarioInterface,
        ];
        ( Usuario.findAll as jest.MockedFunction< typeof Usuario.findAll > ).mockResolvedValue( mockUsuarios );

        const usuarios = await UsuarioService.getUsuarios();

        expect( usuarios ).toEqual( mockUsuarios );
        expect( Usuario.findAll ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método é chamado => Não encontra nenhum usuário cadastrado e retorna erro.", async() => {
        ( Usuario.findAll as any ).mockResolvedValue( null );
        await expect( UsuarioService.getUsuarios() ).rejects.toThrow( new QueryError( "Nenhum usuário foi encontrado!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------- Teste - Função getUsuarioId -----------------------------------------------------------//

describe( "getUsuarioId", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id => Retorna o usuário com o id em questão.", async() => {
        const id = "1";

        const mockUsuario = {
            id: "1",
            nome: "teste",
            email: "teste.teste@teste.com.br",
            cargo: "user",
            senha: "myPassword",
            createdAt: new Date(),
            updatedAt: new Date(),
        } as UsuarioInterface;
        ( Usuario.findByPk as jest.MockedFunction< typeof Usuario.findByPk > ).mockResolvedValue( mockUsuario );

        const usuario = await UsuarioService.getUsuarioId( id );

        expect( usuario ).toEqual( mockUsuario );
        expect( Usuario.findByPk ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método é chamado com um id que não existe => Retorna erro.", async() => {
        const id = "1";
        ( Usuario.findByPk as jest.MockedFunction< typeof Usuario.findByPk > ).mockResolvedValue( null );
        await expect( UsuarioService.getUsuarioId( id ) ).rejects.toThrow( new QueryError( "Nenhum usuário foi encontrado com esse id!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------- Teste - Função postUsuario ------------------------------------------------------------//

describe( "postUsuarios", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe dados de um novo usuário => Chama o create para criar o novo usuário.", async() => {
        const mockBodyUsuario = {
            nome: "teste",
            email: "",
            cargo: "user",
            senha: "myPassword",
        } as UsuarioInterface;

        const mockPostUsuario = {
            nome: "teste",
            email: "",
            cargo: "user",
            senha: "myPasswordTest",
        } as UsuarioInterface;

        const mockHash = jest.spyOn( bcrypt, "hash" );

        mockHash.mockImplementation( () => "myPasswordTest" );

        ( Usuario.create as jest.MockedFunction< typeof Usuario.create > ).mockResolvedValue( {} );

        await UsuarioService.postUsuario( mockBodyUsuario );

        expect( Usuario.create ).toHaveBeenCalledWith( mockPostUsuario );
        expect( Usuario.create ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método recebe a requisição de criação de um usuário como administrador => Retorna erro.", async() => {
        const mockUsuario = {
            nome: "teste",
            email: "",
            senha: "myPasswordTest",
            cargo: "admin",
        } as UsuarioInterface;
        await expect( UsuarioService.postUsuario( mockUsuario ) ).rejects.toThrow( new PermissionError( "Não é possível criar um usuário com o cargo de admin!" ) );
    } );

    test( "Método recebe usuário com e-mail já cadastrado na base de dados => Retorna erro.", async() => {
        const mockUsuario = {
            nome: "teste",
            email: "teste.teste@teste.com.br",
            senha: "myPasswordTest",
            cargo: "user",
        } as UsuarioInterface;
        ( Usuario.findOne as jest.MockedFunction< typeof Usuario.findOne > ).mockResolvedValue( mockUsuario );
        await expect( UsuarioService.postUsuario( mockUsuario ) ).rejects.toThrow( new QueryError( "Esse e-mail já está em nossa base de dados!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------- Teste - Função putUsuario -------------------------------------------------------------//

describe( "putUsuario", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id, um objeto com informações e um usuário logado => Atualiza o usuário do id com as informações.", async() => {
        const id = "1";

        const usuarioLogado = {
            id: "1",
            nome: "teste",
            email: "teste.teste@teste.com.br",
            cargo: "user",
        };

        const mockBody = {
            nome: "teste2",
            email: "teste2.teste@teste.com.br",
            senha: "myAtualPassword",
        } as UsuarioInterface;

        const usuario = {
            id: "1",
            nome: "teste",
            email: "teste.teste@teste.com.br",
            cargo: "user",
            senha: "myPassword",
            createdAt: new Date(),
            updatedAt: new Date(),
            update: jest.fn(),
        };  

        const mockHash = jest.spyOn( bcrypt, "hash" );

        mockHash.mockImplementation( () => "myPasswordHashed" );

        ( Usuario.findByPk as any ).mockResolvedValue( usuario );
        ( usuario.update as any ).mockResolvedValue( {} );
        await UsuarioService.putUsuario( id, mockBody, usuarioLogado );

        expect( Usuario.findByPk ).toHaveBeenCalledTimes( 1 );
        expect( usuario.update ).toHaveBeenCalledWith( mockBody );
        expect( usuario.update ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método recebe um objeto com senha => Criptografa a senha.", async() => {
        const id = "1";

        const usuarioLogado = {
            id: "1",
            nome: "teste",
            email: "",
            cargo: "user"
        };

        const mockBody = {
            senha: "myPassword",
        } as UsuarioInterface;

        const usuario = {
            id: "1",
            nome: "teste",
            email: "",
            cargo: "user",
            senha: "myPassword",
            createdAt: new Date(),
            updatedAt: new Date(),
            update: jest.fn(),
        };

        const mockHash = jest.spyOn( bcrypt, "hash" );
        mockHash.mockImplementation( () => "myPasswordHashed" );

        ( Usuario.findByPk as any ).mockResolvedValue( usuario );
        ( Usuario.update as any ).mockResolvedValue( {} );

        await UsuarioService.putUsuario( id, mockBody, usuarioLogado );

        expect( mockHash ).toHaveBeenCalledTimes( 1 );
        expect( mockBody.senha ).toEqual( "myPasswordHashed" );
    } );

    test( "Método recebe um usuário logado que não é administrador tentando alterar outro usuário => Retorna erro.", async() => {
        const id = "1";

        const usuarioLogado = {
            id: "2",
            nome: "teste",
            email: "",
            cargo: "user",
        };

        const mockUsuario = {} as UsuarioInterface;

        await expect( UsuarioService.putUsuario( id, mockUsuario, usuarioLogado) ).rejects.toThrow( new NotAuthorizedError( "Você não possui permissão suficiente para editar outro usuário!" ) );
    } );

    test( "Método recebe usuário que não é administrador tentando editar seu cargo => Retorna erro.", async() => {
        const id = "1";

        const usuarioLogado = {
            id: "1",
            nome: "teste",
            email: "",
            cargo: "user",
        };

        const mockUsuario = {
            nome: "",
            email: "",
            senha: "",
            cargo: "admin",
        } as UsuarioInterface;

        await expect( UsuarioService.putUsuario( id, mockUsuario, usuarioLogado ) ).rejects.toThrow( new NotAuthorizedError( "Você não pode editar seu próprio usuário!" ) );
    } );
} );

//-----------------------------------------------------------------------------------------------------------------------------//

//------------------------------------- Teste - Função deleteUsuario ----------------------------------------------------------//

describe( "deleteUsuario", () => {
    beforeEach( () => {
        jest.resetAllMocks();
        jest.clearAllMocks();
    } );

    test( "Método recebe um id => Destrói o objeto referente ao id passado.", async() => {
        const id = "1";
        const logged_id = "2";

        const mockUsuario = {
            id: "1",
            nome: "teste",
            email: "",
            senha: "",
            cargo: "",
            createdAt: new Date(),
            updatedAt: new Date(),
            destroy: jest.fn(),
        };
        ( Usuario.findByPk as any ).mockResolvedValue( mockUsuario );

        await UsuarioService.deleteUsuario( id, logged_id );

        expect( Usuario.findByPk ).toHaveBeenCalledTimes( 1 );
        expect( mockUsuario.destroy ).toHaveBeenCalledTimes( 1 );
    } );

    test( "Método recebe requisição de usuário tentando se auto-deletar => Retorna erro.", async() => {
        const id = "1";
        const logged_id = "1";

        await expect( UsuarioService.deleteUsuario( id, logged_id ) ).rejects.toThrow( new PermissionError( "Você não pode deletar seu próprio usuário!" ) );
    });
} );

//-----------------------------------------------------------------------------------------------------------------------------//