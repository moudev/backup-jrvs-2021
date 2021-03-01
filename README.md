# Visualizador de actas de las Juntas Receptoras de Votos - 2021

Proyecto iniciado debido a una [publicación en Twitter](https://twitter.com/mxgxw_alpha/status/1366188267130015745) de [@mxgxw_alpha](https://twitter.com/mxgxw_alpha), con el objetivo de hacer un respaldo de las imágenes de las actas que pertenecen a las JRV que fueron procesadas en las votaciones llevadas a cabo el 28 de Febrero de 2021.

Este visualizador permite navegar de una forma un poco más amigable entre las imágenes de cada JRV por medio de un listado de todas las JRV que se encuentran en el respaldo de imágenes. Es posible ver las imágenes de cada JRV cuando se selecciona una JRV del listado. 

Para ver detalles del proceso de agrupación se puede revisar el archivo de la ruta; `/utils/utils.js --> getJrvs()`

Ruta de los respaldos:

- <https://io.hackerspace.sv/data/actas_tse/>

En el directorio se encuentra un archivo llamado [disponibles.txt](https://io.hackerspace.sv/data/actas_tse/disponibles.txt) que contiene el listado de las rutas relativas de cada imagen. Luego de dividir cada una de las rutas se extra el número de la JRV por medio de expresiones regulares, luego de extraer el número de la JRV se agrugan las imágenes en base a ese mismo número.

Dentro del directorio también se encuentra la carpeta llamada [/img](https://io.hackerspace.sv/data/actas_tse/img/) que contiene las imágenes de las actas pero, es complicado navegar entre ellas porque no están agrupadas de una forma entendible, además que no es posible visualizarlas ya que no aparecen listadas y solo es posible acceder a ellas através de las rutas relativas del archivo [disponibles.txt](https://io.hackerspace.sv/data/actas_tse/disponibles.txt).

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
