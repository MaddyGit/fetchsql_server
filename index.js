const Express = require('express')
const {getRS} = require('./src/queer')

const app = Express()
const host = 'localhost'
const port = 5353

app.use(Express.json())

app.post('/getrs', (req, res) => {
    const query = req.body.query
    
    getRS(query).then(rs => {
        res.send(JSON.stringify(rs))
        console.log('\nquery process success!\n')
    })
    .catch(err => {
        res.send(JSON.stringify(err))
        console.log(`\nquery process failed!\n${err.name+': '+err.original.sqlMessage}\n\n`)
    })
})

app.listen(port, host, () => console.log(`app listening at ${host+':'+port}\n`))
