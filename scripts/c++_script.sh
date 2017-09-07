#!/bin/bash
g++ --version | head -1

g++ program.cpp -o binary  &> output.txt
if [ -s output.txt ]
then
	echo "Compile Error"
else
	./binary < input.txt &> output.txt
fi

echo "--------------------------------"
cat output.txt
echo "--------------------------------"