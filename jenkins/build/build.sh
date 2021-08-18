#!/bin/bash
docker build --build-arg STAGE=$1 -t $IMAGE_TAG -f ./jenkins/build/Dockerfile .