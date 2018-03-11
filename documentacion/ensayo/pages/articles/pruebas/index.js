const async = require('async')
const fs = require('fs')
const mit = require('markdown-it')()
const articles = [
  {
    title: 'FirstArticle',
    author: 'email@email.com'
  },
  {
    title: 'SecondArticle',
    author: 'email@email.com'
  },
  {
    title: 'ThirdArticle',
    author: 'email@email.com'
  },
  {
    title: 'FourthArticle',
    author: 'email@email.com'
  }
]

async.map(articles, (article, callback) => {
  let file = __dirname + '/' + article.title + '.md'
  fs.readFile(file, (err, content) => {
    if (err) return console.log(err)
    let email = article.author

    article.content = mit.render(content.toString())
    article.createdAt = Date.now()
    article.author = require('../../../store/data.json').users[email]
    article.author.email = email

    callback(null, article)
  })
}, (err, results) => {
  if (err) return console.log(err)
  fs.writeFile(__dirname + '/data.json', JSON.stringify(results))
})
