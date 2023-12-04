/**
 * @author Rawil Ceballo <csrawil@hotmail.com>
 * @description Permite obtener las caracteristicas de una nave a traves de su ID
 */

const axios = require('axios');

module.exports.getStarship = async (event) => {
  const starshipId = event.pathParameters.id;
  try {
    const response = await axios.get(`https://swapi.dev/api/starships/${starshipId}/`);
    const starshipInfo = {
      nombre: response.data.name,
      modelo: response.data.model,
      fabricante: response.data.manufacturer,
      costo_creditos: response.data.cost_in_credits,
      longitud: response.data.length,
      velocidad_max: response.data.max_atmosphering_speed,
      tripulacion: response.data.crew,
      pasajeros: response.data.passengers,
      capacidad_carga: response.data.cargo_capacity,
      consumibles: response.data.consumables,
      hipervelocidad: response.data.hyperdrive_rating,
      MGLT: response.data.MGLT,
      clase: response.data.starship_class,
      pilotos: response.data.pilots,
      peliculas: response.data.films,
      creado: response.data.created,
      editado: response.data.edited,
      url: response.data.url
    }
    return {
      statusCode: 200,
      body: JSON.stringify(starshipInfo),
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
