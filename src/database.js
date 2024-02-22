import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Databtase {
    #database = {};

    constructor(){
        fs.readFile(databasePath, 'utf-8').then(data => {
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        });
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table, search){
        let data = this.#database[table] ?? [];
        
        if(search){
            data = data.filter(row => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase());
                })
            });
        }

        return data;
    }

    insert(table, data){
        if(!Array.isArray(this.#database[table])){
            this.#database[table] = [];
        }

        this.#database[table].push(data);

        this.#persist();
        return data;
    }

    delete(table, id){
        const index = this.#database[table].findIndex(data => {
            return data.id == id;
        });

        if(index != -1){
            this.#database[table].splice(index, 1);
            this.#persist();
        }
    }

    update(table, id, data){
        const index = this.#database[table].findIndex(data => {
            return data.id == id;
        });

        if(index != -1){
            this.#database[table][index] = { id, ...data };
            this.#persist();
        }
    }
}