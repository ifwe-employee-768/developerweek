import {Core, Extensions} from 'kubernetes-client'

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
}

export default new KubeClient();
