import {app} from 'alexa-app';

export default function(flint: app) {
  flint.intent("VerifyCode", {
      "slots": { "CODE": "AMAZON.FOUR_DIGIT_NUMBER" },
      "utterances": [
          "verify my code {CODE}"
      ]
    },
    function(request, response) {
       response.say("Your code " + request.slot('CODE') + " is verified")
    }
  );
}
