import { Sentiment } from "./types"

const getSelectedFill = queue => ({ sentiment, confidence }) => {
  const c = confidence / 100
  if (queue.selectionExists()) {
    switch (sentiment) {
      case Sentiment.Positive:
        return `rgba(46, 125, 50, ${c})`
      case Sentiment.Neutral:
        return `rgba(0, 184, 212, ${c})`
      case Sentiment.Negative:
        return `rgba(211, 47, 47, ${c})`
    }
  }
  if (queue.isDominant(sentiment))
    return `rgba(2, 119, 189, ${c})`
  return `rgba(55, 71, 79, ${c})`
}

const paths = percentages =>
	percentages.map(percent => {
		var degrees = (percent/100) * 360.0
		var radians = degrees * (Math.PI / 180)
		return {
		    value: percent,
		    startAngle: 0,
		    endAngle: radians
		}
	})

const idKey = (function() {
  let i = 0
  return function() {
    if (i > 90210) i = 0
    return i++
  }
})()

export { getSelectedFill, paths, idKey }
