const getJrvs = (data) => {
  // Route example --> ./img/13-04/004/21812433.png
  // 21812433.png
  //   - 21: First two numbers. Year
  //   - 33: Last two numbers. Image correlative
  //   - 8124: Rest of the number. JRV number
  const jrvRegex = /^img\/\d+-\d+\/\d+\/\d{2}(\d+)\d{2,}\.png$/

  // 1. Split the routes
  const imagesRoutes = data.split('\n').filter((route) => route !== '')

  // 2. Find and filter all the routes that has match with the regex pattern
  // Result example:
  // [
  //   'img/13-04/004/21812433.png', // [0]: relative path image
  //    '8124', // [1]: JRV number
  //    ...
  // ]
  const jrvsRepeatedMatchesArray = imagesRoutes
    .map((route) => (!route.match(jrvRegex) ? [''] : route.match(jrvRegex)))
    .filter((jrv) => jrv !== '')

  // 3. Create an string array without repeat JRV numbers
  // https://www.javascripttutorial.net/array/javascript-remove-duplicates-from-array/
  // Result example: ['8124', '8125', '8126', ...]
  const jrvsNumbersArray = [
    ...new Set(jrvsRepeatedMatchesArray.map((match) => match[1])),
  ]

  // 4. Create and array of objects with the JRV number and routes images attributes
  // Result example:
  // [
  //   {
  //     jrv: '8124',
  //     images: [
  //       'img/13-04/004/21812433.png',
  //       'img/13-04/004/21812431.png',
  //     ]
  //   }
  //   {
  //     jrv: '8125',
  //     images: [
  //       'img/13-04/004/21812533.png',
  //       'img/13-04/004/21812531.png',
  //     ]
  //   },
  //   ...
  // ]
  const jrvs = jrvsNumbersArray.map((jrvNumber) => {
    const images = jrvsRepeatedMatchesArray.filter(
      (match) => match[1] === jrvNumber
    )

    return {
      jrv: jrvNumber,
      images: images.map((route) => route[0]),
    }
  })

  return jrvs
}

const getJrvByNumber = (data, jrvNumber) => {
  const jrvs = getJrvs(data)
  return jrvs.find((jrv) => jrv.jrv === jrvNumber)
}

export { getJrvs, getJrvByNumber }
