import { Readable } from 'node:stream';
import fetch from "node-fetch";

class OneToOneHundredStream extends Readable {
    index = 1;

    _read(){
        const i = this.index++;

        setTimeout(() => {
            if(i > 5){
                this.push(null);

            }else{
                const buff = Buffer.from(String(i) + " ");
                this.push(buff);
            }
        }, 500);
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToOneHundredStream()
})