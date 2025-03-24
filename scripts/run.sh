#!/bin/sh

if [ "$#" -eq 0 ]; then
    exec "$HOME/.config/ags/mshell"
else
    exec astal -i mshell "$*"
fi
