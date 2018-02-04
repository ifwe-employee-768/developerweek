
import Client from './kubeclient'
import {app} from 'alexa-app';

export default function(app: app) {
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
            return Client.scaleUp(parseInt(value)).then(() =>
                res.say("Request Accepted").send()
            )
        }
    );
}
