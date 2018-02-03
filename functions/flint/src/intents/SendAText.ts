import {app} from 'alexa-app';

import * as TeleSignSDK from 'telesignsdk'
var customerId = 'A0B98120-2450-47C5-B37C-17441B3808BD'; // find in portal.telesign.com
var apiKey = 'bjFvYpJnbPC7Pigi7WnZlq7k1Hhfdx04rXccR9iuDVZmKefVagPitECE32NHbwVFD6tqqJEmdaoxWkpQ44Zvbg==';
var restEndpoint = "https://rest-api.telesign.com";

var telesign = new TeleSignSDK(customerId,
    apiKey,
    restEndpoint
);


export default function(flint: app) {
    flint.intent("AuthenticateMe", {
            "utterances": ["authenticate me"]
        },
        function(request, response) {
            var phoneNumber = "13143153242"; // Your end user’s phone number, as a string of digits without spaces or
            // punctuation, beginning with the country dialing code (for example, “1” for North America)
            var message = "You're scheduled for a dentist appointment at 2:30PM.";
            var messageType = "ARN"; // ARN = Alerts, Reminders, and Notifications; OTP = One time password; MKT = Marketing

            telesign.sms.message(function(err, reply){
                    if(err){
                        response.say("Whoops an error")
                    }
                    else{
                        response.say("Sending a text").send();
                        response.setSessionAttributes({referenceId: reply.reference_id});
                    }
                },
                phoneNumber,
                message,
                messageType
            );

            response.say("Check your texts messages");
            response.shouldEndSession(false);
            return false;
        }
    );
}
