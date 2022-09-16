#!/bin/bash

aws s3 sync --acl public-read --cache-control max-age=31536000,public --metadata-directive REPLACE ./ s3://gsouzatecnologia.com.br --exclude ".git/*" --exclude "scripts/*" --exclude README.md
