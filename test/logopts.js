var Good = require('good');

module.exports = {
    opsInterval: 1000,
    reporters: [
        {
            reporter: Good.GoodConsole
        }, 
        {
            reporter: Good.GoodFile,
            args: ['./test/server_log', {
                events: {
                    request: '*',
                    error: '*'
                }
            }]
        }   
    ]
};




