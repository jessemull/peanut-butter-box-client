#!/bin/bash
docker build --no-cache -t $IMAGE_TAG --build-arg STAGE=$1 -f ./jenkins/build/Dockerfile .