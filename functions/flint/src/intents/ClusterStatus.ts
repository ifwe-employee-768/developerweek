import {app} from 'alexa-app';
import Client from './kubeclient'

export default function(flint: app) {
  flint.intent("ClusterStatus", {
      "utterances": ["cluster status"]
    },
    function(request, response) {
      return Client.getNodes().then((result) => {
          let nodeCount = result.items.length;
          return response.say("You have " + nodeCount + " nodes running").send();
      })
    }
  );
}
