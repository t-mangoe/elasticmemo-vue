#!/bin/bash

curl -X POST http://localhost:9200/my_index/my_type?pretty -H "Content-Type":"application/json" -d @data.json
curl -X POST http://localhost:9200/tags/tag_type?pretty -H "Content-Type":"application/json" -d @init_tags.json
