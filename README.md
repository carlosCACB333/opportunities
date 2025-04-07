# gestión de oportunidades

> La aplicación permite gestionar oportunidades de negocio, mostrando un listado filtrable por fecha y tipo (licitación o compra ágil), donde los usuarios pueden marcar oportunidades de interés ("en seguimiento") y visualizarlas en una vista separada, con un frontend en React + Redux y un backend en Nest.js conectado a MongoDB.

## pasos para correr el proyecto

- clonar el repositorio
- ejecutar `docker compose up --build`
- el frontend se levanta en http://localhost:3000/
- el backend se levanta en http://localhost:8080/docs
- para tener datos iniciales ejecute http://localhost:8080/api/v1/seed

## Estructura del proyecto

El proyecto está organizada en dos principales directorios: backend y frontend, cada uno con su propio propósito y configuración. Se usa docker y docker compose para ejecutar ambos proyectos.

- El backend está escrito con typescript usando el framework Nestjs con una arquitectura modular.
- El frontend esta escrito con typescript usando la biblioteca Reactjs + Redux. La libreria de componentes es [hero.com](https://www.heroui.com/). Para la parte de produccion se usa nginx para servir los archivos estáticos generados en la compilación. La estructura del proyecto sigue la arquitecura de screamin archicture.

- Se usa mongodb para la base de datos.


## correr los test

- dentro de la carpeta(backend o frontend) ejecutar `bun install` para instalar las dependencias. luego ejecutar `bun run test` para correr los test.