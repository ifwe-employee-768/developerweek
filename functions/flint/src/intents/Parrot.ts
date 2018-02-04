
export default function (app) {
    app.intent('RepeatIntent', {
            'slots': {
                'VALUE': 'AMAZON.NUMBER',
                'WORD': 'deployment',
            },
            'utterances': [
                'repeat {-|WORD} {-|VALUE}'
            ]
        },
        function (req, res) {
            var value = req.slot('VALUE');
            var word = req.slot('WORD');
            res.say("You said " + word);
            for (var i = 0; i < value; i++) {
                res.say("I repeat, you said" + word);
            }
        }
    );
}
