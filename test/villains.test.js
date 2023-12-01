const { expect } = require('chai');
const handler = require('../src/api/villain/handler');
const mockDocumentClientPut = jest.fn();

jest.mock('aws-sdk', () => ({
  DynamoDB: {
    DocumentClient: jest.fn(() => ({
      put: mockDocumentClientPut,
    })),
  },
}));

describe('Villains API', () => {
  beforeEach(() => {
    mockDocumentClientPut.mockReset();
  });

  it('Crear un villano', async () => {
    const event = {
      body: JSON.stringify({
        nombre: 'Luke',
        habilidad: 'Jedi',
        pelicula: 'Episodio VI - El retorno del Jedi',
      }),
    };

    mockDocumentClientPut.mockImplementation((params, callback) => {
      callback(null, {});
    });

    const response = await handler.createVillain(event);

    expect(response.statusCode).to.equal(201);
    expect(JSON.parse(response.body).message).to.equal('Villano creado exitosamente');
  });

  it('Obtiene un villano', async () => {
    const villainId = 'fecb101d-15ef-4fa7-98ca-b7a9be0ed896';
    const event = {
      pathParameters: { id: villainId },
    };

    mockDocumentClientPut.mockImplementation((params, callback) => {
      callback(null, { Item: { id: villainId, nombre: 'Luke' } });
    });

    const response = await handler.getVillain(event);

    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response.body).id).to.equal(villainId);
  });

  it('Lista de villanos activos', async () => {
    mockDocumentClientPut.mockImplementation((params, callback) => {
      callback(null, {
        Items: [
          { id: 'fecb101d-15ef-4fa7-98ca-b7a9be0ed896', nombre: 'Luke' },
          { id: 'fecb101d-15ef-4fa7-98ca-b7a9be0ed897', nombre: 'Dark' }
        ],
      });
    });

    const response = await handler.listActiveVillains();

    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response.body)).to.be.an('array').with.length(2);
  });

  it('Desactiva un villano', async () => {
    const villainId = 'fecb101d-15ef-4fa7-98ca-b7a9be0ed896';
    const event = {
      pathParameters: { id: villainId },
    };

    mockDocumentClientPut.mockImplementation((params, callback) => {
      callback(null, { Item: { id: villainId, nombre: 'Luke', estado: 1 } });
    });

    mockDocumentClientPut.mockImplementation((params, callback) => {
      callback(null, { Attributes: { id: villainId, nombre: 'luke', estado: 0 } });
    });

    const response = await handler.deleteVillain(event);

    expect(response.statusCode).to.equal(200);
    expect(JSON.parse(response.body).id).to.equal(villainId);
    expect(JSON.parse(response.body).estado).to.equal(0);
  });
});
