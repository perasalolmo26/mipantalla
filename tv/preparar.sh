#!/bin/bash
# Arma la carpeta "tv/app" con todo lo que va dentro de la app de Samsung.
set -e
cd "$(dirname "$0")"
rm -rf app && mkdir app
cp ../index.html ../manifest.json app/
cp ../icon-512.png app/icon.png
cp ../icon-192.png ../icon-512.png app/
cp config.xml app/
echo "Listo: carpeta $(pwd)/app"
