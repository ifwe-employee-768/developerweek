
import Client from './kubeclient'

export default function(app) {
    app.intent('ScaleUpIntent', {
            'slots': {
                'VALUE': 'AMAZON.NUMBER'
            },
            'utterances': [
                'scale {up|down} to {-|VALUE}'
            ]
        },
        function(req, res) {
            var value = req.slot('VALUE');
            res.say("Scaling to " + value + " replicas");
            Client.scaleUp(parseInt(value)).then(result => {
                return res.say("accepted").send()
            })
        }
    );
}
