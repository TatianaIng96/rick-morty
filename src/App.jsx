import { useState, useEffect } from 'react'
import './App.css'

async function fetchEpisodes() {
  const cap =  [];
  for (let i = 1; i <= 20; i++) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${i}`)
    cap.push(response.json())
  }
  return cap;
}

async function fetchCharacter(episodes) {
  const data = []
  const characters = new Set()
  episodes.forEach(episode => {
    episode.characters.slice(0, 10).forEach(character => {
      characters.add(character)
    })
  });

  const url = Array.from(characters)

  for (let i = 0; i < url.length; i++) {
    const response = await fetch(url[i])
    data.push(response.json())
  }
  return(data);
}

function App() {
  const [episode, setEpisode] = useState([])
  const [character,setCharacter]= useState([])
  useEffect(() =>{
    const fetchAll = async () => {
      const epiPromise = await fetchEpisodes() 
      const data = await Promise.all(epiPromise)
      const chaPromise = await fetchCharacter(data)
      const data_cha = await Promise.all(chaPromise)
      setEpisode(data)
      setCharacter(data_cha)
    }
    fetchAll()
    
  },[])

  return (
    <>
     <ul>
     {episode.map((episode) => (
        <li key={episode.id}>
          <h1>{episode.id}{") "}{episode.episode}</h1>
          <h3>{episode.name}</h3>
          <p>{episode.air_date}</p>
          <h2>Personajes:</h2>
  
          {character.map((element)=>(
            episode.characters.slice(0,10).map((item,index) =>(
                item === element.url && (<p key={index}>{'- '}{element.name}{' - '}{element.species}</p>) 
                
              ))
          ))}
        </li>

      )) }
     </ul>
     
    </>
  )
}

export default App
