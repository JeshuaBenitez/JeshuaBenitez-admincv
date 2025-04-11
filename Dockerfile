# Usa Apache como servidor base
FROM httpd:2.4

# Copia solo el contenido de la carpeta 'dist/admin-cv/browser' al directorio raíz de Apache
COPY dist/admin-cv/browser/ /usr/local/apache2/htdocs/


