const request = require('request')
const cheerio = require('cheerio')
const URL = 'https://www.homelessshelterdirectory.org/cgi-bin/id/city.cgi?city=Boston&state=MA'

request(URL, (error, response, body) => {
    let $ = cheerio.load(body)
    let results = $('.listings .item_content')
    let resultNames = results.map((index,element) => {
        let filterName = $(element).find('a').text()
        filterName = filterName.substring(0, filterName.length - 18)
        return {
            name: filterName,
            detail: $(element).find('a').attr('href'),
            // address: $(element).text()
        }
    })
    console.log(resultNames.get())
})