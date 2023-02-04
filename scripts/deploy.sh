#!/bin/bash

aws s3 sync --acl public-read --cache-control max-age=31536000,public --metadata-directive REPLACE ./ s3://gsouzatecnologia.com.br --exclude ".git/*" --exclude "scripts/*" --exclude README.md --profile gsouza
aws cloudfront create-invalidation --distribution-id E2EFT7F2ZY97KL --paths "/*" --profile gsouza
