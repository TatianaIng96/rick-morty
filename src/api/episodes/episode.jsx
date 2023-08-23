export async function fetchEpisodes() {
  const cap =  [];
  for (let i = 1; i <= 20; i++) {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${i}`)
    cap.push(response.json())
  }
  return cap;
}
