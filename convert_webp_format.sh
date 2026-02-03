#!/bin/bash

# 📍 Carpeta raíz de proyectos
BASE_DIR="./public/img/projects"

# 🎚️ Calidad WebP (0–100)
QUALITY=100

# 🔍 Verificar que cwebp esté instalado
if ! command -v cwebp &> /dev/null; then
  echo "❌ cwebp no está instalado"
  echo "👉 Ubuntu: sudo apt install webp"
  echo "👉 Mac: brew install webp"
  exit 1
fi

echo "🚀 Convirtiendo imágenes a WebP..."
echo "---------------------------------"

find "$BASE_DIR" -type f \( \
  -iname "*.png" -o \
  -iname "*.jpg" -o \
  -iname "*.jpeg" \
\) | while read -r IMG; do

  WEBP="${IMG%.*}.webp"

  # ⏭️ Saltar si ya existe
  if [[ -f "$WEBP" ]]; then
    echo "⏭️  Ya existe: $WEBP"
    continue
  fi

  echo "🔄 $IMG → $WEBP"
  cwebp -q "$QUALITY" "$IMG" -o "$WEBP" >/dev/null 2>&1

done

echo "✅ Conversión finalizada"
