There should be two demo flows, one for vision and one for language.

Language
1. Create a data set from a zip file.  Easiest is probably from a local file.
    a. DSID=$(sfdx eai:language:datasets:create -p http://einstein.ai/text/case_routing_intent.csv -t text-intent -n sampleLDS --json | jq .result.data.id)
    a.1 Should set an environment variable DSID, at least for this process context, to save the dataset id
    (the map path in the reponse to the id is result.data.id)
2. Wait for the dataset to be created.
    a. Script for this TBD
3. Create the model using the newly minted dataset
    a. MODELID=$(sfdx eai:language:datasets:train -i $DSID -n "Simple Model" --json | jq .result.data.modelId -r)
4. Test the model for text prediction
    a. sfdx eai:language:intent -d "how is my package being shipped?" -i $MODELID -n 3 --json | jq .result.data.probabilities[]