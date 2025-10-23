import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

type Team = {
 id: number
 name: string
 city: string
 titles: number
}


let teams: Team[] = [
 { id: 1, name: "Lakers", city: "Los Angeles", titles: 17 },
 { id: 2, name: "Celtics", city: "Boston", titles: 17 },
];


app.get("/teams", (req, res)=> {
  res.status(200).json(teams);
});

app.get("/teams/:id", (req, res)=> {
  const id = Number(req.params.id);
  const buscar = teams.find((elem)=>elem.id==id);
  buscar ? res.status(200).json(buscar) : res.status(404).json({
    error: "Equipo no encontrado."
  })
})

app.post("/teams", (req, res)=> {
  const newName = req.body.name;
  const newCity = req.body.city;
  const newTitles = req.body.titles;
  const newTeam = {
    id:Date.now(),
    name:newName,
    city:newCity,
    titles:newTitles
  }

  if(newName && newCity && typeof(newName)=="string" && typeof(newCity)=="string" && typeof(newTitles)=="number"){
    teams.push(newTeam);
    res.status(201).json(newTeam);
  }
  else{
    res.status(400).json({
      error: "Error en la creacion de un equipo"
    })
  }
})

app.put("/teams/:id", (req, res)=> {
  const id = Number(req.params.id);
  const index = teams.findIndex((elem) => elem.id == id);

  if(index === -1){
    return res.status(404).json({ error: "Equipo no encontrado" });
  }

  const newName = req.body.name;
  const newCity = req.body.city;
  const newTitles = req.body.titles;
  const newTeam = {
    id:id,
    name:newName,
    city:newCity,
    titles:newTitles
  }

  if(newName && newCity && typeof(newName)=="string" && typeof(newCity)=="string" && typeof(newTitles)=="number"){
    teams[index] = newTeam;
    res.status(200).json(newTeam);
  }
  else{
    res.status(400).json({
      error: "Error al actualizar un equipo"
    })
  }
})

app.delete("/teams/:id", (req, res)=> {
  const id = Number(req.params.id);
  const existe = teams.some((elem) => elem.id == id);

  if(!existe){
    return res.status(404).json({ error: "Equipo no encontrado" });
  }

  teams = teams.filter((elem)=>elem.id !== id)
  res.status(204).json({message: "Equipo eliminado correctamente"})

})

app.listen(port, () => console.log("Servidor en http://localhost:3000"));


const testAPI = async () => {
  try {
    const Equipos = (await axios.get<Team[]>("http://localhost:3000/teams")).data;
    console.log("Equipos iniciales:", Equipos);

    const nuevoEquipo = (await axios.post("http://localhost:3000/teams", { name: "Bulls", city: "Chicago", titles: 6 })).data;

    const Equipos2 = (await axios.get<Team[]>("http://localhost:3000/teams")).data;
    console.log("Después de añadir:", Equipos2);

    await axios.put(`http://localhost:3000/teams/${nuevoEquipo.id}`, { name: "Raptors", city: "Toronto", titles: 1 });
    const Equipos3 = (await axios.get<Team[]>("http://localhost:3000/teams")).data;
    console.log("Después de modificar:", Equipos3);

    await axios.delete(`http://localhost:3000/teams/${nuevoEquipo.id}`);

    const Equipos4 = (await axios.get<Team[]>("http://localhost:3000/teams")).data;
    console.log("Después de eliminar:", Equipos4);

  } catch (err) {
    console.error("Error en la API:", err);
  }
}


setTimeout(() => {
  testAPI();
},1000);

