import SendAText from '../../src/intents/SendAText'
import {app} from 'alexa-app';
import 'mocha'

describe("shit", () => {
    it('should do the thing', function () {
        SendAText(new app("test"))
    });
});

