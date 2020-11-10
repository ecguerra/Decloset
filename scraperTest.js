const request = require('request')
const cheerio = require('cheerio')
const URL = 'https://www.homelessshelterdirectory.org/cgi-bin/id/city.cgi?city=Boston&state=MA'

request(URL, (error, response, body) => {
    let $ = cheerio.load(body)
    let results = $('.item_content')
    let resultNames = results.map((index,element) => {
        return {
            name: $(element).find('a').text(),
            detail: $(element).find('a').attr('href'),
            // address: $(element).text()
        }
    })
    console.log(resultNames.get())
})