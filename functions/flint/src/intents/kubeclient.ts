import {Core, Extensions} from 'kubernetes-client'
import parser from './nginx-log-parser'

const apiClient = new Core({
    url: 'https://104.154.69.40',
    insecureSkipTlsVerify: true,
    auth: {
        bearer: '<KEY>'
    }
});


const ext = new Extensions({
    url: 'https://104.154.69.40',
    insecureSkipTlsVerify: true,
    auth: {
        bearer: '<KEY>'
    }
});

let toPromise = function (target) {
    return new Promise<any>(function (resolve, reject) {
        target.call(this, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

let toPromise2 = function (target, next) {
    return new Promise<any>(function (resolve, reject) {
        target.call(this, next, function (err, result) {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

class KubeClient {
    getNodes() {
        return toPromise(apiClient.nodes.get);
    }

    getServices() {
        return toPromise(apiClient.namespaces.services.get)
    }

    getDeployments(name) {
        return toPromise(ext.namespaces.deploy(name).get)
    }

    scaleUp(newValue) {
        let deployments = ext.namespaces.deploy('hello-server');
        return toPromise2(deployments.scale.patch,{
            body: {
                name: 'hello-server',
                spec: { replicas: newValue}
            }
        })
    }

    getStream(logCount) {
        let stream = apiClient.ns.po('v1-nginx-nginx-ingress-controller-594cff7fd7-r942x').log.getStream();
        let chunkStr = "";
        stream.on('data', chunk => {
            chunkStr += chunk.toString();
        });
        stream.on('end', () => {
            let log = chunkStr.split('\n')
            log = log.map(item=>parser(item)).filter(item=>(item['user_agent']!=="\"Prometheus/1.8.2\"" ))
            if(logCount){log = log.slice(log.length - logCount)}
            return toPromise(log);
        })

    }
}

export default new KubeClient();
