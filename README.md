# Visualizador de actas de las Juntas Receptoras de Votos - 2021

Proyecto iniciado debido a una [publicación en Twitter](https://twitter.com/mxgxw_alpha/status/1366188267130015745) de [@mxgxw_alpha](https://twitter.com/mxgxw_alpha), con el objetivo de hacer un respaldo de las imágenes de las actas que pertenecen a las JRV que fueron procesadas en las votaciones llevadas a cabo el 28 de Febrero de 2021.

Este visualizador permite navegar de una forma un poco más amigable entre las imágenes de cada JRV por medio de un listado de todas las JRV que se encuentran en el respaldo de imágenes. Es posible ver las imágenes de cada JRV cuando se selecciona una JRV del listado. 

Para ver detalles del proceso de agrupación se puede revisar el archivo de la ruta; `/utils/jrvs-utils.js --> getJrvs()`

Ruta de los respaldos:

- <https://io.hackerspace.sv/data/actas_tse/>

En el directorio se encuentra un archivo llamado [disponibles.txt](https://io.hackerspace.sv/data/actas_tse/disponibles.txt) que contiene el listado de las rutas relativas de cada imagen. Luego de dividir cada una de las rutas se extra el número de la JRV por medio de expresiones regulares, luego de extraer el número de la JRV se agrugan las imágenes en base a ese mismo número.

Dentro del directorio también se encuentra la carpeta llamada [/img](https://io.hackerspace.sv/data/actas_tse/img/) que contiene las imágenes de las actas pero, es complicado navegar entre ellas porque no están agrupadas de una forma entendible, además que no es posible visualizarlas ya que no aparecen listadas y solo es posible acceder a ellas através de las rutas relativas del archivo [disponibles.txt](https://io.hackerspace.sv/data/actas_tse/disponibles.txt).

**_Actualización:_**

Para evitar el tener que hacer la consulta y procesamiento de las JRVs desde el archivo [disponibles.txt](https://io.hackerspace.sv/data/actas_tse/disponibles.txt) a la hora de hacer el deployment, se creó un script ( `/utils/extract-process-data.js --> processJrvs()`) para ejecutarlo de forma manual y crear un archivo JSON con todas las JRVs procesadas.

Además para mejorar el tiempo de carga en la página de inicio se agregó paginación sin botones para navegar entre páginas. La paginación era necesaria para evitar el tener que agregar más de 8K de elementos a la vez al inicio, que ocasionaba una espera muy larga para navegar entre los resultados.

Se cuenta también con la capacidad de buscar por medio de un campo de texto JRVs, los resultados del filtro también están páginados para no sobrecargar el renderizado de elementos.

Otra funcionalidad con la que se cuenta es filtros por departamentos y por municipios. Al momento de seleccionar un departamento se muestran paginadas todas las JRVs de ese departamento y al instante se muestra otro listado que contiene los municipios del departamento seleccionado. Para mostrar los resultados con filtro de municipio se muestran sin paginación, es decir se renderizan todas las JRVs.

El listado de departamentos es por medio de un archivo JSON (`/data/geo-data-process.json`), este archivo JSON es creado con el contenido que se obtiene de `/data/geo-data-no-process.csv` que igualmente generó [@mxgxw_alpha](https://twitter.com/mxgxw_alpha). Para hacer la conversión se utilizó el sitio [CSV to JSON](https://csvjson.com/csv2json) y luego se agregó una función en  `/utils/extract-process-data.js --> processGeoData()` para crear un archivo JSON con los departamentos y municipios de una forma agrupada.

El archivo `/data/geo-data-process.json` es el que sirve para poder asignar departamento y municipio a cada JRV, todo con el fin de poder hacer filtros por departamentos y municipios como se había mencionado antes. Para obtener más información sobre de dónde se obtiene el departamento y municipio de cada JRV se puede revisar una [imagen subida por @mxgxw_alpha](https://twitter.com/mxgxw_alpha/status/1367165830182674441/photo/1) para entender la nomenclatura.

Debido a que existen 3 tipos de actas; concejos municipales, parlacen y asamblea legislativa, se agregó lo de agrupar imágenes por el tipo de acta.

El resultado final del objeto de una JRV es el siguiente:

```JSON
{
    "jrv": "3538",
    "depto_id": 3,
    "muni_id": 10,
    "papers": [
      {
        "type": 3,
        "name": "Asamblea Legislativa",
        "images": [
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353832.png",
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353833.png",
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353831.png"
        ]
      },
      {
        "type": 5,
        "name": "Concejo Municipal",
        "images": [
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353851.png"
        ]
      },
      {
        "type": 2,
        "name": "Parlamento Centroamericano",
        "images": [
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353822.png",
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353823.png",
          "https://io.hackerspace.sv/data/actas_tse/img/03-10/004/21353821.png"
        ]
      }
    ]
  },
```

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
