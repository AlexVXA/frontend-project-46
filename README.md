### Hexlet tests and linter status:

[![Actions Status](https://github.com/AlexVXA/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/AlexVXA/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/7203edc13b34a40f324b/maintainability)](https://codeclimate.com/github/AlexVXA/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/7203edc13b34a40f324b/test_coverage)](https://codeclimate.com/github/AlexVXA/frontend-project-46/test_coverage)

## :octocat: genDiff, the command-line utility.

genDiff is a powerful command-line program that enables users to compare two files, be it JSON or YAML, and output the result in three different formats: **stylish**, **plain**, and **JSON**.

With genDiff, users can easily check for differences between two files, making the process of debugging and maintaining code much easier

## Prerequisites

Before using genDiff, users must have the following installed:

- Node.js v 17.8.0 or higher
- NPM 8.19.2 or higher
- Any current Linux distributive
- If you using Windows, you need to install WSL

## Installation

Clone this repository to your computer using '**git clone <ssh/url>**'. Open a 'frontend-project-46' directory, then throw '**make install**' (may need '**sudo**' option if you using WSL) and '**npm link**' in your console.

## Usage

For quick checkout of programm options use:

```
gendiff -h
```

Once genDiff is installed, you can use the program to compare two files and output the results in three formats:

### Stylish Output

To compare two files and output the result in stylish format, use the following command:

```
gendiff <FILEPATH1> <FILEPATH2>
```

> #### Example of work:
>
> [![asciicast](https://asciinema.org/a/RY37gqREdG0gY9ldTsRLJa18S.svg)](https://asciinema.org/a/RY37gqREdG0gY9ldTsRLJa18S)

### Plain Output

To compare two files and output the result in plain format, use the following command:

```
gendiff plain <FILEPATH1> <FILEPATH2>  -f plain
```

> #### Example of work:
>
> [![asciicast](https://asciinema.org/a/Av5COU31gsdCIKTuHx7ZtRTRr.svg)](https://asciinema.org/a/Av5COU31gsdCIKTuHx7ZtRTRr)

### JSON Output

To compare two files and output the result in JSON format, use the following command:

```
gendiff <FILEPATH1> <FILEPATH2>  -f json
```

or

```
gendiff <FILEPATH1> <FILEPATH2>  -f JSON
```

> #### Example of work:
>
> [![asciicast](https://asciinema.org/a/bhEoByqu2jfsLmgb33l73Jzz7.svg)](https://asciinema.org/a/bhEoByqu2jfsLmgb33l73Jzz7)
