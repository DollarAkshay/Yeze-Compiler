############################################################
# Dockerfile to build sandbox for executing user code      #
# Based on Ubuntu                                          #
############################################################

FROM chug/ubuntu14.04x64 
MAINTAINER DOLLAR AKSHAY

ARG DEBIAN_FRONTEND=noninteractive

# Update the repository sources list
RUN echo "deb http://archive.ubuntu.com/ubuntu trusty main universe" > /etc/apt/sources.list
RUN apt-get update

#Install all the languages/compilers
RUN apt-get install -y python
RUN apt-get install -y gcc
RUN apt-get install -y g++

#Run the Script
CMD ./script.sh