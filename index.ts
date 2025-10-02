import axios from "axios";

const laPromesaAxios = axios
    .get("https://rickandmortyapi.com/api")
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log("Error en la petición: ",err);
    })
    .finally(() => {
        console.log("La promesa ha finalizado su ejecución")
    })