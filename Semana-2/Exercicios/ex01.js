//Criem uma função que receba uma string como parâmetro e retorne verdadeiro caso ela seja um palíndromo e falso caso contrário.

function eh_palindromo( string ) {
    let texto = string.toLowerCase();
    let texto_reverso = texto.split("").reverse().join(""); //split separa os caracteres da string em um array, reverse reverte a ordem desse array, join junta novamente em uma string

    if (texto.length == 0) {
        console.log("Nao recebi texto");
        return false;
    }

    if ( texto.length == 1) {
        console.log("Qualquer palavra de apenas uma letra eh um palindromo!");
        return true;
    }

    if ( texto === texto_reverso) {
        console.log("Eh palindromo");
        return true;
    } else {
        console.log("Nao eh palindromo");
        return false;
    }

} 

//Criem uma função que receba uma lista de números e retorne os dois maiores números da lista.

function eh_maior( list ) {
    let primeiro = 0;
    let segundo = 0;
    for ( let i = 0; i < list.length; i++ ) {
        const aux = list[i];
        if ( aux > primeiro ) {
            segundo = primeiro;
            primeiro = aux;
        } else if ( aux > segundo ) {
            segundo = aux;
        }
    }
    return [ primeiro, segundo ];
}

let lista = [1, 5, 12, 46, 78, 89, 100, 0.5];
const teste = eh_maior(lista);
console.log(teste);

//Criem uma função que receba um número e retorne verdadeira caso ele seja primo, e falso caso contrário.

function eh_primo( numero ) {
    //numero primo é divisível apenas por um e por ele mesmo
    let count = 0;

    if (numero == 0) {
        console.log("Erro");
        return false;
    }

    for ( let i = 1; i <= numero; i++ ) {
        if (numero%i == 0) {
            count++;
        }
    }
    if ( count <= 2 ) {
        console.log("Eh primo");
        return true;
    } else {
        console.log("Não eh primo");
        return false;
    }
}

eh_primo(0);
eh_primo(2);
eh_primo(10);
eh_primo(20);

//Criem uma função que receba uma string, e retorne um objeto com a quantidade de vezes que cada vogal apareceu no texto

function contaVogais( palavra ) {
    const contador = {
        'a': 0,
        'e': 0,
        'i': 0,
        'o': 0,
        'u': 0
    }

    const vogais = ['a', 'e', 'i', 'o', 'u'];

    for ( let i = 0; i < palavra.length; i++) {
        const palavra_minuscula = palavra[i].toLowerCase();
        if ( vogais.includes(palavra_minuscula) ) {
            contador[palavra_minuscula]++;
        }
    }
    return contador;
}

const palavra = "abacaxi";
const res = contaVogais(palavra);
console.log(res);