#!/bin/bash
ags quit -i mshell;

sigint_handler()
{
  ags quit -i mshell
  exit
}

trap sigint_handler SIGINT

while true; do
  ags run &
  PID=$!
  inotifywait -e modify -e move -e create -e delete -e attrib -r `pwd`
  ags quit -i mshell
done
