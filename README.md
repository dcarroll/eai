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
$ npm install -g eaidc
$ sfdx COMMAND
running command...
$ sfdx (-v|--version|version)
eaidc/1.0.0 darwin-x64 node-v13.12.0
$ sfdx --help [COMMAND]
USAGE
  $ sfdx COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx eai:apiusage [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaiapiusage---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:auth:gettoken [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaiauthgettoken---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:auth:login -n <string> -f <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaiauthlogin--n-string--f-string--e-number---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasets--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets:create -t <string> [-d <string> | -p <string>] [-l <string>] [-n <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasetscreate--t-string--d-string---p-string--l-string--n-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasetsdelete--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets:delete:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasetsdeletestatus--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasetsretrain--i-string--e-integer--r-number--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasetstrain--i-string--n-string--e-integer--r-number--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:datasets:train:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagedatasetstrainstatus--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:examples [-i <string> | -l <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguageexamples--i-string---l-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:examples:create -i <string> [-d <string> | -p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguageexamplescreate--i-string--d-string---p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:feedback:create -d <string> -l <string> -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagefeedbackcreate--d-string--l-string--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:intent -i <string> -d <string> [-n <integer>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguageintent--i-string--d-string--n-integer--s-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:models -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagemodels--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:models:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagemodelsdelete--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:models:metrics [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagemodelsmetrics--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:language:sentiment -i <string> -d <string> [-n <integer>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eailanguagesentiment--i-string--d-string--n-integer--s-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasets--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:create -n <string> -t <string> [-b <string>] [-l <string>] [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetscreate--n-string--t-string--b-string--l-string--p-string--d-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetsdelete--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:delete:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetsdeletestatus--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetsretrain--i-string--e-integer--r-number--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetstrain--i-string--n-string--e-integer--r-number--p-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:datasets:train:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondatasetstrainstatus--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:detect -i <string> [-n <integer>] [-s <string>] [-c <string> | -l <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisiondetect--i-string--n-integer--s-string--c-string---l-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:models -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisionmodels--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:models:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisionmodelsdelete--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:models:learningcurve -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisionmodelslearningcurve--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:models:metrics [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisionmodelsmetrics--i-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)
* [`sfdx eai:vision:predict -i <string> [-n <integer>] [-b <string> | -c <string> | -l <string>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`](#sfdx-eaivisionpredict--i-string--n-integer--b-string---c-string---l-string--s-string---json---loglevel-tracedebuginfowarnerrorfataltracedebuginfowarnerrorfatal)

## `sfdx eai:apiusage [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

Returns prediction usage on a monthly basis for the current calendar month and future months.

```
USAGE
  $ sfdx eai:apiusage [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:apiusage

  API Usage Summary
  Period Start  Period End  Remaining  Used  Maximum
  ────────────  ──────────  ─────────  ────  ───────
  March/2020    April/2020  1990       10    2000
```

_See code: [lib/commands/eai/apiusage.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/apiusage.js)_

## `sfdx eai:auth:gettoken [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

```
USAGE
  $ sfdx eai:auth:gettoken [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:auth:gettoke
     Successfully obtained auth token
```

_See code: [lib/commands/eai/auth/gettoken.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/auth/gettoken.js)_

## `sfdx eai:auth:login -n <string> -f <string> [-e <number>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

download an OAuth token for your account

```
USAGE
  $ sfdx eai:auth:login -n <string> -f <string> [-e <number>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -e, --expiration=expiration
      [default: 1] number of minutes until token expires

  -f, --pemlocation=pemlocation
      (required) Local path to your Einsten private key certificat (<something>.pem)

  -n, --name=name
      (required) Your Einstein Platform Services username. You can find your username in the welcome email you receive 
      after you get an account. If you signed up using Salesforce, your username is the email address associated with the 
      org you signed up with.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

EXAMPLE
  $ sfdx eai:auth:login -n name@company.com -f einstein_platform.pem -e 1
     Successfully obtained auth token for name@company.com
```

_See code: [lib/commands/eai/auth/login.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/auth/login.js)_

## `sfdx eai:language:datasets [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:language:datasets [-i <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         id of dataset to retrieve, if
                                                                                    missing all datasets are returned

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/datasets.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets.js)_

## `sfdx eai:language:datasets:create -t <string> [-d <string> | -p <string>] [-l <string>] [-n <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

create a new dataset

```
USAGE
  $ sfdx eai:language:datasets:create -t <string> [-d <string> | -p <string>] [-l <string>] [-n <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --data=data                                                                   URL of the .zip file. The maximum
                                                                                    .zip file size you can upload from a
                                                                                    web location is 50 MB.

  -l, --language=language                                                           [default: N/A] Dataset language.
                                                                                    Optional. Default is N/A. Reserved
                                                                                    for future use.

  -n, --name=name                                                                   Name of the dataset. Maximum length
                                                                                    is 180 characters.

  -p, --path=path                                                                   URL of the .zip file. The maximum
                                                                                    .zip file size you can upload from a
                                                                                    web location is 50 MB.

  -t, --type=type                                                                   (required) Type of dataset data.
                                                                                    Valid values are text-intent and
                                                                                    text-sentiment. Available in
                                                                                    Einstein Vision API version 2.0 and
                                                                                    later.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:datasets:create --type text-intent --data /mylocaldatapath.csv
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/datasets/create.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets/create.js)_

## `sfdx eai:language:datasets:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset be deleted

```
USAGE
  $ sfdx eai:language:datasets:delete -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         (required) dataset id to retrieve,
                                                                                    if not specified all datasets are
                                                                                    retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:datasets:delete --datasetid 12345
     successfully queued dataset 12345 for deletion
     You can check the status of the delete requestio by entering the command below
     sfdx eai.language:datasets:delete:status --datsetid 123345
```

_See code: [lib/commands/eai/language/datasets/delete.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets/delete.js)_

## `sfdx eai:language:datasets:delete:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get the status of a dataset delete request

```
USAGE
  $ sfdx eai:language:datasets:delete:status -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --deletrequestid=deletrequestid                                               (required) dataset id to retrieve
                                                                                    deletion status for

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:datasets:delete:status --deleterequestid
     Successfully retrieved language dataset delete status
     id:              XSBIYHY6LOJOBQVNNVRAODOYOU
     type:            DATASET
     status:          QUEUED
     deletedObjectId: 1186961
```

_See code: [lib/commands/eai/language/datasets/delete/status.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets/delete/status.js)_

## `sfdx eai:language:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request to retrain a dataset, optionally with new params

```
USAGE
  $ sfdx eai:language:datasets:retrain -i <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel 
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
  $ sfdx eai:language:datasets:retrain --modelid 57
     Successfully requested to retrain the model with id: TDD3UH52XGFRUMC2D63R24H4KM
     datasetId:        1187599
     modelId:          HQSIQO6FMPTONEJ6R3T6LE2TAI
     name:             new model
     status:           QUEUED
     progress:         0
     createdAt:        2020-04-05T22:21:17.000+0000
     You can check the status of the training by entering the command below
     sfdx eai:language:datasets:train:status -i HQSIQO6FMPTONEJ6R3T6LE2TAI
```

_See code: [lib/commands/eai/language/datasets/retrain.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets/retrain.js)_

## `sfdx eai:language:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset begin a training run

```
USAGE
  $ sfdx eai:language:datasets:train -i <string> -n <string> [-e <integer>] [-r <number>] [-p <string>] [--json] 
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
      recommend keeping this value between 0.0001 and 0.001.    This parameter isn"t used when training a detection 
      dataset.

  --json
      format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)
      [default: warn] logging level for this command invocation

EXAMPLE
  $ sfdx eai:language:datasets:train --datasetid 57
     Successfully requested dataset '1187599' be trained, status is 'QUEUED'
     You can check the status of the training by entering the command below
       sfdx eai:language:datasets:train:status -i HQSIQO6FMPTONEJ6R3T6LE2TAI
```

_See code: [lib/commands/eai/language/datasets/train.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets/train.js)_

## `sfdx eai:language:datasets:train:status -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

retrieve the progress of a dataset train request

```
USAGE
  $ sfdx eai:language:datasets:train:status -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --modelid=modelid                                                             (required) language model id to
                                                                                    retrieve training status for

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:dataset:train:status --modelid TDD3UH52XGFRUMC2D63R24H4KM
     Successfully retrieved training status
     name:             Simple Model
     status:           RUNNING
     modelId:          TDD3UH52XGFRUMC2D63R24H4KM
     modelType:        text-intent
     updatedAt:        2020-04-05T21:20:10.000+0000
```

_See code: [lib/commands/eai/language/datasets/train/status.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/datasets/train/status.js)_

## `sfdx eai:language:examples [-i <string> | -l <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

adds examples from a .csv, .tsv, or .json file to a dataset.

```
USAGE
  $ sfdx eai:language:examples [-i <string> | -l <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         language dataset id to retrieve
                                                                                    examples for, if not specified all
                                                                                    examples are retrieved

  -l, --labelid=labelid                                                             label id to retrieve examples for,
                                                                                    if not specified all examples are
                                                                                    retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/examples.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/examples.js)_

## `sfdx eai:language:examples:create -i <string> [-d <string> | -p <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

create a new dataset

```
USAGE
  $ sfdx eai:language:examples:create -i <string> [-d <string> | -p <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --data=data                                                                   local path to the .zip file. The
                                                                                    maximum .zip file size you can
                                                                                    upload from a web location is 50 MB.

  -i, --datasetid=datasetid                                                         (required) dataset id to add the
                                                                                    examples to

  -p, --path=path                                                                   URL of the .zip file. The maximum
                                                                                    .zip file size you can upload from a
                                                                                    web location is 50 MB.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:examples:create --datasetid 1187600 --path =http://einstein.ai/text/weather_update.csv
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/examples/create.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/examples/create.js)_

## `sfdx eai:language:feedback:create -d <string> -l <string> -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

create a new dataset

```
USAGE
  $ sfdx eai:language:feedback:create -d <string> -l <string> -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --document=document                                                           (required) Intent or sentiment
                                                                                    string to add to the dataset.

  -i, --modelid=modelid                                                             (required) model id to add the
                                                                                    feedback to

  -l, --expectedlabel=expectedlabel                                                 (required) Correct label for the
                                                                                    example. Must be a label that exists
                                                                                    in the dataset.

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:create --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/feedback/create.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/feedback/create.js)_

## `sfdx eai:language:intent -i <string> -d <string> [-n <integer>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:language:intent -i <string> -d <string> [-n <integer>] [-s <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --document=document                                                           (required) the text to evaluate

  -i, --modelid=modelid                                                             (required) model id to make
                                                                                    prediction against

  -n, --numresults=numresults                                                       [default: 2] Number of probabilities
                                                                                    to return. Optional. If passed, must
                                                                                    be a number greater than zero.

  -s, --sampleid=sampleid                                                           String that you can pass in to tag
                                                                                    the prediction. Optional. Can be any
                                                                                    value, and is returned in the
                                                                                    response

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:intent --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/intent.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/intent.js)_

## `sfdx eai:language:models -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:language:models -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         (required) language dataset id to
                                                                                    retrieve models for

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/models.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/models.js)_

## `sfdx eai:language:models:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset be deleted

```
USAGE
  $ sfdx eai:language:models:delete -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --modelid=modelid                                                             (required) modelset id to delete
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:models:delete --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/models/delete.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/models/delete.js)_

## `sfdx eai:language:models:metrics [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:language:models:metrics [-i <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --modelid=modelid                                                             model id to retrieve, if not
                                                                                    specified all datasets are retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/models/metrics.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/models/metrics.js)_

## `sfdx eai:language:sentiment -i <string> -d <string> [-n <integer>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:language:sentiment -i <string> -d <string> [-n <integer>] [-s <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -d, --document=document                                                           (required) The image contained in a
                                                                                    base64 string

  -i, --modelid=modelid                                                             (required) model id to make
                                                                                    prediction against

  -n, --numresults=numresults                                                       [default: 2] Number of probabilities
                                                                                    to return. Optional. If passed, must
                                                                                    be a number greater than zero.

  -s, --sampleid=sampleid                                                           String that you can pass in to tag
                                                                                    the prediction. Optional. Can be any
                                                                                    value, and is returned in the
                                                                                    response

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:language:sentiment --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/language/sentiment.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/language/sentiment.js)_

## `sfdx eai:vision:datasets [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

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

_See code: [lib/commands/eai/vision/datasets.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets.js)_

## `sfdx eai:vision:datasets:create -n <string> -t <string> [-b <string>] [-l <string>] [-p <string>] [-d <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

create a new dataset

```
USAGE
  $ sfdx eai:vision:datasets:create -n <string> -t <string> [-b <string>] [-l <string>] [-p <string>] [-d <string>] 
  [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --labels=labels                                                               Comma-separated list of labels.
                                                                                    Maximum number of labels per dataset
                                                                                    is 250

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

_See code: [lib/commands/eai/vision/datasets/create.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets/create.js)_

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

_See code: [lib/commands/eai/vision/datasets/delete.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets/delete.js)_

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

_See code: [lib/commands/eai/vision/datasets/delete/status.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets/delete/status.js)_

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

_See code: [lib/commands/eai/vision/datasets/retrain.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets/retrain.js)_

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

_See code: [lib/commands/eai/vision/datasets/train.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets/train.js)_

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

_See code: [lib/commands/eai/vision/datasets/train/status.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/datasets/train/status.js)_

## `sfdx eai:vision:detect -i <string> [-n <integer>] [-s <string>] [-c <string> | -l <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:vision:detect -i <string> [-n <integer>] [-s <string>] [-c <string> | -l <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -c, --samplecontent=samplecontent                                                 Binary content of image file

  -i, --modelid=modelid                                                             (required) model id to make
                                                                                    prediction against

  -l, --samplelocation=samplelocation                                               URL of the image file

  -n, --numresults=numresults                                                       [default: 2] Number of probabilities
                                                                                    to return. Optional. If passed, must
                                                                                    be a number greater than zero.

  -s, --sampleid=sampleid                                                           String that you can pass in to tag
                                                                                    the prediction. Optional. Can be any
                                                                                    value, and is returned in the
                                                                                    response

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/detect.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/detect.js)_

## `sfdx eai:vision:models -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:vision:models -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --datasetid=datasetid                                                         (required) dataset id to retrieve
                                                                                    the models for

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/models.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/models.js)_

## `sfdx eai:vision:models:delete -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset be deleted

```
USAGE
  $ sfdx eai:vision:models:delete -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --modelid=modelid                                                             (required) modelset id to delete
  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:vision:models:delete --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/models/delete.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/models/delete.js)_

## `sfdx eai:vision:models:learningcurve -i <string> [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

request that a dataset be deleted

```
USAGE
  $ sfdx eai:vision:models:learningcurve -i <string> [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --modelid=modelid                                                             (required) model id to retrieve, if
                                                                                    not specified all datasets are
                                                                                    retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/models/learningcurve.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/models/learningcurve.js)_

## `sfdx eai:vision:models:metrics [-i <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:vision:models:metrics [-i <string>] [--json] [--loglevel 
  trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -i, --modelid=modelid                                                             model id to retrieve, if not
                                                                                    specified all datasets are retrieved

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/models/metrics.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/models/metrics.js)_

## `sfdx eai:vision:predict -i <string> [-n <integer>] [-b <string> | -c <string> | -l <string>] [-s <string>] [--json] [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]`

get a list of all your datasets, or provide an Id to get the details of a specific dataset

```
USAGE
  $ sfdx eai:vision:predict -i <string> [-n <integer>] [-b <string> | -c <string> | -l <string>] [-s <string>] [--json] 
  [--loglevel trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL]

OPTIONS
  -b, --samplebase64content=samplebase64content                                     The image contained in a base64
                                                                                    string

  -c, --samplecontent=samplecontent                                                 Binary content of image file

  -i, --modelid=modelid                                                             (required) model id to make
                                                                                    prediction against

  -l, --samplelocation=samplelocation                                               URL of the image file

  -n, --numresults=numresults                                                       [default: 2] Number of probabilities
                                                                                    to return. Optional. If passed, must
                                                                                    be a number greater than zero.

  -s, --sampleid=sampleid                                                           String that you can pass in to tag
                                                                                    the prediction. Optional. Can be any
                                                                                    value, and is returned in the
                                                                                    response

  --json                                                                            format output as json

  --loglevel=(trace|debug|info|warn|error|fatal|TRACE|DEBUG|INFO|WARN|ERROR|FATAL)  [default: warn] logging level for
                                                                                    this command invocation

EXAMPLE
  $ sfdx eai:datasets:vision:get --username myOrg@example.com --pemlocation secrets/einstein.pem
     Oauth token obtained!
```

_See code: [lib/commands/eai/vision/predict.js](https://github.com/dcarroll/eai/blob/v1.0.0/lib/commands/eai/vision/predict.js)_
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
