/*Esse será um sistema de gerenciamento de turmas, que contará com uma classe Curso, que representa o curso no qual aquele aluno irá se formar,
uma classe matrícula, que fará o cadastro de um aluno em uma turma, que por sua vez armazenará informações de alunos, professores. Por fim, 
teremos a classe aluno, que contém as informações de alguém que está cursando a faculdade e se cadastra em uma turma.*/

class Curso {
    constructor ( nome, sigla_materia ) {
        this.nome = nome;
        this.sigla_materia = sigla_materia;
    }
}

class Matricula {
    constructor ( turma, aluno ) {
        this.turma = turma;
        this.aluno = aluno;
    }
}
class Turma {
    constructor ( nome, curso, professor, codigo ) {
        this.nome = nome;
        this.curso = curso;
        this.professor = professor;
        this.codigo = codigo;
        this.alunos = [];
    }

    adicionarAluno ( aluno ) {
        this.alunos.push( aluno );
    }

    removerAluno ( matricula ) {
        this.alunos = this.alunos.filter( aluno => aluno.matricula !== matricula);
    }
}

class Aluno {
    constructor ( nome, matricula, cpf, data_de_nascimento ) {
        this.nome = nome;
        this.matricula = matricula;
        this.cpf = cpf;
        this.data_de_nascimento = data_de_nascimento;
        this.matriculas = [];
    }

    adicionarMatricula ( matricula ) {
        this.matriculas.push( matricula );
    }

    removerMatricula ( matricula ) {
        this.matriculas = this.matriculas.filter( mat => mat.turma.codigo !== matricula.turma.codigo );
    }

    listarAluno () {
        console.log(`Nome: ${this.nome}`);
        console.log(`CPF: ${this.cpf}`);
        console.log(`Data de Nascimento: ${this.dataNascimento}`);
        console.log(`Matrícula: ${this.matricula}`);
        console.log('Matrículas:');
        this.matriculas.forEach( matricula => {
          console.log(`Turma: ${matricula.turma.nome} (${matricula.turma.codigo})`);
          console.log(`Curso: ${matricula.turma.curso.nome} (${matricula.turma.curso.sigla_materia})`);
          console.log(`Professor: ${matricula.turma.professor}`);
        });
      }
}

//Testando código

const curso = new Curso ( 'Engenharia de Sistemas', 'ENGSIS' );
const turma = new Turma ( 'Cálculo 1 - 2022/1', curso, 'Nikolai', 'TF' );
const aluno = new Aluno ( 'Bruno Lima Soares', '1234567890', '123.456.789-00', '28012003' );
const matricula = new Matricula ( turma, aluno );

turma.adicionarAluno ( aluno );
aluno.adicionarMatricula ( matricula );
console.log( "Antes da Remoção de Matrícula: " );
aluno.listarAluno ();
console.log( "Depois da Remoção de Matrícula: " );
aluno.removerMatricula ( matricula );
aluno.listarAluno ();