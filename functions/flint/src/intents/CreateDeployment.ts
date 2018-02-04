import client from './kubeclient'
import {app} from 'alexa-app';

declare function require(path: string): any;

// Game input
let game = "docker-web-game";
let image = "dubuqingfeng/docker-web-game";

let gameData = {

}

// Deployment
let deploymentObject = require('./deployment.json');
deploymentObject.metadata.labels.run = game;
deploymentObject.metadata.name = game;
deploymentObject.spec.selector.matchLabels.run = game;
deploymentObject.spec.template.metadata.labels.run = game;
deploymentObject.spec.template.spec.containers[0].image += image;
deploymentObject.spec.template.spec.containers[0].name = game;

// Service
let serviceObject = require('./service.json');
serviceObject.metadata.labels.run = game;
serviceObject.metadata.name = game;
serviceObject.spec.selector.run = game;


// Ingresses
let ingressObject = require('./ingress.json');
ingressObject.metadata.name = game;
ingressObject.spec.rules[0].host = game + ".hearthbeans.tech";
ingressObject.spec.rules[0].http.paths[0].backend.serviceName = game;

export default function (app: app) {
    app.intent('DeployContainerIntent', {
            'slots': {
                'WORD': 'deployment',
            },
            'utterances': [
                'deploy {-|WORD}'
            ]
        },
        function (req, res) {
            var word = req.slot('WORD');
            res.say("Deploying " + word);
            return client.createDeployment(deploymentObject, serviceObject, ingressObject)
                .then(() => res.say("Deployment accepted").send())
                .catch((err) => res.say(err).send())
        }
    );
}
