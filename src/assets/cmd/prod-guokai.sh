#!/bin/bash
echo "==start app=="
mv -f /usr/share/nginx/dist/assets/js/config-guokai.js /usr/share/nginx/dist/assets/js/config.js
echo "===start nginx==="
nginx -g 'daemon off;'
