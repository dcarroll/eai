eai
===

Einstein.ai plugin

[![Version](https://img.shields.io/npm/v/eai.svg)](https://npmjs.org/package/eai)
[![CircleCI](https://circleci.com/gh/dcarroll/eai/tree/master.svg?style=shield)](https://circleci.com/gh/dcarroll/eai/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/dcarroll/eai?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/eai/branch/master)
[![Codecov](https://codecov.io/gh/dcarroll/eai/branch/master/graph/badge.svg)](https://codecov.io/gh/dcarroll/eai)
[![Greenkeeper](https://badges.greenkeeper.io/dcarroll/eai.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dcarroll/eai/badge.svg)](https://snyk.io/test/github/dcarroll/eai)
[![Downloads/week](https://img.shields.io/npm/dw/eai.svg)](https://npmjs.org/package/eai)
[![License](https://img.shields.io/npm/l/eai.svg)](https://github.com/dcarroll/eai/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g eai
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
eai/0.0.0 darwin-x64 node-v13.12.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx apiusage [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-apiusage---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx auth:login [-n <string>] [-f <string>] [-e <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-authlogin--n-string--f-string--e-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasets--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:create -b <string> -n <string> -t <string> [-l <string>] [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetscreate--b-string--n-string--t-string--l-string--p-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetsdelete--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:delete:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetsdeletestatus--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetsretrain--i-string--e-integer--r-number--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetstrain--i-string--n-string--e-integer--r-number--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:train:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetstrainstatus--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx apiusage [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

view api usages statistics

```
USAGE
  $ sfdx apiusage [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:apiusage --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/apiusage.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/apiusage.js)_

## `sfdx auth:login [-n <string>] [-f <string>] [-e <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

download an OAuth token for your account

```
USAGE
  $ sfdx auth:login [-n <string>] [-f <string>] [-e <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -e, --expiration=expiration                                                       number of minutes until token
                                                                                    expires

  -f, --pemlocation=pemlocation                                                     example boolean flag

  -n, --name=name                                                                   name to print

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:auth:login --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/auth/login.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/auth/login.js)_

## `sfdx eai:vision:datasets [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets

```
USAGE
  $ sfdx eai:vision:datasets [-i <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         dataset id to retrieve, if not
                                                                                    specified all datasets are retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets.js)_

## `sfdx eai:vision:datasets:create -b <string> -n <string> -t <string> [-l <string>] [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

create a new dataset

```
USAGE
  $ sfdx eai:vision:datasets:create -b <string> -n <string> -t <string> [-l <string>] [-p <string>] [-d <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --labels=labels                                                               (required) Comma-separated list of
                                                                                    labels. Maximum number of labels per
                                                                                    dataset is 250

  -d, --data=data                                                                   URL of the .zip file. The maximum
                                                                                    .zip file size you can upload from a
                                                                                    web location is 50 MB.

  -l, --language=language                                                           [default: N/A] Dataset language.
                                                                                    Optional. Default is N/A. Reserved
                                                                                    for future use.

  -n, --name=name                                                                   (required) Name of the dataset.
                                                                                    Maximum length is 180 characters.

  -p, --path=path                                                                   URL of the .zip file. The maximum
                                                                                    .zip file size you can upload from a
                                                                                    web location is 50 MB.

  -t, --type=type                                                                   (required) Type of dataset data.
                                                                                    Valid values are image and
                                                                                    image-multi-label. Available in
                                                                                    Einstein Vision API version 2.0 and
                                                                                    later.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:create --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets/create.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets/create.js)_

## `sfdx eai:vision:datasets:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset be deleted

```
USAGE
  $ sfdx eai:vision:datasets:delete -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         (required) dataset id to retrieve,
                                                                                    if not specified all datasets are
                                                                                    retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets/delete.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets/delete.js)_

## `sfdx eai:vision:datasets:delete:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get the status of a dataset delete request

```
USAGE
  $ sfdx eai:vision:datasets:delete:status -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --deletrequestid=deletrequestid                                               (required) dataset id to retrieve
                                                                                    deletion status for

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets/delete/status.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets/delete/status.js)_

## `sfdx eai:vision:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request to retrain a dataset, optionally with new params

```
USAGE
  $ sfdx eai:vision:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -e, --epochs=epochs
      Number of training iterations for the neural network. Optional. Valid values are 1–1,000.

  -i, --modelid=modelid
      (required) Id of the model to be retrained

  -p, --trainparams=trainparams
      JSON that contains parameters that specify how the model is created.

  -r, --learningrate=learningrate
      Specifies how much the gradient affects the optimization of the model at each time step. Optional. Use this 
      parameter to tune your model. Valid values are between 0.0001 and 0.01. If not specified, the default is 0.0001. We 
      recommend keeping this value between 0.0001 and 0.001.    This parameter isn't used when training a detection 
      dataset.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

EXAMPLE
  $ sfdx eai:vision:datasets:retrain --modelid 57
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets/retrain.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets/retrain.js)_

## `sfdx eai:vision:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset begin a trainging run

```
USAGE
  $ sfdx eai:vision:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -e, --epochs=epochs
      Number of training iterations for the neural network. Optional. Valid values are 1–1,000.

  -i, --datasetid=datasetid
      (required) Id of the dataset to be trained

  -n, --name=name
      (required) Name of the model. Maximum length is 180 characters

  -p, --trainparams=trainparams
      JSON that contains parameters that specify how the model is created.

  -r, --learningrate=learningrate
      Specifies how much the gradient affects the optimization of the model at each time step. Optional. Use this 
      parameter to tune your model. Valid values are between 0.0001 and 0.01. If not specified, the default is 0.0001. We 
      recommend keeping this value between 0.0001 and 0.001.    This parameter isn't used when training a detection 
      dataset.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

EXAMPLE
  $ sfdx eai:vision:datasets:train --datasetid 57
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets/train.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets/train.js)_

## `sfdx eai:vision:datasets:train:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

retrieve the progress of a dataset train request

```
USAGE
  $ sfdx eai:vision:datasets:train:status -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --trainrequestid=trainrequestid                                               (required) dataset id to retrieve
                                                                                    training status for

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/datasets/train/status.js](https://github.com/dcarroll/eai/blob/v0.0.0/lib/commands/eai/vision/datasets/train/status.js)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
