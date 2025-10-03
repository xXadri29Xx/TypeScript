import axios from "axios";

const urlbase= 'https://rickandmortyapi.com/api/character/'

const getCharacter = (name?: string, status?: string, gender?: string) => {
    const variables = [
        { key: "name", value: name },
        { key: "status", value: status },
        { key: "gender", value: gender }
     ];
    const urlfinal: (string | undefined) = variables.reduce((acc,i) => {
    if (i.value) {
      if (!acc) {
        acc = `?${i.key}=${i.value}`;
      } else {
        acc += `&${i.key}=${i.value}`;
      }
    }
    return acc;
    }, "")


    axios.get(urlbase+urlfinal).then(res=>console.log(res.data.results))
}


getCharacter('Rick','alive','female')


























/*
    const finalurl='?name='+name+'&status='+status+'&gender='+gender;
    axios.get(urlbase+finalurl).then(res=>console.log(res.data.results))
*/

/*
getEpisodeofCharacter(idPersonaje)

*/