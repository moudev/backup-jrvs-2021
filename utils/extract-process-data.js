const fs = require('fs')
const { getJrvs } = require('./jrvs-utils')

async function process() {
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

process()
