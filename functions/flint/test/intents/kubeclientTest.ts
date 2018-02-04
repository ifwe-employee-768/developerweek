import Client from '../../src/intents/kubeclient'
import 'mocha'

describe("Client", () => {
    it('should make a call', function () {
        Client.getNodes().then((result) => {
            console.log(result)
        })
    });

    it('should get services', function () {
        Client.getServices().then((result) => {
            console.log(result)
        })
    });

    it('should get deployments', function () {
        Client.getDeployments("hello-server").then((result) => {
            console.log(result)
        })
    });

    it('should get scaleUp', function () {
        Client.scaleUp(1);
    });

    it('should get stream', function () {
        Client.getStream(1000).then((cat) => {
            console.log(cat)
        });
    });
});
