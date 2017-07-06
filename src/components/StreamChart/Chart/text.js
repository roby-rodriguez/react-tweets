class Text {
    constructor(queue, scale, chartSvg) {
        this.queue = queue
        this.scale = scale
        this.svg = chartSvg
    }
    enter() {
        this._elements = this.svg
            .selectAll('text')
            .data(this.queue.getDisplayData(), ({ confidence }) => confidence)
        this._elements
            .enter()
            .append("text")
            .text(({ confidence }) => parseInt(confidence) + "%")
            .attr("x", (data, i) => this.scale.x(i, true))
            .attr("y", ({ confidence }) => this.scale.y(confidence, true))
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", 16)
            .attr("font-weight", "bold")
            .attr("fill", "white")
            .style("opacity", 0)
    }
    transition(key) {
        const transitions = this._elements
            .transition()
            .attr("id", (d, i) => "text_" + (key + i))
            .attr("data-key", (d, i) => (key + i))
            .attr("x", (data, i) => this.scale.x(i, true))
        if (this.queue.flashTexts) {
            transitions
                .style("opacity", 1)
                .transition()
                .duration(1000)
                .style("opacity", 0)
            this.queue.flashTexts = false
        }
    }
    exit() {
        this._elements
            .exit()
            .remove()
    }
}

export default Text
