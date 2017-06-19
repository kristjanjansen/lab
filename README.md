![](./screenshot.png)

## About

CLI for data science

## Installation

```sh
git clone https://github.com/kristjanjansen/lab
cd lab
npm install -g
```

 ## Usage

### In NodeJS script running mode

```sh
lab script.js --argument1 --argument2
```

### In Python script running mode

```sh
lab script.py --argument1 --argument2
```

### In R / shell script / etc mode (TBD)

```sh
lab anythingrunnable --argument1 --argument2
```

### In piped mode

```sh
anythingrunnable | lab
```

### List all scripts

```
lab list
```

### Run a script by ID

```
lab run id
```

### Run a daemon to allow running scripts remotely

```
lab remote
```