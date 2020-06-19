language
sfdx eai:language:datasets:create -t intent -p http://einstein.ai/text/weather.csv -n weather

sfdx eai:language:datasets:train -i 1217796 -n version1 -c

sfdx eai:language:datasets:train:status -i MBPBOXIXGFDHW5W3F3ZTDFL6CE --json



vision
