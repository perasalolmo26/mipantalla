# MiPantalla (MVP)

Catálogo unificado de pelis y series de Netflix, Disney+, Max, Apple TV+, Prime Video, Paramount+ y más.

## Cómo usarla
1. Abrí https://perasalolmo26.github.io/mipantalla/ (en el celu: "Agregar a pantalla de inicio"). Arranca en modo demo con datos de ejemplo.
2. Para el catálogo real: creá una cuenta gratis en https://www.themoviedb.org → Ajustes → API, copiá la "API Key" o el "Token de lectura".
3. En la app: ⚙︎ Ajustes → elegí tu país, marcá tus plataformas y pegá la clave.

## Qué hace
- Inicio: "Seguir viendo", tu lista y lo más popular *solo* de tus plataformas.
- Explorar: series/películas por género, orden y plataforma.
- Buscador: muestra primero lo que está en tus plataformas.
- Cada título dice dónde está (suscripción, alquiler, compra) y tiene botón "Ver en Netflix/Disney+/…" que abre la app oficial.
- Mi lista: Quiero ver / Viendo (temporada y episodio) / Visto. Se guarda en este navegador.

## Límite importante
No inicia sesión con tus cuentas ni reproduce el video adentro: las plataformas no lo permiten (no tienen API pública y usan DRM).
La reproducción siempre ocurre en la app oficial. Nunca pide contraseñas.

## App para celulares (Google Play y App Store)
La carpeta `app/` tiene la app para Android y iPhone, hecha con Capacitor a partir de esta misma web.
Pasos para compilarla, firmarla y subirla a las tiendas: [app/GUIA-TIENDAS.md](app/GUIA-TIENDAS.md).
Política de privacidad: https://perasalolmo26.github.io/mipantalla/privacidad.html
