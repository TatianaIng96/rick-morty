export async function fetchCharacter(episodes) {
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