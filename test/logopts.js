var Good = require('good');

module.exports = {
    opsInterval: 2000,
    reporters: [{
        reporter: Good.GoodConsole
    }, {
        reporter: Good.GoodFile,
        args: ['./test/awesome_log', {
            events: {
                request: '*',
                error: '*'
            }
        }]
    }, {
        reporter: require('good-http'),
        args: ['http://localhost:8081', {
            events: {
                ops: '*'
            },
            threshold: 20,
        }]
    }]
};