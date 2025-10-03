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


const getEpisodeofCharacter = (id: number) => {
    axios.get(urlbase+id).then(res2=>console.log(res2.data.episode))
}

getCharacter('Rick','alive','female')
getEpisodeofCharacter(1)