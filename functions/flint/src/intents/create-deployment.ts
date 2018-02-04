const Api = require('kubernetes-client');
const core = new Api.Core({
  url: 'https://104.154.69.40',
  version: 'v1',  // Defaults to 'v1'
  insecureSkipTlsVerify: true,
  auth: {
    bearer: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImxhbWJkYS1yb2JvdC10b2tlbi1yYnNzbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJsYW1iZGEtcm9ib3QiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI4YzQ3ZWEyMC0wOTM4LTExZTgtYmZhYi00MjAxMGE4MDAwMTQiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpsYW1iZGEtcm9ib3QifQ.Bv_y5aFSFyUzvzHOmgkdW7-MMXAW4UabTosMB3CNGCAW7jNV1EJpWW5DpYVBFOJKjyDYdzmFK2IU4IIa6136ydJd5qKOZRcxQAeKKLshCcpCy9mFjR5PV4whiBUJj5YjpNUeBTkx53dmc9Cbr-x9H2P7x-RW38T4GUbiVxbU4wc3qL2rFtJFoyHwK50UdIvNbhvZTbnk_aEERG74NEBKQHGCDQ-JzY38KNP8bjp_0L7aOhl5m4JQ-IRnLQn7TUzEv2nClOnWoSSOJ8usoeHx_WT4fVkxGMYcIP7XcC6p31ZQcdbRgerCExoGGw_CMgq9h_7vXSpHi7g_KlnNpbWiKg',
  },
});

function print(err, result) {
  console.log(JSON.stringify(err || result, null, 2));
}

const ext = new Api.Extensions({
  url: 'https://104.154.69.40',
  insecureSkipTlsVerify: true,
  auth: {
    bearer: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImxhbWJkYS1yb2JvdC10b2tlbi1yYnNzbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJsYW1iZGEtcm9ib3QiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI4YzQ3ZWEyMC0wOTM4LTExZTgtYmZhYi00MjAxMGE4MDAwMTQiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpsYW1iZGEtcm9ib3QifQ.Bv_y5aFSFyUzvzHOmgkdW7-MMXAW4UabTosMB3CNGCAW7jNV1EJpWW5DpYVBFOJKjyDYdzmFK2IU4IIa6136ydJd5qKOZRcxQAeKKLshCcpCy9mFjR5PV4whiBUJj5YjpNUeBTkx53dmc9Cbr-x9H2P7x-RW38T4GUbiVxbU4wc3qL2rFtJFoyHwK50UdIvNbhvZTbnk_aEERG74NEBKQHGCDQ-JzY38KNP8bjp_0L7aOhl5m4JQ-IRnLQn7TUzEv2nClOnWoSSOJ8usoeHx_WT4fVkxGMYcIP7XcC6p31ZQcdbRgerCExoGGw_CMgq9h_7vXSpHi7g_KlnNpbWiKg',
  },
});

// Game input
let game = "docker-web-game";
let image = "dubuqingfeng/docker-web-game";

// Deployment
let deploymentObject = require('./deployment.json');
deploymentObject.metadata.labels.run = game;
deploymentObject.metadata.name = game;
deploymentObject.spec.selector.matchLabels.run = game;
deploymentObject.spec.template.metadata.labels.run = game;
deploymentObject.spec.template.spec.containers[0].image += image;
deploymentObject.spec.template.spec.containers[0].name = game;

print(null, deploymentObject);
ext.namespaces.deployments.post({ body: deploymentObject }, print);


// Service
let serviceObject = require('./service.json');
serviceObject.metadata.labels.run = game;
serviceObject.metadata.name = game;
serviceObject.spec.selector.run = game;

print(null, serviceObject);
core.namespaces.services.post({ body: serviceObject }, print);


// Ingresses
let ingressObject = require('./ingress.json');
ingressObject.metadata.name = game;
ingressObject.spec.rules[0].host = game + ".hearthbeans.tech";
ingressObject.spec.rules[0].http.paths[0].backend.serviceName = game;

print(null, ingressObject);
ext.namespaces.ingresses.post({ body: ingressObject }, print);
