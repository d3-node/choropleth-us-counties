## Choropleth Map of US Counties :earth_americas:

Choropleth of US counties via CSV data and custom color scale 

![map](./test/output.png)

## Install
```bash
$ npm install @d3-node/choropleth-us-counties --save
```

## Usage

```js
const d3nMap = require('@d3-node/choropleth-us-counties')

// read CSV -> parse to json
const csv = fs.readFileSync('./unemployment.csv').toString()
const data = d3nMap.csvParse(csv)

const colors = [ // 9-color scheme (blue)
  '#f7fbff', '#deebf7', '#c6dbef',
  '#9ecae1', '#6baed6', '#4292c6',
  '#2171b5', '#08519c', '#08306b'
]

const scale = [ 2, 3, 4, 5, 6, 7, 8, 9 ] // buckets for unemployment rate

const map = d3nMap({ data, colors, scale })
map.svgString() // returns <svg>
```

See [test](./test/index.js) for actual usage.

##### Output the test map to an image (PNG)
```
npm test
```

## API

#### Options 
`{ data, colors, scale, [ idField = 0, metricField = 1 ] }`
