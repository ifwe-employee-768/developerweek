import client from './kubeclient'
import {app} from 'alexa-app';
import fileClient from './fileClient'

declare function require(path: string): any;

// Game input
let game = "docker-web-game";
let image = "dubuqingfeng/docker-web-game";

const games = {
    "docker-web-game": "dubuqingfeng/docker-web-game",
    "game-2048": "blackicebird/2048",
    "pacman": "nbaillie/pacman",
}

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
            let deploymentObject, serviceObject, ingressObject;

            return fileClient.getFile("deployment.json")
                .then((dep) => {
                    deploymentObject = dep;
                    deploymentObject.metadata.labels.run = game;
                    deploymentObject.metadata.name = game;
                    deploymentObject.spec.selector.matchLabels.run = game;
                    deploymentObject.spec.template.metadata.labels.run = game;
                    deploymentObject.spec.template.spec.containers[0].image += image;
                    deploymentObject.spec.template.spec.containers[0].name = game;

                    return fileClient.getFile("service.json");
                })
                .then((serv) => {
                    serviceObject = serv;
                    serviceObject.metadata.labels.run = game;
                    serviceObject.metadata.name = game;
                    serviceObject.spec.selector.run = game;

                    return fileClient.getFile("ingress.json")
                })
                .then((ing) => {
                    ingressObject = ing;
                    ingressObject.metadata.name = game;
                    ingressObject.spec.rules[0].host = game + ".hearthbeans.tech";
                    ingressObject.spec.rules[0].http.paths[0].backend.serviceName = game;
                })
                .then(() => client.createDeployment(deploymentObject, serviceObject, ingressObject))
                .then(() => res.say("Deployment accepted").send())
                .catch((err) => res.say(err).send())
        });
}
