import Scale from "./scale"
import Queue from "./queue"
import Bar from "./bar"
import Text from "./text"
import Widget from "./widget"
import Svg from "./svg"
import { idKey } from "./util"

class Chart {
    constructor(
        selector = 'body',
        data = [],
        width = 600,
        height = 250,
        maxDisplayItems = 15,
        widgetUpdateRate = 5
    ){
        this._createSvgs(selector, height)
        this.iteration = 0
        this.data = data
        this.maxDisplayItems = maxDisplayItems
        this.widgetUpdateRate = widgetUpdateRate
        this.scale = new Scale(width, height, maxDisplayItems)
        this.queue = new Queue(this)
        this.bars = new Bar(this.queue, this.scale, this.chartSvg)
        this.texts = new Text(this.queue, this.scale, this.chartSvg)
        this.widget = new Widget(this.queue, this.scale, this.widgetSvg)
    }
    init() {
        this.bars.enter()
        this.texts.enter()
    }
    stream(item) {
        const q = this.queue.dequeue()
        this.queue.enqueue(item)

        if (this.iteration % this.widgetUpdateRate === 0)
            this.widget.update()

        this.init()

        const id = idKey()
        this.bars.transition(id)
        this.texts.transition(id)
        if (q) {
            this.bars.exit()
            this.texts.exit()
        }

        this.iteration++
    }
    _createSvgs(selector, height) {
        const svgFactory = Svg(selector)
        this.chartSvg = svgFactory.createChart()
        this.widgetSvg = svgFactory.createWidget(height)
    }
}

export default Chart
