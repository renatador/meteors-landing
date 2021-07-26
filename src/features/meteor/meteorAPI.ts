
const  url:string = 'https://data.nasa.gov/resource/y77d-th95.json';

export async function  fetchMeteors () {
    const response = await fetch(url);
    return response;
}
