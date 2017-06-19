var axios = require('axios')

class Lab {
    
    constructor() {
        this.api = axios.create({
          baseURL: 'http://localhost:5080/api/v1'
        })
    }

    _createExperiment() {
        this.api.post('experiments/create', {
            project_name: 'Project Name',
            experiment_name: 'Experiment from Lab.js',
            options: {
                'epoch': {type: 'int', default: 100}
            },
            tags: []
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => console.log(error))
    }

    _registerMachine() {
        var specs = {"address":"https://localhost:5081","hostname":"Name_Of_Machine_from_Lab_js","os":{"type":"Darwin","platform":"darwin","arch":"x64","release":"15.6.0"},"cpus":["Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz","Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz","Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz","Intel(R) Core(TM) i5-5257U CPU @ 2.70GHz"],"mem":"8GB","gpus":["Intel Iris Graphics 6100"]}
        this.api.post('machines', specs)
            .then(res => {
                this.machineId = res.data._id
                var experiments = {"5937e851f82cb485764f70a4":{"cwd":"/Users/kristjanjansen/Documents/projects/pro/vanguard","command":"python3","args":["main.py"],"options":"double-dash","capacity":1,"results":"/Users/kristjanjansen/Documents/projects/pro/vanguard"}}
                this.api.post(`machines/${this.machineId}/experiments`, { experiments })
                    .then(res => console.log(res.data))
                    .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
    }

    sendFile(file) {}
    //files = {'file': (file.name, file)}
    //response = requests.put(urllib.parse.urljoin(self.url, "/api/v1/runs/{}/file".format(self.run_id)), files=files,

    sendMetric(metric, value) {}
    // json = {"_scores": {metric: value}}
    // response = requests.put(urllib.parse.urljoin(self.url, "/api/v1/runs/" + self.run_id), json=json, verify=not use_ssl)

    sendValue(key, value) {}
    // json = {name: value}
    // response = requests.put(urllib.parse.urljoin(self.url, "/api/v1/runs/" + self.run_id), json=json, verify=not use_ssl)

    sendNote(value) {}
    // json = {"_notes": value}
    // response = requests.put(urllib.parse.urljoin(self.url, "/api/v1/runs/" + self.run_id), json=json, verify=not use_ssl)

    sendLog(msg) {
        console.log(msg)
    }
    // json = {"type": 'stdout', "msg": msg}
    // response = requests.put(urllib.parse.urljoin(self.url, "/api/v1/runs/{}/logs".format(self.run_id)), json=json,

}

module.exports = Lab