import * as d3 from 'd3'
import { Sentiment } from "./types"
import { paths, getSelectedFill } from "./util"

class Widget {
    constructor(queue, scale, {arc, g}) {
        this.queue = queue
        this.scale = scale
        this.g = g
        this.arc = arc
        this.getSelectedFill = getSelectedFill(queue)
        this._create()
    }
    _create() {
      this.g
        .datum([100])
        .selectAll("path")
        .data(paths)
        .enter()
        .append("path")
        .attr("d", this.arc)
        .each(function(d) {
            this._current = d
        })
      this.g
        .append("text")
        .text("0%")
        .attr("id", "widgetValue")
        .attr("length", "50pc")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "28")
        .attr("font-weight", "bold")
        .attr("transform", "translate(0, 10)")
      this.g
        .append("text")
        .text("Neutral")
        .attr("id", "widgetType")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "36")
        .attr("font-weight", "bold")
        .attr("transform", "translate(0, 100)")
    }
    /**
     * Widget displays dominant or selected
     */
    update() {
        const self = this
        const { confidence, sentiment } = this.queue.getWidgetData()
        const fill = this.getSelectedFill({ sentiment, confidence })
        this.g
            .datum([confidence])
            .selectAll("path")
                .data(paths)
            .transition()
                .duration(2000)
                .ease("circleInOut")
                .attr("fill", fill)

                .attrTween("d", function (d) {
                    var interpolate = d3.interpolate(this._current, d)
                    this._current = interpolate(0)
                    return t => self.arc(interpolate(t))
                })
        this.g
            .select("#widgetValue")
            .transition()
                .duration(2000)
                .ease("circleInOut")
                .attr("fill", fill)
                .text(parseInt(confidence) + "%")
                .tween("text", function (d) {
                    var interpolate = d3.interpolateString(this._current || "0%", d)
                    this._current = d
                    return (t) => {
                        const updated = Math.floor(interpolate(t)) + "%"
                        return d3.select(this).text(updated)
                    }
                })
        this.g
            .select("#widgetType")
            .transition()
                .duration(2000)
                .ease("circleInOut")
                .text(Sentiment[sentiment])
                .attr("fill", this.getSelectedFill({ sentiment, confidence: 100 }))
    }
}

export default Widget
