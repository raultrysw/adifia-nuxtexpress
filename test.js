let md5 = require('md5')

let text = 'silly'

let primerCifrado = md5(text)

console.log('esperando tiempo....');

setTimeout(() => {
    let segundoCifrado = md5(text)
    console.log(primerCifrado);
    console.log(segundoCifrado);
    if (primerCifrado === segundoCifrado) {
        console.log('Son iguales');
    } else {
        console.log('No son iguales');
        
    }
}, 3000)
