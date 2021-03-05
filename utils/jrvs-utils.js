const axios = require('axios')

const BASE_URL = 'https://io.hackerspace.sv/data/actas_tse/'

async function getJrvs() {
  try {
    // eslint-disable-next-line
    console.log('getJrvs from --> ', `${BASE_URL}disponibles.txt`)
    const data = await axios.get(`${BASE_URL}disponibles.txt`)

    // Route example --> img/13-04/004/21812433.png
    // 21-8124-3-3.png
    //   - 21: Year
    //   - 8124: JRV number
    //   - 3: Acta type
    //   - 3: Correlative
    const jrvRegex = /^img\/(\d+)-(\d+)\/\d+\/\d{2}(\d{4})(\d{1})(\d{1})\.png$/

    // 1. Split the routes
    const imagesRoutes = data.data.split('\n').filter((route) => route !== '')

    // 2. Find and filter all the routes that has match with the regex pattern
    // Result example:
    // [
    //   'img/13-04/004/21812433.png', // [0]: Relative path image
    //    '13', // [1]: Depto code
    //    '04', // [2]: Municipality code
    //    '8124', // [3]: JRV number
    //    '3', // [4]: Acta type
    //    '3', // [5]: Image correlative
    //    ...
    // ]
    const jrvsRepeatedMatchesArray = imagesRoutes
      .map((route) => (!route.match(jrvRegex) ? [''] : route.match(jrvRegex)))
      .filter((jrv) => jrv !== '')

    // 3. Create an string array without repeat JRV numbers
    // https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
    // Result example: ['8124', '8125', '8126', ...]
    const jrvsNumbersArray = [
      ...new Set(jrvsRepeatedMatchesArray.map((match) => match[3])),
    ]

    // 4. Create and array of objects with the JRV number and routes images attributes
    // Result example:
    // [
    //   {
    //     jrv: '8124',
    //     depto_id: 13,
    //     muni_id: 4,
    //     images: [
    //       'https://io.hackerspace.sv/data/actas_tse/img/13-04/004/21812433.png',
    //       'https://io.hackerspace.sv/data/actas_tse/img/13-04/004/21812431.png',
    //     ]
    //   }
    //   {
    //     jrv: '8125',
    //     depto_id: 13,
    //     muni_id: 4,
    //     images: [
    //       'https://io.hackerspace.sv/data/actas_tse/img/13-04/004/21812533.png',
    //       'https://io.hackerspace.sv/data/actas_tse/img/13-04/004/21812531.png',
    //     ]
    //   },
    //   ...
    // ]
    const jrvs = jrvsNumbersArray.map((jrvNumber) => {
      const matchedJrvs = jrvsRepeatedMatchesArray.filter(
        (match) => match[3] === jrvNumber
      )

      return {
        jrv: jrvNumber,
        depto_id: parseInt(matchedJrvs[0][1], 10),
        muni_id: parseInt(matchedJrvs[0][2], 10),
        papers: [
          {
            type: 3,
            name: 'Asamblea Legislativa',
            images: matchedJrvs
              .filter((match) => parseInt(match[4]) === 3)
              .map((image) => `${BASE_URL}${image[0]}`),
          },
          {
            type: 5,
            name: 'Concejo Municipal',
            images: matchedJrvs
              .filter((match) => parseInt(match[4]) === 5)
              .map((image) => `${BASE_URL}${image[0]}`),
          },
          {
            type: 2,
            name: 'Parlamento Centroamericano',
            images: matchedJrvs
              .filter((match) => parseInt(match[4], 10) === 2)
              .map((image) => `${BASE_URL}${image[0]}`),
          },
        ],
      }
    })

    return jrvs
  } catch (error) {
    // eslint-disable-next-line
    console.log('error', error)
  }
}

function getJrvByNumber(jrvs, jrvNumber) {
  return jrvs.find((jrv) => jrv.jrv === jrvNumber)
}

function searchJrvsByNumber(jrvs, jrvNumber) {
  return jrvs.filter((jrv) => jrv.jrv.includes(jrvNumber))
}

function filterByDepto(jrvs, deptoId) {
  return jrvs.filter((jrv) => parseInt(jrv.depto_id, 10) === deptoId)
}

function filterByMunicipality(jrvs, deptoId, muniId) {
  return jrvs.filter(
    (jrv) =>
      parseInt(jrv.depto_id, 10) === deptoId &&
      parseInt(jrv.muni_id, 10) === muniId
  )
}

module.exports = {
  getJrvs,
  getJrvByNumber,
  searchJrvsByNumber,
  filterByDepto,
  filterByMunicipality,
}
