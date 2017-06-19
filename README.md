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
lab anything --argument1 --argument2
```

### In piped mode

```sh
anything | lab
```

### List all scripts

```ruby
lab list
```

## Future

### Run a script by ID

```sh
lab run id
```

### Run a daemon to allow running scripts remotely

```sh
lab remote
```

### Share experiment

```sh
lab share
```