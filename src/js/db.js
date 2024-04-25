import { getAxios } from "./API";

const name = 'Biblioteca-CC';
let request = indexedDB.open(name, 1);


request.onerror = function(event) {
    // Manejar errores
};

request.onsuccess = function(event) {
    // Acceder a la base de datos
    let db = event.target.result;
};


function createCategory(name){
    request.onupgradeneeded = function(event) {
        let db = event.target.result;
        let objectStore = db.createObjectStore(name, { keyPath: 'id', autoIncrement: true });
    };
    
}