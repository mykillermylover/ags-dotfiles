#!/bin/bash

hyprctl devices -j |
          jq -r '.keyboards[] | select(.main == true) | .active_keymap' |
          head -n1 |
          cut -c1-2 |
          tr 'A-Z' 'a-z'