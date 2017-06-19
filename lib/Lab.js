class Lab {
    
    constructor() {
    }

    // def create_experiment(self):
    // url = urllib.parse.urljoin(self.url, 'api/v1/experiments/create')
    // json_data = json.dumps({"project_name": self.project_name, "project_description": self.project_description,
    //                    "experiment_name": self.experiment_name, "options": self.__get_options_dict()})
    // response = self.__post_json(url, json_data)
    // experiment_id = response["insertedIds"][0]
    //
    // client = vanguard.Client("http://localhost:5080", parameters, "Project Name", "Experiment Name",
    //                     "Project Description")

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