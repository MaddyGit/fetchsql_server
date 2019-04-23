const xl = require('excel4node')
const {getRSs} = require('./queer')

const wb = new xl.Workbook()
const ws = wb.addWorksheet('Sheet 1')

const generateExcel = (queries, fileName) => {
    return new Promise( (res, rej) => {
        getRSs(queries)
        .then(rss => writeResultSets(rss, ws, 1, 5))
        .then(_ => wb.write(fileName, (err, stats) => {
            if (err) rej(err)
            else res(stats)
        }))
        .catch(err => {
            console.log(`\nWorksheet generation failed!\n${err}\n\n`)
            rej(err)
        })
    })
}

function writeResultSets(rs, ws, startRow, rsDistance) {
    rs.forEach(function (rs) {

        if (rs != undefined && rs[0] != undefined) {
            Object.keys(rs[0]).forEach(function (key) {
                ws.cell(this.rowNumber, this.colNumber++).string(key === null ? '\\N' : typeof key === 'object' ? `${(value.getFullYear()+'').padStart(4, 0)}-${(value.getMonth()+'').padStart(2, '0')}-${(value.getDate()+'').padStart(2, '0')}` : key)
            }, {rowNumber: this.currentRow++, colNumber: 1})
        
            rs.forEach(function (row) {
                Object.values(row).forEach(function (value) {
                    ws.cell(this.rowNumber, this.colNumber++).string(value === null ? '\\N' : typeof value === 'object' ? `${(value.getFullYear()+'').padStart(4, 0)}-${(value.getMonth()+'').padStart(2, '0')}-${(value.getDate()+'').padStart(2, '0')}` : value)
                }, {rowNumber: this.rowNumber.currentRow, colNumber: 1})
                this.rowNumber.currentRow++
            }, {rowNumber: this})
        }

        this.currentRow += this.rowDistance
    
    }, {rn: startRow, rowDistance: rsDistance, get currentRow() {return this.rn}, set currentRow(val) {this.rn = val} })
}

module.exports = {generateExcel}