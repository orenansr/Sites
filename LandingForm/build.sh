#!/bin/bash

# Script para preparar o projeto para deploy no Vercel

echo "Preparando projeto para Vercel..."

# Criar diretório de build
mkdir -p vercel-build

# Copiar arquivos do frontend
cp -r client/* vercel-build/
cp -r shared vercel-build/
cp -r server vercel-build/
cp package.json vercel-build/
cp vercel.json vercel-build/
cp api vercel-build/ -r

# Instalar dependências
cd vercel-build
npm install

# Build do frontend
npm run build

echo "Projeto preparado! Agora você pode fazer upload da pasta 'vercel-build' para o Vercel"