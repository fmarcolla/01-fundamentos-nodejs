import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, Buffer.from(String(transformed)));
    }
}

/*  
    Lê os dados do buffer conforme eles vão chegando no servidor
    Util para dados que podem ser lidos parcialmente como: Vídeos, músicas, textos...
*/

// const server = http.createServer((req, res) => {
//     return req
//     .pipe(new InverseNumberStream())
//     .pipe(res);
// });

/*  
    Aguarda todos os dados do buffer serem enviados
*/
const server = http.createServer(async (req, res) => {
    const buffers = [];

    for await (const chunk of req){
        buffers.push(chunk);
    }

    const fullStreamerContent = Buffer.concat(buffers).toString();
    console.log(fullStreamerContent);

    return res.end(fullStreamerContent);
});

server.listen(3334);