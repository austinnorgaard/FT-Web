# Runs Prettier (a code formatter) across the whole project
# We will selectively choose source folders so we can avoid
# formatting unnecessary folders

directories=("./smart-cone-api/src" "./field-trainer/field-trainer/src")
config="./.prettierrc"
echo Using config located at $config
for i in "${directories[@]}"
do
    :
    echo Prettifying $i
    # run prettier on this file, using default config specified above
    set -f
    args="--config=${config} --write ${i}/**/*.ts"
    echo Using args: $args
    prettier $args
done
