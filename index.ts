/*
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
*/

import axios from "axios";

/*
axios.get("https://rickandmortyapi.com/api/character/2").then((res)=>{
  console.log(res.data);
})
*/

const getCharacter = async (id: number) => {
  const res = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
  return res.data;
}

console.log(await getCharacter(1));

/*
const getCharacterClassic = (id: number) => {
  return axios.get(`https://rickandmortyapi.com/api/character/${id}`).then((res)=>{
    return res.data;
  });
}

console.log(await getCharacterClassic(1));
console.log(await getCharacterClassic(2));
console.log(await getCharacterClassic(3));
console.log(await getCharacterClassic(4));
console.log(await getCharacterClassic(5));

getCharacterClassic(1).then((char) =>{
  console.log(char);
  getCharacterClassic(2).then((char2) =>{
    console.log(char2)
    getCharacter(3).then((char3) =>{
      console.log(char3)
    })
  })
})
*/

const getCharactersProper = async (ids:number[]) => {
  try{
    /*
    const chars = ids.map(async (id)=>{
      const personaje = (await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data;
      console.log(personaje)
    })
    return await Promise.all(chars);  //Mejor opcion
    */
    /*
    const per1 = (await axios.get(`https://rickandmortyapi.com/api/character/${ids[0]}`)).data;
    const per2 = (await axios.get(`https://rickandmortyapi.com/api/character/${ids[1]}`)).data;
    return [per1,per2];
    */
    const chars = ids.map(async (id)=>{
      const personaje = (await axios.get(`https://rickandmortyapi.com/api/character/${id}`)).data; //axios.get<Character>(`https://rickandmortyapi.com/api/character/${id}`)).data; Hay que crear el type Character
      return personaje;
    })
    const finalChars = await chars;
    return finalChars;

  }catch(err){
    //console.log("Error: " + err);
    if(axios.isAxiosError(err)){
      console.log("Error en la petición: " + err.message);
    }
    else{
      console.log("Error general: " + err);
    }
  }
}

console.log(await getCharactersProper([1,2,3]));