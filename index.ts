import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

type LD = {
id: number,
filmName: string,
rotationType: "CAV" | "CLV",
region: string,
lengthMinutes: number,
videoFormat: "NTSC" | "PAL"
};

let LDs: LD[] = [
 { id: 1, filmName: "Pelicula 1", rotationType: "CAV", region: "Madrid", lengthMinutes: 120, videoFormat: "NTSC" },
 { id: 2, filmName: "Pelicula 2", rotationType: "CAV", region: "Barcelona", lengthMinutes: 60, videoFormat: "PAL" },
 { id: 3, filmName: "Pelicula 3", rotationType: "CLV", region: "Malaga", lengthMinutes: 180, videoFormat: "NTSC" },
 { id: 4, filmName: "Pelicula 4", rotationType: "CLV", region: "Burgos", lengthMinutes: 40, videoFormat: "PAL" },
];


app.get("/id", (req, res)=> {
  res.status(200).json(LDs);
})

app.get("/id/:id", (req, res)=> {
  const id = Number(req.params.id);
  const search = LDs.find((elem)=>elem.id==id);
  search ? res.status(200).json(search) : res.status(404).json({
    message: "Disco no encontrado"
  })
})

app.post("/id", (req, res)=> {
  const newLD:LD = {
    id:Date.now(),
    filmName: req.body.filmName,
    rotationType: req.body.rotationType,
    region: req.body.region,
    lengthMinutes: req.body.lengthMinutes,
    videoFormat: req.body.videoFormat
  }

  if(newLD.filmName && newLD.rotationType && newLD.region && newLD.lengthMinutes && newLD.videoFormat 
    && typeof(newLD.filmName)=="string" && (newLD.rotationType =="CAV" || newLD.rotationType =="CLV") 
    && typeof(newLD.region)=="string" && typeof(newLD.lengthMinutes)=="number" 
    && (newLD.videoFormat=="NTSC" || newLD.videoFormat=="PAL")){
      LDs.push(newLD);
      res.status(201).json(newLD);
  }
  else{
    res.status(404).json({
        message: "Disco no creado"
    })
  }
})

app.put("/id/:id", (req, res)=> {
  const id = Number(req.params.id);
  const index = LDs.findIndex((elem)=>elem.id==id);
  
  if(index === -1){
    return res.status(404).json({error: "Disco no encontrado"})
  }

  const newLD:LD = {
    id:id,
    filmName: req.body.filmName,
    rotationType: req.body.rotationType,
    region: req.body.region,
    lengthMinutes: req.body.lengthMinutes,
    videoFormat: req.body.videoFormat
  }
  if(newLD.filmName && newLD.rotationType && newLD.region && newLD.lengthMinutes && newLD.videoFormat 
    && typeof(newLD.filmName)=="string" && (newLD.rotationType =="CAV" || newLD.rotationType =="CLV") 
    && typeof(newLD.region)=="string" && typeof(newLD.lengthMinutes)=="number" 
    && (newLD.videoFormat=="NTSC" || newLD.videoFormat=="PAL")){
      LDs[index] = newLD;
      res.status(200).json(newLD)
  }
  else{
    res.status(400).json({
      message: "Error al actualizar el disco"
    })
  }


})

app.delete("/id/:id", (req, res)=> {
  const id = Number(req.params.id);
  const exist = LDs.some((elem) => elem.id == id);

  if(!exist){
    return res.status(404).json({message: "Disco no encontrado"});
  }

  LDs = LDs.filter((elem)=>elem.id !== id)
  res.status(204).json({mesage: "Disco eliminado"})
})

app.listen(port, () => console.log("Servidor en http://localhost:3000"));


const testApi = async () => {
  try {
    const LDs1 = (await axios.get<LD[]>("http://localhost:3000/id")).data;
    console.log("Discos iniciales:", LDs1);

    const nuevoLD:LD = (await axios.post("http://localhost:3000/id", {filmName: "Terminator", rotationType: "CAV", region: "EEUU", lengthMinutes: 80, videoFormat: "NTSC" })).data;

    const LDs2 = (await axios.get<LD[]>("http://localhost:3000/id")).data;
    console.log("Después de añadir:", LDs2);

    await axios.put<LD[]>(`http://localhost:3000/id/${nuevoLD.id}`, { id: 4, filmName: "Terminator2", rotationType: "CLV", region: "Burgos", lengthMinutes: 40, videoFormat: "PAL" })
    const LDs3 = (await axios.get<LD[]>("http://localhost:3000/id")).data;
    console.log("Después de actualizar:", LDs3);

    await axios.delete(`http://localhost:3000/id/${nuevoLD.id}`);

    const LDs4 = (await axios.get<LD[]>("http://localhost:3000/id")).data;
    console.log("Después de eliminar:", LDs4);

  } catch (err) {
    console.error("Error en la API:", err);
  }
}


setTimeout(() => {
  testApi();
},1000);

