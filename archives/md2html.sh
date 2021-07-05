#!/bin/bash

pandoc "$1" --css="/css/buptra.css" --metadata pagetitle="赛制" -s -o rules-and-regulations.html
mv rules-and-regulations.html ../
