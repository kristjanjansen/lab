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

### Running daemon to allow running scripts remotely (TBD)

```
lab remote
```