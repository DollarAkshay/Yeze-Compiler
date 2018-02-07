#!/bin/bash
g++ --version | head -1

g++ program.cpp -o binary  &> output.txt
if ! [ -s output.txt ]
then
	ulimit -f 64
	(time timeout 1s ./binary < input.txt &> output.txt) &> status.txt
	if [ $? -eq 124 ]; then 
		echo "Timeout" > output.txt
	fi

	if ! [ -s output.txt ]
	then
		echo "Runtime Error" > output.txt
	fi
fi