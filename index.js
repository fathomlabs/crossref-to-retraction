const through = require('through2')

const convert = data => {
  if (!data['update-to']) throw new Error('CrossRef entry is not an update')
  return {
    retracted: data['update-to'][0].type == 'retraction',
    timestamp: data['update-to'][0].updated.timestamp,
    update: {
      timestamp: data.indexed.timestamp,
      doi: data.DOI,
      type: data['update-to'][0].type
    },
    doi: data['update-to'][0].DOI,
    journal: data['container-title'][0],
    publisher: data.publisher,
    title: data.title[0]
  }
}

const crossref2retraction = (data, enc, done) => {
  try {
    const converted = convert(data)
    done(null, converted)
  } catch (e) {
    done(e)
  }
}

module.exports = {
  convert: convert,
  stream: through.ctor({ objectMode: true }, crossref2retraction)
}
