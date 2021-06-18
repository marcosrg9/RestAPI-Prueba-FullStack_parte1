# Prueba para desarrollador FullStack (Parte 1)

### Resumen rápido

- [Documentación de la API](https://documenter.getpostman.com/view/11996689/TzeXn7zk)
- Comandos

```javascript
    npm start // Arranca el servidor.
    npm run debug // Arranca el servidor para depurar con Chrome.
    npm run build // Compila el frontEnd para producción.
```
- [Demostración de la App](https://rest-api-guadaltech-pt1.herokuapp.com/)


### Desarrollo de la prueba
Esta prueba consiste en realizar un backend que sirva una APIRest usando Node, PHP o Python, en mi caso el backend está escrito en Node y Express.

Debe proveer datos de una base de datos. Se puede elegir la que se desee, sin embargo se recomienda MongoDB / MySQL.<br>
En este caso se ha optado por Mongo. La DB se encuentra alojada en un cluster de MongoDB Atlas para evitar complicaciones con mi servidor de desarrollo privado.

La documentación de la API puede encontrarse en [este enlace](https://).

Acto seguido hay que desarrollar un frontEnd que muestre los datos. Listarlos es suficiente, pero si da tiempo se puede añadir métodos para editar y eliminar.

El frontEnd está hecho en Angular (TypeScript), se trata de una interfaz sencilla que usa la librería Bootstrap para mostrar componentes predefinidos (para no perder el tiempo, lo importante es el código).

En resumen, se trata de una prueba para FullStack usando la pila MEAN.