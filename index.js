const through = require('through2')

const isRetraction = data => {
  if (data['update-to'][0].type.toLowerCase().trim() == 'retraction') {
    console.log('properly reported retracion')
    return true
  } else if (/^retract(ed|ion)/.test(data.title[0].toLowerCase().trim())) {
    console.log('improperly reported retraction')
    return true
  }
  return false
}

const convert = data => {
  if (!data['update-to']) throw new Error('CrossRef entry is not an update')
  return {
    retracted: isRetraction(data),
    timestamp: data['update-to'][0].updated.timestamp,
    updates: [
      {
        timestamp: data.indexed.timestamp,
        identifier: { doi: data.DOI },
        type: data['update-to'][0].type
      }
    ],
    identifier: { doi: data['update-to'][0].DOI },
    journal: data['container-title'][0],
    publisher: data.publisher,
    title: data.title[0]
  }
}

const crossref2retraction = (data, enc, done) => {
  let converted
  try {
    converted = convert(data)
  } catch (e) {
    return done(e)
  }
  return done(null, converted)
}

module.exports = {
  convert: convert,
  stream: through.ctor({ objectMode: true }, crossref2retraction)
}
