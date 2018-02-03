import {app} from "alexa-app";

const flint = new app("flint");

import clusterStatus from './intents/ClusterStatus'
import sendAText from './intents/SendAText'

clusterStatus(flint);
sendAText(flint);

export default flint
