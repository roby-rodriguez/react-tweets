import NProgress from 'nprogress'
import { isClient } from '../utils'

const configDefault = () => {
    NProgress.configure({ showSpinner: false })
}

const configAjax = () => {
    NProgress.configure({
        trickleRate: 0.37,
        trickleSpeed: 1000
    })
}

export default target => {
    // component mount
    const superComponentWillMount = target.prototype.componentWillMount
    const superComponentDidMount = target.prototype.componentDidMount
    // component receive props
    const superComponentWillReceiveProps = target.prototype.componentWillReceiveProps
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
    target.prototype.componentWillReceiveProps = function() {
        if (typeof superComponentWillReceiveProps === 'function')
            superComponentWillReceiveProps.apply(this, arguments)
        const { isFetching } = arguments[0]
        if (isFetching !== 'undefined') {
            configAjax()
            if (isFetching)
                NProgress.start()
            else
                NProgress.done()
        }
    }
}
