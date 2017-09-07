#!/bin/bash
python -V
echo "--------------------------------"
python program.py < input.txt &> output.txt
cat output.txt
echo "--------------------------------"