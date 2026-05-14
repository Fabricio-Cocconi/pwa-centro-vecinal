# 🏘️ Centro Vecinal Santa Isabel 2da Sección - PWA

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PWA](https://img.shields.io/badge/PWA-Ready-success)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> **🚀 Demo en Vivo:** [https://pwa-centro-vecinal.vercel.app](https://pwa-centro-vecinal.vercel.app)  
> *(Abre este enlace desde el navegador de tu celular para probar e instalar la aplicación)*

Aplicación Web Progresiva (PWA) diseñada y desarrollada para los vecinos del **Centro Vecinal Santa Isabel 2da Sección**. Su objetivo principal es centralizar y facilitar el acceso rápido a números de emergencia, reclamos municipales y contactos vecinales útiles en una interfaz moderna, accesible y optimizada para dispositivos móviles.

---

## ✨ Características Principales

- 🚨 **Acceso Rápido a Emergencias:** Botones grandes y de alto contraste para llamar instantáneamente a Policía, Bomberos, Ambulancia y Defensa Civil.
- 🛠️ **Gestión de Reclamos:** Accesos directos a servicios municipales (Alumbrado, Aguas Cordobesas, EPEC, etc.).
- 📱 **Instalable (PWA):** Los vecinos pueden instalar la aplicación directamente en la pantalla de inicio de sus celulares sin necesidad de pasar por la tienda de aplicaciones.
- ⚡ **Funcionamiento Offline:** Gracias a la implementación de *Service Workers*, la app sigue funcionando incluso si no hay conexión a internet.
- 🔐 **Panel de Administración Seguro:** Panel protegido por PIN para que los administradores del centro vecinal puedan actualizar los números de teléfono, títulos y mensajes en tiempo real.
- 🌙 **Diseño Adaptativo:** Interfaz cuidadosamente diseñada para asegurar legibilidad (tipografía adecuada) y evitar problemas visuales en cualquier tamaño de pantalla.

---

## 🚀 Tecnologías Utilizadas

Este proyecto se desarrolló sin dependencias externas pesadas para garantizar la máxima velocidad de carga:

- **HTML5 Semántico**
- **CSS3** (Variables nativas, Flexbox, Grid, Media Queries)
- **Vanilla JavaScript** (Lógica de la app, interacción del DOM)
- **Service Workers & Web App Manifest** (Funcionalidad PWA)
- **Google Fonts** (Tipografía *Outfit*)

---

## 🛠️ Instalación y Uso Local

Al ser una aplicación web estática, no requiere compilación ni dependencias de Node.js.

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Fabricio-Cocconi/pwa-centro-vecinal.git
   ```
2. **Abrir el proyecto:**
   Simplemente abre el archivo `index.html` en cualquier navegador web moderno.
3. **Probar la PWA localmente:**
   Para probar la instalación del Service Worker y las características PWA, se recomienda servir los archivos mediante un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en VS Code o usando un servidor HTTP en Python/Node.

---

## 🔒 Acceso al Panel de Administración

Para actualizar la información de los botones, se incluyó un panel oculto:
- Haz doble clic rápido o mantén presionado el encabezado de la app.
- Ingresa el PIN de seguridad asignado al administrador.
- Edita los títulos, números o textos de WhatsApp de cada botón.
- Guarda los cambios (los datos persisten de manera local en el dispositivo del usuario).

---

## 👨‍💻 Autor

**Fabricio Cocconi**
*Desarrollador de la aplicación*

[🔗 Mi perfil de GitHub](https://github.com/Fabricio-Cocconi)

