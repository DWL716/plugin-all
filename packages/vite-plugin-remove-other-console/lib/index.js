const baseBabel = require('./babel')
export default (name) => {
    const babelConsoleName = baseBabel(name)
    return {
        name: 'remove-console',
        transform(scr, id) {
            if(/\.(vue|js|ts)$/.test(id)) {
                console.log(id, '\n\n');
                // console.log('scr---\n', scr);
                return babelConsoleName(scr)
                // return babelConsole(scr)
            }
        }
    }
}