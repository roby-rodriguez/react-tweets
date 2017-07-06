import * as d3 from 'd3'
import { getSelectedFill } from "./util"

class Bar {
    constructor(queue, scale, chartSvg) {
        this.queue = queue
        this.scale = scale
        this.svg = chartSvg
        this.getSelectedFill = getSelectedFill(queue)
    }
    enter() {
        const self = this
        this._elements = this.svg
            .selectAll('rect')
            .data(this.queue.getDisplayData(), ({confidence}) => confidence)
        this._elements
            .enter()
            .append("rect")
            .attr("x", (data, i) => this.scale.x(i))
            .attr("y", ({ confidence }) => this.scale.y(confidence))
            .attr("width", this.scale.width())
            .attr("height", ({ confidence }) => this.scale.height(confidence))
            .attr("fill", data => this.getSelectedFill(data))
            .on('mouseover', function({ sentiment }) {
                var el = d3.select(this)
                el
                    .style("stroke", "#FAFAFA")
                    .style("stroke-width", 4)
                    .style("opacity", 0.5)
                if (self.queue.selectionAllowed(sentiment))
                    el.style("cursor", "pointer")
                d3.select("text[id='text_" + el.attr("data-key")  + "']")
                    .style("opacity", 1)
            })
            .on('mouseout', function() {
                var el = d3.select(this)
                el
                    .style("stroke", "")
                    .style("opacity", 1)
                self.svg.selectAll("text")
                    .style("opacity", 0)
            })
            .on('click', ({sentiment}) => this.queue.toggleSelection(sentiment))
    }
    transition(key) {
        this._elements
            .transition()
            .attr("x", (data, i) => this.scale.x(i))
            .attr("id", (d, i) => "bar_" + (key + i))
            .attr("data-key", (d, i) => (key + i))
            .attr("width", this.scale.width())
            .attr("fill", data => this.getSelectedFill(data))
    }
    exit() {
        this._elements
            .exit()
            .transition()
            .style("opacity", 0)
            .remove()
    }
}

export default Bar
