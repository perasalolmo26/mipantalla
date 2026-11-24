# Cómo publicar MiPantalla en Google Play y App Store

Esta guía es para hacerla con tus manos, en tu Mac, paso a paso. La parte técnica ya está armada: acá solo hay que instalar programas, poner tu clave, compilar, firmar y subir.

Tiempo aproximado: una tarde para dejar todo listo, y después esperar la revisión de cada tienda (Apple tarda 1 a 3 días; Google, por ser cuenta nueva, pide primero 14 días de prueba, ver la parte B).

---

## Qué ya está hecho

- La app del teléfono está en la carpeta `app` del proyecto. Usa la misma app de la web, pero guardada **adentro** del teléfono (abre rápido y sin depender de la página).
- Tiene cosas que una página web no puede hacer, que es lo que Apple pide para aceptar la app:
  - **Recordarme**: en cada peli o serie, un botón que te manda una notificación del teléfono ("hoy a las 21", "mañana", "el sábado").
  - **Abrir la app oficial**: "Ver en Netflix" abre la app de Netflix (o Disney+, Max, etc.) si la tenés instalada.
  - **Compartir** con el menú del teléfono (WhatsApp, mensajes…).
  - Tu lista se guarda también en la memoria del teléfono para que no se pierda.
  - Vibración suave al guardar, botón Atrás de Android, tráiler en la app de YouTube.
- En la versión de las tiendas, **la clave de TMDB viene puesta y no se ve ni se puede cambiar** en Ajustes. La de links directos (RapidAPI) sigue siendo opcional para quien quiera poner la suya.
- Política de privacidad publicada en: https://perasalolmo26.github.io/mipantalla/privacidad.html
- Íconos y pantalla de inicio ya generados. En `app/tiendas` hay imágenes listas para subir (ícono y gráfico de Google Play).

**Nombre interno de la app** (no se puede cambiar después de publicarla): `io.github.perasalolmo26.mipantalla`

---

## Parte 0. Preparar la Mac (una sola vez)

1. **Xcode**: abrí la App Store de la Mac, buscá "Xcode" e instalalo (pesa mucho, puede tardar una hora). Abrilo una vez y aceptá todo lo que pida instalar.
2. **Android Studio**: bajalo de https://developer.android.com/studio , instalalo y abrilo una vez. Elegí la instalación "Standard" y dejá que baje todo.
3. **Node.js**: bajalo de https://nodejs.org (el botón "LTS") e instalalo.
4. **El código**: entrá a https://github.com/perasalolmo26/mipantalla , botón verde **Code → Download ZIP**. Descomprimilo en Descargas. Te queda la carpeta `mipantalla-main`.

## Parte 1. Poner tu clave de TMDB adentro de la app

1. Entrá a https://www.themoviedb.org/settings/api y copiá la **Clave de la API** (la corta, de 32 letras y números).
2. Abrí la app **TextEdit**. Menú Formato → **Convertir a texto normal**. Pegá la clave, sola, sin nada más.
3. Guardala con el nombre `clave-tmdb.txt` dentro de la carpeta `mipantalla-main/app`.

Este archivo nunca se sube a GitHub (está excluido a propósito).

## Parte 2. Armar la app

Abrí la app **Terminal** y pegá estas líneas, de a una, apretando Enter después de cada una:

```
cd ~/Downloads/mipantalla-main/app
npm install
npm run preparar
```

Tiene que decir: `Listo: app/www armada (con tu clave de TMDB incluida)`. Si dice "SIN clave", revisá el paso de la Parte 1.

---

## Parte A. iPhone (App Store)

### A1. Abrir el proyecto en Xcode

En la Terminal (en la misma carpeta):

```
npm run ios
```

Se abre Xcode.

### A2. Firmar con tu cuenta de Apple

1. En Xcode, a la izquierda, tocá **App** (el ícono azul de arriba de todo).
2. En el medio, pestaña **Signing & Capabilities**.
3. Marcá **Automatically manage signing**.
4. En **Team** elegí tu cuenta (si no aparece: **Add an Account…** y entrá con tu Apple ID de desarrollador).
5. Verificá que **Bundle Identifier** diga `io.github.perasalolmo26.mipantalla`.

### A3. Probarla en tu iPhone (recomendado)

1. Conectá el iPhone con el cable. Si pregunta "¿Confiar en esta computadora?", decí que sí.
2. En el iPhone: Ajustes → Privacidad y seguridad → **Modo de desarrollador** → activalo (se reinicia).
3. En Xcode, arriba en el medio, elegí tu iPhone y tocá el botón ▶.
4. Probá: abrir una serie, "Ver en Netflix", "Recordarme → En 1 hora", "Compartir".

### A4. Crear la app en App Store Connect

1. Entrá a https://appstoreconnect.apple.com → **Apps** → botón **+** → **Nueva app**.
2. Completá:
   - Plataforma: **iOS**
   - Nombre: **MiPantalla** (si está ocupado, probá "MiPantalla: dónde ver")
   - Idioma principal: **Español (México)** o **Español (España)**
   - ID del paquete: elegí `io.github.perasalolmo26.mipantalla`
   - SKU: `mipantalla1`
   - Acceso: Acceso completo

### A5. Subir la app desde Xcode

1. En Xcode, arriba en el medio, en vez de tu iPhone elegí **Any iOS Device (arm64)**.
2. Menú **Product → Archive**. Espera unos minutos.
3. Se abre una ventana con el archivo. Tocá **Distribute App → App Store Connect → Distribute**.
4. Cuando termine, en 10 a 30 minutos la versión aparece en App Store Connect (te llega un mail).

### A6. Completar la ficha y mandar a revisión

En App Store Connect, en tu app:

- **Capturas de pantalla**: hacen falta para iPhone de 6,9". La forma más fácil: en Xcode elegí el simulador **iPhone 17 Pro Max** (o el más grande que aparezca), tocá ▶, y en el simulador apretá **Cmd + S** en cada pantalla que quieras mostrar (inicio, una ficha, Mi lista, el recordatorio). Las fotos quedan en el Escritorio. Subí entre 3 y 6.
- **Texto promocional / Descripción / Palabras clave**: copiá los textos de más abajo.
- **URL de soporte**: `https://github.com/perasalolmo26/mipantalla/issues`
- **URL de política de privacidad**: `https://perasalolmo26.github.io/mipantalla/privacidad.html`
- **Categoría**: Entretenimiento.
- **Clasificación por edades**: respondé el cuestionario. Todo "No" salvo lo que corresponda; la app muestra pósters y sinopsis de películas, así que saldrá 12+ o similar.
- **Privacidad de la app** (en el menú de la izquierda): **"No, no recopilamos datos de esta app"**.
- **Precio**: Gratis.
- **Compilación**: elegí la que subiste desde Xcode.
- **Información para la revisión**: no hace falta cuenta de prueba (la app no tiene login). Desmarcá "Se requiere inicio de sesión" y pegá las notas de más abajo.
- Tocá **Agregar para revisión → Enviar**.

---

## Parte B. Android (Google Play)

### B1. Abrir el proyecto en Android Studio

En la Terminal (en la carpeta `app`):

```
npm run android
```

Se abre Android Studio. La primera vez tarda varios minutos en "sincronizar" (abajo se ve una barra). Esperá a que termine.

### B2. Probarla en un Android (opcional)

Si tenés un Android: activá "Opciones de desarrollador" y "Depuración USB", conectalo, elegilo arriba y tocá ▶.

### B3. Crear el archivo firmado para la tienda

1. Menú **Build → Generate Signed App Bundle or APK…**
2. Elegí **Android App Bundle** → Next.
3. En "Key store path" tocá **Create new…**:
   - Guardalo como `mipantalla-firma.jks` en una carpeta segura (por ejemplo Documentos, **no** dentro del proyecto).
   - Poné una contraseña y anotala. Alias: `mipantalla`. Completá tu nombre y país.
   - **Guardá ese archivo y la contraseña para siempre** (copia en un pendrive o en la nube). Lo vas a necesitar para cada actualización.
4. Next → elegí **release** → **Create**.
5. Al terminar, abajo a la derecha aparece un aviso con **locate**: ahí está el archivo `app-release.aab`.

### B4. Crear la app en Play Console

1. Entrá a https://play.google.com/console → **Crear app**.
2. Nombre: **MiPantalla**, idioma: Español (Latinoamérica), **App**, **Gratis**. Aceptá las declaraciones.

### B5. La prueba de 14 días (obligatoria para cuentas personales nuevas)

Google pide que las cuentas personales nuevas hagan una **prueba cerrada con al menos 12 personas durante 14 días** antes de publicar para todos.

1. Menú **Probar y publicar → Pruebas → Prueba cerrada** → crear una pista.
2. Agregá una lista de testers con los mails de Gmail de 12 amigos o familiares.
3. **Crear versión** → subí el `app-release.aab` → Guardar → Enviar a revisión.
4. Mandales el link de "unirse a la prueba" que te da Play Console. Tienen que aceptar e instalar la app, y dejarla instalada los 14 días.
5. Pasados los 14 días, en el **Panel** aparece **Solicitar acceso a producción**. Respondé las preguntas (qué probaron, qué mejoraste) y esperá la aprobación.

Si tu cuenta es de organización (empresa), este paso no hace falta: podés ir directo a Producción.

### B6. Completar la ficha y el "Contenido de la app"

En el **Panel**, Play Console te muestra una lista de tareas. Respuestas:

- **Política de privacidad**: `https://perasalolmo26.github.io/mipantalla/privacidad.html`
- **Acceso a la app**: "Todas las funciones están disponibles sin acceso especial".
- **Anuncios**: No contiene anuncios.
- **Clasificación de contenido**: categoría "Referencia, noticias o educación" no; elegí **"Entretenimiento"** o "Todos los demás tipos de apps" y respondé "No" a violencia, sexo, etc. (la app solo muestra pósters y sinopsis).
- **Público objetivo**: **13 años o más** (no la marques para niños).
- **Seguridad de los datos**: "¿Tu app recopila o comparte datos?" → **No**. ¿Los datos se cifran en tránsito? → Sí.
- **App de noticias**: No. **Apps gubernamentales**: No. **Funciones financieras**: Ninguna. **Salud**: Ninguna.
- **Ficha principal de Play Store**:
  - Nombre, descripción breve y completa: copiá los textos de abajo.
  - Ícono: `app/tiendas/icono-google-play-512.png`
  - Gráfico de funciones: `app/tiendas/grafico-google-play-1024x500.png`
  - Capturas de teléfono: al menos 2. Sacalas desde tu celu con la app instalada (o desde el emulador de Android Studio con el botón de la cámara).
  - Categoría: **Entretenimiento**. Mail de contacto: el tuyo.

---

## Textos para las tiendas

**Nombre:** MiPantalla

**Subtítulo (Apple, máx. 30) / Descripción breve (Google, máx. 80):**
Dónde ver cada peli y serie

**Descripción:**

> ¿En qué plataforma está esa serie? MiPantalla junta en un solo lugar el catálogo de Netflix, Disney+, Max, Prime Video, Apple TV+, Paramount+ y más, para tu país.
>
> • Marcá las plataformas que pagás y mirá solo lo que podés ver.
> • Buscá cualquier peli o serie y enterate dónde está: incluida, para alquilar o comprar.
> • Tocá "Ver en Netflix" (o la que sea) y se abre la app oficial.
> • Armá tu lista: Quiero ver, Estoy viendo (con temporada y episodio) y Ya la vi.
> • Recordatorios: pedile que te avise hoy a la noche o el sábado.
> • Novedades de la semana y filtros por género, año y país.
> • Mirá el tráiler y compartí lo que encontraste.
>
> MiPantalla no reproduce videos ni pide tus contraseñas: la reproducción siempre es en la app oficial de cada plataforma. Tu lista queda guardada en tu teléfono.
>
> Datos de títulos: TMDB. Datos de disponibilidad: JustWatch. Esta app usa la API de TMDB pero no está avalada ni certificada por TMDB. MiPantalla no está asociada a ninguna plataforma de streaming.

**Palabras clave (Apple, máx. 100):**
streaming,series,películas,netflix,disney,max,prime video,dónde ver,catálogo,lista

**Notas para la revisión de Apple** (en inglés, que es lo que leen):

> MiPantalla is a free streaming guide. No account or login is needed: open the app and browse. Core features: unified catalog filtered by the user's own streaming services and country (TMDB data), a personal watchlist with season/episode progress stored on the device, local notification reminders ("Remind me" button inside any title), native share sheet, and deep links that open the official streaming apps. The app does not play video, does not ask for third-party credentials and has no in-app purchases. Provider logos and availability data come from the TMDB API (JustWatch data), used under TMDB's terms with attribution in Settings.

---

## Cuando quieras actualizar la app

1. Bajá de nuevo el ZIP del código (o pedime los cambios), copiá tu `clave-tmdb.txt` a la nueva carpeta `app`.
2. En la Terminal: `cd ~/Downloads/mipantalla-main/app`, `npm install`, `npm run preparar`.
3. **Subí el número de versión** (las tiendas no aceptan dos veces el mismo):
   - iPhone: en Xcode, App → General → **Version** (1.1) y **Build** (2, 3, 4…).
   - Android: en Android Studio, archivo `app/build.gradle`, cambiá `versionCode 1` por 2, 3… y `versionName "1.0"` por "1.1".
4. Repetí A5 (Archive) y B3 (con el **mismo** archivo `mipantalla-firma.jks`), y subí la nueva versión en cada tienda.

## Si algo falla

- **"command not found: npm"**: falta instalar Node.js (Parte 0, paso 3). Cerrá y abrí la Terminal.
- **Xcode dice "No account" o "Failed to register bundle identifier"**: revisá A2, que esté elegido tu Team de la cuenta paga.
- **Android Studio marca errores al abrir**: esperá a que termine de sincronizar; si sigue, menú File → Sync Project with Gradle Files.
- **La app abre en modo demo**: faltó la clave (Parte 1). Corré `npm run preparar` de nuevo y volvé a compilar.
- **Apple la rechaza por "4.2 Minimum Functionality"**: respondé en App Store Connect explicando las funciones de las notas de revisión (recordatorios, lista guardada, abrir apps oficiales). Avisame y preparo la respuesta o sumamos más funciones.

Para todo esto podés pedirme ayuda: puedo seguirte paso a paso o hacer los comandos por vos en la Mac.
