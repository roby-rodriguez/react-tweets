import NProgress from 'nprogress'
import { isClient } from '../utils'

export default function nProgress(target) {
    const superComponentWillMount = target.prototype.componentWillMount
    const superComponentDidMount = target.prototype.componentDidMount
    target.prototype.componentWillMount = function() {
        if (typeof superComponentWillMount === 'function')
            superComponentWillMount.apply(this, arguments)
        if (isClient())
            NProgress.start()
    }
    target.prototype.componentDidMount = function() {
        if (typeof superComponentDidMount === 'function')
            superComponentDidMount.apply(this, arguments)
        if (isClient())
            NProgress.done()
    }
}
