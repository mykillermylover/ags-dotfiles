#!/bin/sh

if [ "$#" -eq 0 ]; then
    exec "$HOME/.config/ags/build/mshell"
else
    exec astal -i mshell "$*"
fi
