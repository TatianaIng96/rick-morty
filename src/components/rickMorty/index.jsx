import { useState, useEffect } from 'react'
import { fetchEpisodes } from '../../api/episodes/episode'
import { fetchCharacter } from '../../api/character/character'

const ApiRickMorty = () =>{
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

  return(
    <>
      <div className="container">
        <div className="row">
          {episode.map((episode) => (
            <div key={episode.id} className="col-md-6 bg-light">
              <ul className="list-group">
                <li className="list-group-item">
                  <h1 className="mb-2">{episode.id}{") "}{episode.episode}</h1>
                  <h3 className="mb-3">{episode.name}</h3>
                  <p><strong>Air Date:</strong> {episode.air_date}</p>
                  <h2>Personajes:</h2>

                  {character.map((character) => (
                    episode.characters.slice(0, 10).map((item, index) => (
                      item === character.url && (
                        <div key={index} className="d-flex justify-content-between align-items-center">
                          <p>{'- '}{character.name}</p>
                          <span className="badge badge-primary">{character.species}</span>
                        </div>
                      )
                    ))
                  ))}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ApiRickMorty