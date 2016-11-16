export function isClient() {
    return !isServer()
}
export function isServer() {
    return !(typeof window != 'undefined' && window.document)
}
