import {app} from 'alexa-app';
import Client from './kubeclient'

export default function(flint: app) {
  flint.intent("GetDeployment", {
      "utterances": ["get deployments"]
    },
    function(request, response) {
      return Client.getDeployments("hello-server").then((result) => {
          let replicas = result.status.replicas || 0;
          let available = result.status.availableReplicas || 0;
          let unavailable = result.status.unavailableReplicas || 0;
          return response.say(
              "Deployment has requested " +
               + replicas + " replicas, "
               + available + " are available and "
               + unavailable + " are unavailable"
          ).send();
      }).catch(err => {
          return response.say("cant find that deployment: " + err.toString()).send()
      })
    }
  );
}
