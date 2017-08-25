const topojson = require('topojson')
const topoJson = require('./us.json')
const D3Node = require('d3-node')
const d3 = D3Node.d3

const defaultStyles = `
    .states { fill: none; stroke: #fff; stroke-linejoin: round;}
    .counties { fill: none;}
`

function choroplethMap ({ data, colors, scale, idField = 0, metricField = 1, styles = defaultStyles } = {}) {
  const d3n = new D3Node({ styles })
  const path = d3.geoPath()

  let id = idField
  if (Number.isInteger(idField)) {
    id = Object.keys(data[0])[idField]
  }

  let metricProp = metricField
  if (Number.isInteger(metricField)) {
    metricProp = Object.keys(data[0])[metricField]
  }

  // create Map object for the County lookup
  const dataMap = new Map()
  data.forEach((item) => {
    dataMap.set(item[id], item[metricProp])
  })

  // County color fill
  const fill = function (d) {
    const colorScale = d3.scaleThreshold()
      .domain(scale)
      .range(colors)

    const metric = dataMap.get(d.id)
    return colorScale(metric)
  }

  const svg = d3n.createSVG(960, 700)

  svg.append('g')
      .attr('class', 'counties')
    .selectAll('path')
      .data(topojson.feature(topoJson, topoJson.objects.counties).features)
      .enter()
      .append('path')
      .attr('class', 'county')
      .attr('data-metric', function (d) {
        return dataMap.get(d.id)
      })
      .attr('data-id', function (d) {
        return d.id
      })
      .attr('fill', fill)
      .attr('d', path)

  svg.append('path')
    .datum(topojson.mesh(topoJson, topoJson.objects.states, function (a, b) { return a !== b }))
    .attr('class', 'states')
    .attr('d', path)

  return d3n
}

module.exports = choroplethMap
module.exports.d3 = d3
module.exports.dsvFormat = d3.dsvFormat
module.exports.csvParse = d3.csvParse
