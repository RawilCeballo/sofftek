const axios = require('axios');

module.exports.getPeople = async (event) => {
  const peopleId = event.pathParameters.id;
  try {
    const response = await axios.get(`https://swapi.dev/api/people/${peopleId}/`);
    const peopleInfo = {
      nombre: response.data.name,
      masa: response.data.mass,
      altura: response.data.average_height,
      color_piel: response.data.skin_colors,
      color_pelo: response.data.hair_colors,
      color_ojos: response.data.eye_colors,
      fecha_nacimiento: response.data.birth_year,
      genero: response.data.gender,
      mundo_origen: response.data.homeworld,
      especie: response.data.species,
      vehiculos: response.data.vehicles,
      naves: response.data.starships,
      peliculas: response.data.films,
      creado: response.data.created,
      editado: response.data.edited,
      url: response.data.url
    }
    return {
      statusCode: 200,
      body: JSON.stringify(peopleInfo),
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'No encontrado' }),
      };
    }
    
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};
