import {app} from "alexa-app";

const flint = new app("flint");
flint.customSlot("deployment", [{
    value: "hello-server",
    id: "hello-server",
    synonyms: ["helloserver", "hello server", "woofmeister"]
}]);

import clusterStatus from './intents/ClusterStatus'
import sendAText from './intents/SendAText'
import getDeployments from './intents/GetDeployments'
import repeat from './intents/Parrot'
import scaleUp from './intents/ScaleUp'
import verifyCode from './intents/Verify'
import deployContainer from './intents/CreateDeployment'
import appStatus from './intents/ApplicationStatus'

clusterStatus(flint);
sendAText(flint);
getDeployments(flint);
repeat(flint);
scaleUp(flint);
verifyCode(flint);
deployContainer(flint);
appStatus(flint);


export default flint
