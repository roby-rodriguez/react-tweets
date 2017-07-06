import * as d3 from 'd3'

const Svg = selector => {
  const _svgRoot = d3.select(selector)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", "0 0 600 400")
  return {
    createChart() {
      return _svgRoot
        .append("svg")
        .attr("viewBox", "75 -135 400 400")
    },
    createWidget(height) {
      const _svgWidget = _svgRoot
        .append("svg")
        .attr("viewBox", "-100 65 500 500")
      return {
        arc: d3.svg.arc()
                .innerRadius(40)
                .outerRadius(60),
        g: _svgWidget.append("g")
                .attr("transform", "translate(" + height/2  + ", " + height/2 + ")")
      }
    }
  }
}

export default Svg
