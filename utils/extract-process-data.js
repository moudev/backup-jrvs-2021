const fs = require('fs')
const geoDataNoProcess = require('../data/geo-data-no-process.json')

const { getJrvs } = require('./jrvs-utils')

// https://www.digitalocean.com/community/tutorials/js-capitalizing-strings
function capitalize(text) {
  const capitalizedText = text
    .toLowerCase()
    .replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

  return capitalizedText
}

// eslint-disable-next-line
function processGeoData() {
  try {
    const deptosCodes = [
      ...new Set(geoDataNoProcess.map((geo) => geo.CDPTO)),
    ].sort((a, b) => a - b)

    const data = deptosCodes.map((deptoCode) => {
      const municipalities = geoDataNoProcess.filter(
        (geo) => geo.CDPTO === deptoCode
      )
      return {
        depto_id: deptoCode,
        name: capitalize(municipalities[0].DPTO),
        municipalities: municipalities.map((mun) => ({
          muni_id: mun.CMUN,
          name: capitalize(mun.MUNIC),
        })),
      }
    })

    fs.writeFile(
      './data/geo-data-process.json',
      JSON.stringify(data),
      (err) => {
        if (!err) {
          // eslint-disable-next-line
        console.log('Done! --> ./data/geo-data-process.json')
        }
      }
    )
  } catch (error) {
    // eslint-disable-next-line
    console.log('Error:', error)
  }
}

// eslint-disable-next-line
async function processJrvs() {
  try {
    const data = await getJrvs()
    fs.writeFile('./data/jrvs.json', JSON.stringify(data), (err) => {
      if (!err) {
        // eslint-disable-next-line
        console.log('Done! --> ./data/jrvs.json')
      }
    })
  } catch (error) {
    // eslint-disable-next-line
    console.log('Error:', error)
  }
}

// processJrvs()
