const Express = require('express')
const {getRS} = require('./src/queer')
const {generateExcel} = require('./src/genxlsx')

const app = Express()
const host = 'localhost'
const port = 5353

app.use(Express.json())
app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.post('/getrs', (req, res) => {
    const query = req.body.query
    getRS(query).then(rs => {
        res.send(JSON.stringify(rs))
        console.log('\nquery process success!\n')
    })
    .catch(err => {
        res.send(JSON.stringify(err))
        console.log(`\nquery process failed!\n${err}\n\n`)
    })
})

app.post('/getexcel', async (req, res) => {
    const queries = req.body.queries
    const fileFullName = `${__dirname}/temp/temporary.xlsx`
    await generateExcel(queries, fileFullName)
    .then(msg => console.log(msg.birthtime ? 'Worksheet generate at: '+msg.birthtime : msg))
    .then(_ => {
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        res.sendFile(fileFullName)
    })
})

app.listen(port, host, () => console.log(`app listening at ${host+':'+port}\n`))
