class Lab {
    
    constructor() {
    }

    // def create_experiment(self):
    // url = urllib.parse.urljoin(self.url, 'api/v1/experiments/create')
    
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