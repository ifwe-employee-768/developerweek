import {Core, Extensions} from 'kubernetes-client'
import parser from './nginx-log-parser'

const apiClient = new Core({
    url: 'https://104.154.69.40',
    insecureSkipTlsVerify: true,
    auth: {
        bearer: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImxhbWJkYS1yb2JvdC10b2tlbi1yYnNzbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJsYW1iZGEtcm9ib3QiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI4YzQ3ZWEyMC0wOTM4LTExZTgtYmZhYi00MjAxMGE4MDAwMTQiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpsYW1iZGEtcm9ib3QifQ.Bv_y5aFSFyUzvzHOmgkdW7-MMXAW4UabTosMB3CNGCAW7jNV1EJpWW5DpYVBFOJKjyDYdzmFK2IU4IIa6136ydJd5qKOZRcxQAeKKLshCcpCy9mFjR5PV4whiBUJj5YjpNUeBTkx53dmc9Cbr-x9H2P7x-RW38T4GUbiVxbU4wc3qL2rFtJFoyHwK50UdIvNbhvZTbnk_aEERG74NEBKQHGCDQ-JzY38KNP8bjp_0L7aOhl5m4JQ-IRnLQn7TUzEv2nClOnWoSSOJ8usoeHx_WT4fVkxGMYcIP7XcC6p31ZQcdbRgerCExoGGw_CMgq9h_7vXSpHi7g_KlnNpbWiKg'
    }
});


const ext = new Extensions({
    url: 'https://104.154.69.40',
    insecureSkipTlsVerify: true,
    auth: {
        bearer: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJrdWJlcm5ldGVzL3NlcnZpY2VhY2NvdW50Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9uYW1lc3BhY2UiOiJkZWZhdWx0Iiwia3ViZXJuZXRlcy5pby9zZXJ2aWNlYWNjb3VudC9zZWNyZXQubmFtZSI6ImxhbWJkYS1yb2JvdC10b2tlbi1yYnNzbiIsImt1YmVybmV0ZXMuaW8vc2VydmljZWFjY291bnQvc2VydmljZS1hY2NvdW50Lm5hbWUiOiJsYW1iZGEtcm9ib3QiLCJrdWJlcm5ldGVzLmlvL3NlcnZpY2VhY2NvdW50L3NlcnZpY2UtYWNjb3VudC51aWQiOiI4YzQ3ZWEyMC0wOTM4LTExZTgtYmZhYi00MjAxMGE4MDAwMTQiLCJzdWIiOiJzeXN0ZW06c2VydmljZWFjY291bnQ6ZGVmYXVsdDpsYW1iZGEtcm9ib3QifQ.Bv_y5aFSFyUzvzHOmgkdW7-MMXAW4UabTosMB3CNGCAW7jNV1EJpWW5DpYVBFOJKjyDYdzmFK2IU4IIa6136ydJd5qKOZRcxQAeKKLshCcpCy9mFjR5PV4whiBUJj5YjpNUeBTkx53dmc9Cbr-x9H2P7x-RW38T4GUbiVxbU4wc3qL2rFtJFoyHwK50UdIvNbhvZTbnk_aEERG74NEBKQHGCDQ-JzY38KNP8bjp_0L7aOhl5m4JQ-IRnLQn7TUzEv2nClOnWoSSOJ8usoeHx_WT4fVkxGMYcIP7XcC6p31ZQcdbRgerCExoGGw_CMgq9h_7vXSpHi7g_KlnNpbWiKg'
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

    createDeployment(deployment, service, ingress) {
        return toPromise2(ext.namespaces.deployments.post,{ body: deployment })
            .then(() => toPromise2(apiClient.namespaces.services.post,{ body: service }))
            .then(() => toPromise2(ext.namespaces.ingresses.post, { body: ingress}));
    }

    scaleUp(newValue) {
        let deployments = ext.namespaces.deploy('hello-server');
        return toPromise2(deployments.patch,{
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
