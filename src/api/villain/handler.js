/**
 * @author Rawil Ceballo <csrawil@hotmail.com>
 * @description Implementa los metodos para crear, listar y actualizar el estado de nuevos registros "villanos".
 */

'use strict';

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.createVillain = async (event) => {
  const requestBody = JSON.parse(event.body);
  try {
    const { v4 } = require('uuid');
    const params = {
      TableName: 'SwapiVillains',
      Item: {
        id: v4(),
        nombre: requestBody.nombre,
        habilidad: requestBody.habilidad,
        pelicula: requestBody.pelicula,
        estado: 1,
        creado: new Date().toISOString(),
        editado: null
      },
    };

    await dynamoDB.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ message: 'Villano creado exitosamente' }),
    };
  } catch (error) {
    console.error('Error al crear el villano:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 'error': 'Error interno del servidor. ' + error }),
    };
  }
};

module.exports.getVillain = async (event) => {
  const villainId = event.pathParameters.id;
  const params = {
    TableName: 'SwapiVillains',
    Key: {
      id: villainId
    },
  };

  try {
    const response = await dynamoDB.get(params).promise();
    if (!response.Item || response.Item.estado !== 1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Villano no encontrado' }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(response.Item),
    };
  } catch (error) {
    console.error('Error al obtener el villano:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 'error': 'Error interno del servidor. ' + error }),
    };
  }
};

module.exports.listActiveVillains = async () => {
  const params = {
    TableName: 'SwapiVillains',
    FilterExpression: '#estado = :estado',
    ExpressionAttributeNames: {
      '#estado': 'estado',
    },
    ExpressionAttributeValues: {
      ':estado': 1,
    },
  };

  try {
    const response = await dynamoDB.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(response.Items),
    };
  } catch (error) {
    console.error('Error al listar villanos activos:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 'error': 'Error interno del servidor. ' + error }),
    };
  }
};

module.exports.deleteVillain = async (event) => {
  const villainId = event.pathParameters.id;
  const getParams = {
    TableName: 'SwapiVillains',
    Key: {
      id: villainId,
    },
  };

  try {
    const getResponse = await dynamoDB.get(getParams).promise();
    if (!getResponse.Item || getResponse.Item.estado !== 1) {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: 'Villano no encontrado' }),
      };
    }

    const updateParams = {
      TableName: 'SwapiVillains',
      Key: {
        id: villainId,
      },
      UpdateExpression: 'SET #estado = :estado, editado = :editado',
      ExpressionAttributeNames: {
        '#estado': 'estado',
      },
      ExpressionAttributeValues: {
        ':estado': 0,
        ':editado': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    };

    const updateResponse = await dynamoDB.update(updateParams).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(updateResponse.Attributes),
    };
  } catch (error) {
    console.error('Error al eliminar el villano:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor' }),
    };
  }
};

