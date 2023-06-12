import { Attributes } from 'sequelize';
import { InvalidParamError } from '../../../../errors/InvalidParamError';
import { QueryError } from '../../../../errors/QueryError';
import { Musica, MusicaInterface } from '../models/Musica';

class MusicaServiceClass {

    /**
     * Função que retorna todas as músicas existentes.
     * @returns Musica
     */

    async retorno() {
        const musicas = await Musica.findAll();
        if (musicas.length === 0 ) {
            throw new QueryError('Nenhuma música encontrada');
        }
        return musicas;
    }

    /**
     * Função que verifica se uma música já existe checando seu título.
     * @param body 
     * @returns boolean
     */

    async verificacao(body: Attributes<MusicaInterface>) : Promise<boolean> {
        let check = false;
        const musica = await Musica.findOne({ where: { titulo: body.titulo }});
        if (musica) {
            check = true;
        } else {
            check = false;
        }
        return check;
    }

    /**
     * Função responsável por criar uma música, se ela não existir e se seus atributos estiverem todos preenchidos.
     * @param body 
     */

    async criacao(body: Attributes<MusicaInterface>) {
        if (body.foto === '' || body.titulo === '' || body.artistaId === '' || body.categoria === '') {
            throw new QueryError('Informações de música incompletas');
        }

        if (await this.verificacao(body) === true) {
            throw new InvalidParamError('Essa música já existe');
        }

        const musica = {
            foto: body.foto,
            titulo: body.titulo,
            artistaId: body.artistaId,
            categoria: body.categoria,
        };

        await Musica.create(musica);
    }

    /**
     * Função que encontra uma música por seu id.
     * @param id 
     * @returns Musica
     */

    async encontrar(id: string) : Promise<MusicaInterface> {
        const musica = await Musica.findByPk(id);
        if (!musica) {
            throw new QueryError('Artista não foi encontrado!');
        }
        return musica;
    }

    /**
     * Função que recebe como parâmetro um id, busca a música referente ao id e substitui informações
     * dessa música pelas informações passadas no segundo parâmetro.
     * @param id 
     * @param att_musica 
     * @returns Musica
     */

    async atualizar(id: string, att_musica: Attributes<MusicaInterface>) {
        const musica = await this.encontrar(id);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma Música Encontrada!');
        }
        if (att_musica.foto === '' || att_musica.titulo === '' || att_musica.artistaId === '' || att_musica.categoria === '') {
            throw new QueryError('Informações de música incompletas!');
        }
        const musicaAtualizada = await Musica.update(att_musica, { where: { id: id }});
        return musicaAtualizada;
    }

    /**
     * Função que deleta uma música pelo seu id.
     * @param id 
     */

    async deletar(id: string) {
        const musica = await this.encontrar(id);
        if (musica === null) {
            throw new InvalidParamError('Nenhuma Música foi encontrada!');
        }
        await musica.destroy();
    }

}

export const MusicaService = new MusicaServiceClass();