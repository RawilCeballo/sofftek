/**
 * @author Rawil Ceballo <csrawil@hotmail.com>
 * @description Permite obtener los detalles de un film a traves de su ID
 */

const axios = require('axios');

module.exports.getFilm = async (event) => {
  const filmsId = event.pathParameters.id;
  try {
    const response = await axios.get(`https://swapi.dev/api/films/${filmsId}/`);
    const filmInfo = {
      titulo: response.data.title,
      episodio_id: response.data.episode_id,
      apertura: response.data.opening_crawl,
      director: response.data.director,
      productor: response.data.producer,
      publicacion: response.data.release_date,
      personajes: response.data.characters,
      planetas: response.data.planets,
      naves: response.data.starships,
      vehiculos: response.data.vehicles,
      especie: response.data.species,
      creado: response.data.created,
      editado: response.data.edited,
      url: response.data.url
    }
    return {
      statusCode: 200,
      body: JSON.stringify(filmInfo),
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
