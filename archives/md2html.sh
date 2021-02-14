#!/bin/bash

pandoc ruomeng2021-rules.md --css="/css/buptra.css" --metadata pagetitle="赛制" -s -o rules-and-regulations.html
mv rules-and-regulations.html ../
