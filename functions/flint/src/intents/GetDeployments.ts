import {app} from 'alexa-app';
import Client from './kubeclient'

export default function(flint: app) {
  flint.intent("GetDeployment", {
      "utterances": ["get deployments"]
    },
    function(request, response) {
      return Client.getDeployments("hello-server").then((result) => {
          let replicas = result.status.availableReplicas;
          return response.say("Deployment has " + replicas + " available replicas").send();
      }).catch(err => {
          return response.say("cant find that deployment: " + err.toString()).send()
      })
    }
  );
}
