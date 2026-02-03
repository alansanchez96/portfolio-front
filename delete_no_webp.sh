#!/bin/bash

BASE_DIR="./public/img/projects"

echo "🧹 Eliminando imágenes PNG / JPG / JPEG..."
echo "📂 Directorio base: $BASE_DIR"
echo "---------------------------------------"

find "$BASE_DIR" -type f \( \
    -iname "*.png" -o \
    -iname "*.jpg" -o \
    -iname "*.jpeg" \
\) -print -delete

echo "---------------------------------------"
echo "✅ Limpieza completada"
