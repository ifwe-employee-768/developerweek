import Client from '../../src/intents/kubeclient'

describe("Client", () => {
    it('should make a call', function () {
        function print(err, result) {
            console.log(JSON.stringify(err || result, null, 2));
        }

        Client.nodes.get(print)

    });
});
