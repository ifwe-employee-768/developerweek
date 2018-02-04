import * as request from 'request'

export default {
    getFile: (fileName) => {
        let uri = 'http://18.144.24.30:8000/k8s/templates/' + fileName;


        return new Promise(function(resolve, reject) {
            request(uri, {json: true}, (err, result) => {
                if(err) {reject(err) }
                else {
                    resolve(result.body)
                }
            })
        })
    }
}
