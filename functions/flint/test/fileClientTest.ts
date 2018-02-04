import fileClient from '../src/intents/fileClient'

describe("fileClient", () => {
    it('should do the thing', function () {
        fileClient.getFile("deployment.json").then((data) => {
            console.log(data)
        })
    });
});
