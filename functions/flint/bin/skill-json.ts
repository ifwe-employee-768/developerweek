
import flint from '../src/flint'
import * as fs from 'fs';
import * as path from 'path';

const schema = flint.schemas.askcli("captain flint");

fs.writeFile(path.join(__dirname, "skillbuilder.json"), schema, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
