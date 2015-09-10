
function Client(){
    _.defaults(this, {
        type: 'client',
        name: 'Client Name',
        style: {
            visible: true,
        },
        input: []
    });

}
module.exports = Client;