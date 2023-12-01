# Dependencias:
# aws-sdk (^2.1509.0): SDK de AWS para interactuar con los servicios de Amazon Web Services.
# axios (^1.6.2): Cliente HTTP para realizar solicitudes a servidores.
# uuid (^9.0.1): Librería para generar identificadores únicos.

# Dependencias de desarrollo:
# chai (^4.3.10): Librería de aserciones para pruebas unitarias.
# jest (^29.7.0): Framework de pruebas para JavaScript/TypeScript.
# ts-jest (^29.1.1): Integración de Jest con TypeScript.
# typescript (^5.3.2): Lenguaje de programación que agrega tipado estático a JavaScript.

# Scripts:
# test: Ejecuta las pruebas utilizando Jest.
# Configuración del servicio:
# Nombre: softtek-swapi
 
# Versión del framework serverless: 3
# Proveedor de la nube:
# Nombre: AWS
# Versión de Node.js: 18.x
# Región: us-west-2

# Declaraciones IAM:
# Permite todas las acciones (dynamodb:\*) en la tabla DynamoDB llamada SwapiVillains.

# Funciones:

# getFilm:
# Manejador: src/api/film/handler.getFilm
# Evento: HTTP GET en la ruta getFilm/{id}.

# getPeople:
# Manejador: src/api/people/handler.getPeople
# Evento: HTTP GET en la ruta getPeople/{id}.

# getPlanet:
# Manejador: src/api/planet/handler.getPlanet
# Evento: HTTP GET en la ruta getPlanet/{id}.
 
# getSpecie:
# Manejador: src/api/specie/handler.getSpecie
# Evento: HTTP GET en la ruta getSpecie/{id}.

# getStarship:
# Manejador: src/api/starship/handler.getStarship
# Evento: HTTP GET en la ruta getStarship/{id}.
 
# getVehicle:
# Manejador: src/api/vehicle/handler.getVehicle
# Evento: HTTP GET en la ruta getVehicle/{id}.
 
# createVillain:
# Manejador: src/api/villain/handler.createVillain
# Evento: HTTP POST en la ruta villains.
 
# getVillain:
# Manejador: src/api/villain/handler.getVillain
# Evento: HTTP GET en la ruta villains/{id}.
 
# showActiveVillains:
# Manejador: src/api/villain/handler.listActiveVillains
# Evento: HTTP GET en la ruta villains/active.
 
# deleteVillain:
# Manejador: src/api/villain/handler.deleteVillain
# Evento: HTTP PATCH en la ruta villains/{id}.
 
# Recursos:

# Tabla DynamoDB:
# Nombre: SwapiVillains
# Definición de atributos: id de tipo cadena.
# Esquema clave: Clave primaria con id como clave de hash.
# Capacidad provisionada: 6 unidades de lectura y 6 unidades de escritura.