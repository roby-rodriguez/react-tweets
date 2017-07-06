import { Sentiment } from "./types"

class Queue {
    constructor({ data, maxDisplayItems }){
        this.data = []
        this.total = {}
        this.maxDisplayItems = maxDisplayItems
        this._initTotal()
        this._initData(data)
    }
    enqueue(item) {
        this.data.push(item)
        this.total[item.sentiment]++
        this._updateDominant()
    }
    dequeue() {
        let q
        if (this.isFull()) {
          q = this.data.shift()
          this.total[q.sentiment]--
        }
        return q
    }
    isFull() {
/*
      for (const type of this.total) {
        if (this.total[type] < this.maxDisplayItems)
          return false
      }
      return true
*/
        if (this.dominant.count < this.maxDisplayItems)
            return false
        return true
    }
    /**
     * Items to display in bar chart (i.e. live-stream or filtered live-stream)
     */
    getDisplayData() {
        let displayData = this.data
        if (this.selected) {
            displayData = this.data.filter(({sentiment}) => sentiment === this.selected)
        }
        return displayData.slice(0, this.maxDisplayItems - 1)
    }
    /**
     * Display average of selection or dominant
     */
    getWidgetData() {
        const data = this.getDisplayData()
        return data.reduce((acc, cur) => acc + cur) / data.length
    }
    isDominant(sentiment) {
        return this.dominant.sentiment === sentiment
    }
    selectionExists() {
        return !!this.selected
    }
    /**
     * Tells if queue supports shrinking of given 'sentiment'
     */
    selectionAllowed(sentiment) {
        this.total[sentiment] > this.maxDisplayItems
    }
    toggleSelection(sentiment) {
        if (this.total[sentiment] > this.maxDisplayItems) {
            if (this.selected) {
                this.flashTexts = false
                this.selected = null
            } else {
                this.flashTexts = true
                this.selected = sentiment
            }
        }
    }
    _updateDominant() {
        let max = -1
        let dominant
        for (const sentiment of Object.keys(this.total)) {
            if (this.total[sentiment] > max) {
                dominant = sentiment
                max = this.total[sentiment]
            }
        }
        this.dominant = {
            sentiment: dominant,
            count: max
        }
    }
    _initData(data) {
        for (const item of data) {
            this.data.push({
                sentiment: item.sentiment,
                confidence: item.confidence
            })
            this.total[item.sentiment]++
        }
    }
    _initTotal() {
        this.dominant = {
            sentiment: Sentiment.Neutral,
            count: -1
        }
        for (const key of Object.keys(Sentiment)) {
            this.total[Sentiment[key]] = 0
        }
    }
}

export default Queue
