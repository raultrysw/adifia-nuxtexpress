let mit = require('markdown-it')()
let fs = require('fs')
let path = require('path')
mit.use(require('markdown-it-header-sections'))
  .use(require('markdown-it-attrs'))

const main = (file, callback) => {
  console.log(fileToConvert)
  convert(fileToConvert, callback)
}

const convert = (file, callback) => {
  fs.readFile(file, (err, content) => {
    if (err) {
      console.log('hubo un error leyendo: ' + file)
      return console.log(err)
    }
    let contentInHTML = mit.render(content.toString())
    callback(contentInHTML)
  })
}

let fileToConvert = path.join(__dirname, process.argv[2])
main(fileToConvert, contentInHTML => {
  fs.readFile('sliderTemplate.vue', (err, template) => {
    if (err) return console.log(err)
    let output = template.toString().replace('<!--Slider-->', contentInHTML)
    fs.writeFile('components/Slider.vue', output)
  })
})

// module.exports = main
