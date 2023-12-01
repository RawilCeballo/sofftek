const axios = require('axios');

module.exports.getPlanet = async (event) => {
  const planetId = event.pathParameters.id;
  try {
    const response = await axios.get(`https://swapi.dev/api/planets/${planetId}/`);
    const planetInfo = {
      nombre: response.data.name,
      rotacion: response.data.rotation_period,
      orbita: response.data.orbital_period,
      diametro: response.data.diameter,
      clima: response.data.climate,
      gravedad: response.data.gravity,
      residentes: response.data.residents,
      peliculas: response.data.films,
      terreno: response.data.terrain,
      poblacion: response.data.population,
      superficie: response.data.surface_water,
      creado: response.data.created,
      editado: response.data.edited,
      url: response.data.url
    }
    return {
      statusCode: 200,
      body: JSON.stringify(planetInfo),
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
