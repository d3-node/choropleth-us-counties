const output = require('d3node-output')
const fs = require('fs')
const d3nMap = require('../')
const csvString = fs.readFileSync('./test/unemployment.csv').toString()
const data = d3nMap.csvParse(csvString)

const colors = [ // 9-color scheme (blue)
  '#f7fbff', '#deebf7', '#c6dbef',
  '#9ecae1', '#6baed6', '#4292c6',
  '#2171b5', '#08519c', '#08306b'
]

const scale = [ 2, 3, 4, 5, 6, 7, 8, 9 ]

output(`./test/output`, d3nMap({ data, colors, scale }))
