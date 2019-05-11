#!/bin/sh

# Builds the FieldTrainer frontend with no manual intervention

cd ~/FT-WEB/field-trainer/field-trainer
npm run build || exit -1

# package
