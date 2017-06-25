![](./screenshot.png)

## About

CLI for data science

## Installation

```sh
git clone https://github.com/kristjanjansen/lab
cd lab
npm install -g
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

## Future

#### Run a script by tagname

```sh
lab run tagname
```

#### Run script as a cloud function / Docker container

```sh
lab cloud script.sh
```

### Share experiment

```sh
lab share
```