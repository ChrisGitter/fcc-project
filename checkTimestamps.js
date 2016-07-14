var dateFormat = require('dateformat');

function checkTimestamps(req) {
    var noInput = JSON.stringify({
        unix: null,
        natural: null
    })
    if (!req) return noInput
    req = req.split('').slice(1).join('')
    var date = new Date(decodeURIComponent(req)).getTime()
    if (isNaN(date)) date = new Date(decodeURIComponent(req)*1000).getTime()
    if (!date || date <= 0) return noInput
    return JSON.stringify({
        unix: date/1000,
        natural: dateFormat(date, 'mmmm d, yyyy')
    })
}

module.exports = checkTimestamps