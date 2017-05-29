module.exports = {
    isEmpty (element) {
        return element == null || element == '' || element == 'null' || element == 'undefined'
    },
    getQuery ({ query, resultType, language, until }) {
        const search = {
            q: query,
            result_type: resultType,
        }
        if (!this.isEmpty(language)) search.lang = language
        if (!this.isEmpty(until)) search.until = until
        return search
    }
}
