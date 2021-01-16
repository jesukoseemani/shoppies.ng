class Omdbapi {
  
async searchMovieApi(input){

  const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=d3dcd9d4&s=${input}`);

  const dataSearch = await searchResponse.json();

  return dataSearch;


}


async searchidApi(ID){

  const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=d3dcd9d4&i=${ID}`);

  const IDSearch = await searchResponse.json();

  return IDSearch;


}





}
