const Sequelize = require('sequelize')

const sequelize = new Sequelize('rapiddb', 'rapiddb', 'rapiddb', {
    host : '192.168.0.114'
    , dialect : 'mysql'
})

const getRS = query => sequelize.query(query)
const getRSs = queries => {
    const resultSets = []
    
    return new Promise( (res, rej) => {
        Promise.all(queries.map(query => getRS(query)))
        .then(rss => rss.forEach(rs => resultSets.push(rs[0])))
        .then(_ => res(resultSets))
        .catch(err => {
            console.log(`\nQuery process failed!\n${err}\n\n`)
            rej(err)
        })
    })
}

module.exports = {
    getRS, getRSs
}
