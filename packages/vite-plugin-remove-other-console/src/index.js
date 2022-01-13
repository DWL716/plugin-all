const baseBabel = require('./babel')
module.exports = (name) => {
    const babelConsoleName = baseBabel(name)
    return {
        name: 'remove-console',
        transform(scr, id) {
            if(/\.(vue|js|ts)$/.test(id)) {
                return babelConsoleName(scr)
            }
        }
    }
}