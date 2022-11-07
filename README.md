![HenryLogo](https://images.unsplash.com/photo-1664972571708-bce882c6555e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)

# Final Project - Becoming Fit

Becoming-Fit es una aplicación de productos deportivos que busca servir de puente entre el comercio y potenciales clientes interesados. Permitirá la búsqueda de artículos deportivos de acuerdo al interés del comprador, filtrando por género, edad, talles, marcas y rating. Asimismo, ofrece la posibilidad de registrarse en el sitio para poder llevar un historial de compras, un carrito de compras, poder puntuar los artículos adquiridos y dejar una reseña de los mismos, como así también puntuar una reseña ya existente. Esta aplicación permitirá a los usuarios adquirir los productos y abonarlos a través de servicios como MercadoPago o Homebanking.


## Generalidades del Proyecto

- Aplicación de productos deportivos utlizando React, Redux, Node y Sequelize.
- Búsqueda de artículos filtrando por género, edad, talles, marcas y rating
- Seleccion de productos con la posibilidad de añadir a carrito de compras.


# User Stories

## Como cliente, yo puedo:
- Visualizar y filtrar los productos según mi interés.
- Gestionar mi perfil de usuario para agregar, cambiar o quitar información personal como ser foto de perfil, método de contacto, etc.
- Gestionar una sección de favoritos, donde pueda guardar publicaciones de mi interés y vincularlas al carrito de compras según mi deseo.
- Generar reseñas sobre los artículos e interactuar con los mismos a través de un puntaje.
- Interactuar con las reseñas de otros usuarios.
- Comprar un producto de mi interés, mediante los medios de pago habilitados.
- Verificar la información del estado de una compra ya realizada.
- Reportar un problema en la página o en el servicio.


## Como vendedor, yo puedo:
- Gestionar mi perfil de vendedor para agregar, cambiar o quitar información personal como ser foto de perfil, método de contacto, etc.
- Crear publicaciones nuevas y actualizar el stock de productos existentes.
- Acceder a la información de las compras pendientes y actualizar el estado de las mismas. Por ej, compra en proceso, compra lista para despachar, compra despachada al correo.
- Ocultar reseñas de productos.
- Reportar un problema de la página.


## Como administrador, yo puedo:
- Visualizar la información de los usuarios y modificar su estado (Usuario activo, usuario bloqueado).
- Administrar las publicaciones en su totalidad (creación, modificación, eliminación).
- Modificar stock y precios.
- Visualizar y modificar las funcionalidades a las que tienen acceso los demás tipos de usuario.
- Acceder al registro de reportes y problemas, para actuar de acuerdo a la necesidad.
- Contactar a un usuario para notificarle de un incumplimiento en los términos de servicio.



# Estructura

## Frontend

__Ruta principal__: debe contener

- [ ] Input de búsqueda para encontrar productos por nombre
- [ ] Área donde se verá el listado de productos. Deberá mostrar su:
  - Imagen
  - Nombre
  - Géneros
- [ ] Botones/Opciones para filtrar por género y por productos existente 
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los productos por orden alfabético y por rating
- [ ] Paginado para ir buscando y mostrando los siguientes productos, 15 productos por pagina, mostrando los primeros 15 en la primer pagina.

__Ruta de detalle de productos__: debe contener

- [ ] Los campos mostrados en la ruta principal para cada productos (imagen, nombre, y géneros)
- [ ] Descripción
- [ ] Fecha de lanzamiento
- [ ] Rating
- [ ] Plataformas

__Ruta de creación de productos__: debe contener

- [ ] Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- [ ] Posibilidad de seleccionar/agregar varios géneros
- [ ] Posibilidad de seleccionar/agregar varias plataformas
- [ ] Botón/Opción para crear un nuevo productos

## Backend

- [ ] __GET /productos__:
  - Obtener un listado de los productos
  - Debe devolver solo los datos necesarios para la ruta principal
- [ ] __GET /productos?name="..."__:
  - Obtener un listado de las primeros 15 productos que contengan la palabra ingresada como query parameter
  - Si no existe ningún productos mostrar un mensaje adecuado
- [ ] __GET /productos/{idVideogame}__:
  - Obtener el detalle de un productos en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de productos
  - Incluir los géneros asociados
- [ ] __POST /productos__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de productos por body
  - Crea un productos en la base de datos, relacionado a sus géneros.
- [ ] __GET /genres__:
  - Obtener todos los tipos de géneros de productos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí


## Base de datos

El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

- [ ] productos con las siguientes propiedades:
  - ID: * No puede ser un ID de un productos ya existente en la API rawg
  - Nombre *
  - Descripción *
  - Fecha de lanzamiento
  - Rating
  - Plataformas *
- [ ] Genero con las siguientes propiedades:
  - ID
  - Nombre



