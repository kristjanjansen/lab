![](./screenshot.png)

### About

CLI for data science

### Installation if you have Git and NodeJS installed

```sh
git clone https://github.com/kristjanjansen/lab
cd lab
npm link
```
---

#### Run a script

```sh
lab script.js --argument1 --argument2
```

```sh
lab script.py --argument1 --argument2
```

```sh
lab script.r --argument1 --argument2
```

#### Run in piped mode

```sh
anything | lab
```

#### List scripts

```sh
lab list
```

#### Run a script by ID

```sh
lab id
```

#### Run a server

```sh
lab server
```

---

### Future

#### Run a script by tag name

```sh
lab run tagname
```

#### Run script as a cloud function / Docker container

```sh
lab cloud script.sh
```

#### Share an experiment

```sh
lab share
```