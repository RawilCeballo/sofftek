const axios = require('axios');

module.exports.getSpecie = async (event) => {
  const specieId = event.pathParameters.id;
  try {
    const response = await axios.get(`https://swapi.dev/api/species/${specieId}/`);
    const specieInfo = {
      nombre: response.data.name,
      clasificacion: response.data.classification,
      designacion: response.data.designation,
      altura_promedio: response.data.average_height,
      color_piel: response.data.skin_colors,
      color_pelo: response.data.hair_colors,
      color_ojos: response.data.eye_colors,
      esperanza_vida: response.data.average_lifespan,
      mundo_origen: response.data.homeworld,
      idioma: response.data.language,
      personas: response.data.people,
      peliculas: response.data.films,
      creado: response.data.created,
      editado: response.data.edited,
      url: response.data.url
    }
    return {
      statusCode: 200,
      body: JSON.stringify(specieInfo),
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
