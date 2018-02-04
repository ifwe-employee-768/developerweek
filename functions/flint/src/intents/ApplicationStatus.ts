import {app} from 'alexa-app';
import Client from './kubeclient'
import * as UA from 'ua-parser-js'

let uaparser = new UA();

export default function(flint: app) {
  flint.intent("ApplicationStatus", {
      "utterances": ["application status ", "app status"]
    },
    function(request, response) {

      return Client.getStream(1000).then((result) => {
          let responseTime = averageResponseTime(result);
          let topUser = findTop(result);
          return response.say(responseTime + " " + topUser ).send();
      })
    }
  );
}

let findTop = (logs, category='user_agent') => {
    let latestUsers = logs.reduce((accum, log) => {
        let parsedUA = uaparser.setUA(log[category]).getResult();
        let name = parsedUA.os.name + " using " + parsedUA.browser.name;
        if(!parsedUA.os.name) {return accum}
        else if(accum[name]){
            accum[name]++
        } else {
            accum[name] = 1
        }
        return accum
    }, {});
    let sortedUsers = Object.keys(latestUsers).map(user=>[user, latestUsers[user]]).sort((a,b)=>b[1] - a[1])
    return `The top user agent was ${sortedUsers[0][0]} with ${sortedUsers[0][1]} calls`
};

let averageResponseTime = (logs) => {
    let latestUsers = logs.reduce((accum, log) => {
        if(Number(log['response_time'])) {
            return accum + Number(log['response_time'])
        } else {
            return accum
        }
    },0);
    return `The average response time was ${Math.round(latestUsers*1000/logs.length)} milliseconds.`
};
