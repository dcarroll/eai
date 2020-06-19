#!/bin/bash

DSID=$(sfdx eai:language:datasets:create -p http://einstein.ai/text/case_routing_intent.csv -t text-intent -n sampleLDS --json | jq .result.data.id)
read

MODELID=$(sfdx eai:language:datasets:train -i $DSID -n "Simple Model" --json | jq .result.data.modelId -r)
read

sfdx eai:language:intent -d "how is my package being shipped?" -i $MODELID -n 3 --json | jq .result.data.probabilities[]
read

sfdx eai:language:models:delete -i $MODELID
sfdx eai:language:datasets:delete -i $DSID

