import {app} from 'alexa-app';
import Client from './kubeclient'

export default function(flint: app) {
  flint.intent("ClusterStatus", {
      "utterances": ["cluster status"]
    },
    function(request, response) {
      Client.nodes.get((err, reply) => {
          if(err) {
              response.say("it broke").send()
          } else {
              let nodeCount = reply.items.length;
              response.say("You have " + nodeCount + " running").send();
          }
      });
      return false;
    }
  );
}
