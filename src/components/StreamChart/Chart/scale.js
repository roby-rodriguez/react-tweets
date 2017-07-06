import * as d3 from 'd3'

class Scale {
    constructor(width, height, maxDisplayItems){
        this._height = height

        this._xScale = d3.scale.ordinal()
          .domain(d3.range(maxDisplayItems))
          .rangeRoundBands([0, width], 0.05)

        this._yScale = d3.scale.linear()
          .domain([0, 100])
          .range([0, height])
    }
    x(index, extended) {
      if (extended)
        return this._xScale(index) + this._xScale.rangeBand() / 2
      return this._xScale(index)
    }
    y(value, extended) {
      if (extended)
        return this._height - this._yScale(value) / 2
      return this._height - this._yScale(value)
    }
    height(value) {
      return this._yScale(value)
    }
    width() {
      return this._xScale.rangeBand()
    }
}

export default Scale
