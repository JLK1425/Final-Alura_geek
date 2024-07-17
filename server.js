const express = require('express');
const path = require('path');

const app = express();

// Ruta estática para servir los archivos del sitio web
app.use(express.static(path.join(__dirname, 'public')));

// Configurar puerto del servidor
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
