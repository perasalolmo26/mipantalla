# Instalar MiPantalla en la tele Samsung

Es gratis. Se hace una sola vez y tarda unos 30–40 minutos.
Necesitás: la tele y la Mac conectadas **a la misma Wi‑Fi**, y una cuenta Samsung (la misma de la tele sirve).

## 1. Preparar la tele (modo desarrollador)
1. En la Mac, anotá su IP: Ajustes del Sistema → Wi‑Fi → Detalles… → "Dirección IP" (algo como `192.168.0.15`).
2. En la tele abrí **Apps** (Aplicaciones).
3. Con el control marcá **1 2 3 4 5** (en el teclado numérico de la pantalla o del control). Aparece "Modo desarrollador".
4. Ponelo en **Activado**, escribí la IP de la Mac y tocá **Aceptar**.
5. Reiniciá la tele: mantené apretado el botón de encendido hasta que se apague y vuelva a prender.
6. Anotá la IP de la tele: Configuración → General → Red → Estado de red → Configuración IP.

## 2. Instalar Tizen Studio en la Mac (las herramientas de Samsung)
1. Bajá **Tizen Studio 6.1** para Mac con este link directo (empieza la descarga sola):
   https://download.tizen.org/sdk/Installer/tizen-studio_6.1/web-ide_Tizen_Studio_6.1_macos-64.dmg
   Abrí el .dmg e instalalo. Si tu Mac tiene chip Apple y te pide instalar **Rosetta**, aceptá.
   (La web de Tizen ahora te manda a herramientas nuevas para .NET: ignoralas, para la tele Samsung sigue siendo Tizen Studio.)
2. Abrí **Package Manager** (se abre al terminar, o está en la carpeta `tizen-studio`).
3. En la pestaña **Extension SDK** instalá **TV Extensions** y **Samsung Certificate Extension** (tiene que ser la versión 2.0.73 o más nueva).

## 3. Conectar la tele
1. Abrí Tizen Studio → menú **Tools → Device Manager**.
2. Tocá el ícono de **Remote Device Manager** → **+** → escribí la IP de la tele → **Add**.
3. Activá el interruptor **Connection**. La tele tiene que aparecer en la lista.

## 4. Crear tu certificado de Samsung
1. En Tizen Studio: **Tools → Certificate Manager** → **+**.
2. Elegí **Samsung** → **TV** → nombre del perfil: `MiPantalla`.
3. "Create a new author certificate": poné tu nombre y una contraseña (anotala).
4. Iniciá sesión con tu cuenta Samsung cuando lo pida.
5. En el certificado de distribuidor dejá **Public** y verificá que aparezca el número de tu tele (DUID). Si no aparece, revisá el paso 3.
6. **Finish**.

## 5. Armar e instalar la app
Abrí la app **Terminal** y pegá esto (cambiá `IP_DE_LA_TELE`):

Primero bajá la app en zip (no hace falta instalar nada más):
https://github.com/perasalolmo26/mipantalla/archive/refs/heads/main.zip
Queda en Descargas como carpeta **mipantalla-main**.

```bash
cd ~/Downloads/mipantalla-main
bash tv/preparar.sh
~/tizen-studio/tools/sdb connect IP_DE_LA_TELE
~/tizen-studio/tools/ide/bin/tizen package -t wgt -s MiPantalla -- tv/app
~/tizen-studio/tools/ide/bin/tizen install -n MiPantalla.wgt -- tv/app
```

Si Tizen Studio quedó en otra carpeta, cambiá `~/tizen-studio` por esa ruta.
Al terminar, **MiPantalla** aparece en Apps de la tele.

## 6. Primer uso
- Abrila, entrá a ⚙︎ Ajustes y escribí la **Clave de la API** corta de TMDB.
- Ahora "▶ Ver en Netflix" (o Disney+, Max, Prime Video, Apple TV…) abre esa app en la tele.
  Se abre la app en su inicio: buscá el título ahí. Las plataformas no permiten abrir un título puntual desde otra app.
- Volver en la pantalla de inicio cierra MiPantalla.

## Para actualizarla más adelante
Borrá la carpeta `mipantalla-main` vieja, bajá el zip de nuevo y:
```bash
cd ~/Downloads/mipantalla-main
bash tv/preparar.sh
~/tizen-studio/tools/sdb connect IP_DE_LA_TELE
~/tizen-studio/tools/ide/bin/tizen package -t wgt -s MiPantalla -- tv/app
~/tizen-studio/tools/ide/bin/tizen install -n MiPantalla.wgt -- tv/app
```
