/* =========================================================
   MiPantalla: puente con el teléfono (solo en la app de Google Play / App Store).
   La web no carga este archivo. Agrega lo que una página web no puede hacer:
   - Abre Netflix, Disney+, YouTube, etc. en su app oficial.
   - Recordatorios con notificación del teléfono ("Recordarme esta noche").
   - Compartir con el menú del teléfono (WhatsApp, mensajes…).
   - Vibración suave al guardar en tu lista.
   - Guarda tu lista en el almacenamiento del teléfono, así no se pierde.
   ========================================================= */
(function () {
  var C = window.Capacitor;
  if (!C || !C.isNativePlatform || !C.isNativePlatform()) return;
  var P = C.Plugins || {};
  var PUBLIC_URL = 'https://perasalolmo26.github.io/mipantalla/';
  document.documentElement.classList.add('native', 'native-' + C.getPlatform());

  /* ---------- tu lista, guardada también en el teléfono ---------- */
  // El navegador interno puede borrar sus datos si el teléfono se queda sin espacio.
  // Copiamos todo lo de MiPantalla (claves mp_*) al almacenamiento propio de la app.
  var Pref = P.Preferences;
  if (Pref) {
    var set = Storage.prototype.setItem, rem = Storage.prototype.removeItem;
    Storage.prototype.setItem = function (k, v) {
      set.call(this, k, v);
      if (this === window.localStorage && /^mp_/.test(k)) Pref.set({ key: k, value: String(v) }).catch(function () {});
    };
    Storage.prototype.removeItem = function (k) {
      rem.call(this, k);
      if (this === window.localStorage && /^mp_/.test(k)) Pref.remove({ key: k }).catch(function () {});
    };
    // Si el navegador interno perdió los datos pero el teléfono los tiene, los recuperamos.
    Pref.keys().then(function (r) {
      var keys = (r.keys || []).filter(function (k) { return /^mp_/.test(k) });
      var missing = keys.filter(function (k) { return localStorage.getItem(k) === null });
      if (!missing.length) {
        // Primera vez con esta función: copiamos lo que ya había.
        for (var i = 0; i < localStorage.length; i++) {
          var k = localStorage.key(i);
          if (/^mp_/.test(k) && keys.indexOf(k) < 0) Pref.set({ key: k, value: localStorage.getItem(k) });
        }
        return;
      }
      return Promise.all(missing.map(function (k) {
        return Pref.get({ key: k }).then(function (g) { if (g.value != null) set.call(localStorage, k, g.value) });
      })).then(function () { if (missing.indexOf('mp_list') >= 0) location.reload() });
    }).catch(function () {});
  }

  /* ---------- abrir las apps oficiales ---------- */
  function openExternal(url) {
    if (P.AppLauncher) return P.AppLauncher.openUrl({ url: url }).catch(function () { window.open(url, '_blank') });
    window.open(url, '_blank');
  }
  // Cualquier link que sale de la app (Ver en Netflix, JustWatch, TMDB…) se abre afuera:
  // si la plataforma tiene app instalada, el teléfono la abre directo.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (!/^https?:\/\//i.test(href)) return;
    e.preventDefault();
    if (window.MP_NATIVE.haptic) window.MP_NATIVE.haptic();
    openExternal(href);
  }, true);

  /* ---------- recordatorios ---------- */
  var LN = P.LocalNotifications;
  function notifId(k) { var h = 0; for (var i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) | 0; return Math.abs(h) % 2000000000 + 1 }
  function remind(k, item, title, at) {
    if (!LN) return Promise.reject(new Error('Sin notificaciones'));
    return LN.requestPermissions().then(function (p) {
      if (p.display !== 'granted') throw new Error('Para recordarte, permití las notificaciones de MiPantalla en los ajustes del teléfono.');
      return LN.schedule({ notifications: [{
        id: notifId(k),
        title: '🍿 Hora de ver ' + title,
        body: 'Te lo recordamos desde MiPantalla. Tocá para ver dónde está.',
        schedule: { at: at, allowWhileIdle: true },
        extra: { k: k, item: item }
      }] });
    });
  }
  function cancelRemind(k) { return LN ? LN.cancel({ notifications: [{ id: notifId(k) }] }).catch(function () {}) : Promise.resolve() }
  function pendingReminder(k) {
    if (!LN) return Promise.resolve(null);
    return LN.getPending().then(function (r) {
      var n = (r.notifications || []).filter(function (x) { return x.id === notifId(k) })[0];
      return n && n.schedule && n.schedule.at ? new Date(n.schedule.at) : (n ? true : null);
    }).catch(function () { return null });
  }
  // Al tocar la notificación, se abre la ficha del título.
  if (LN) LN.addListener('localNotificationActionPerformed', function (ev) {
    var x = ev && ev.notification && ev.notification.extra;
    if (!x || !x.k) return;
    var go = function () { if (window.mpOpen) window.mpOpen(x.k, x.item); else setTimeout(go, 300) };
    go();
  });

  /* ---------- compartir y vibrar ---------- */
  function share(d) {
    if (P.Share) return P.Share.share({ title: d.title, text: d.text, url: d.url, dialogTitle: 'Compartir' });
    return Promise.reject(new Error('Sin compartir'));
  }
  function haptic() { if (P.Haptics) P.Haptics.impact({ style: 'LIGHT' }).catch(function () {}) }

  /* ---------- barra de arriba y botón Atrás (Android) ---------- */
  if (P.StatusBar) { P.StatusBar.setStyle({ style: 'DARK' }).catch(function () {}); }
  if (P.App) P.App.addListener('backButton', function () {
    var ov = document.getElementById('ov');
    if (ov && ov.classList.contains('on')) { var c = document.querySelector('#modal .close'); if (c) c.click(); return }
    if (document.body.classList.contains('searching')) { document.body.classList.remove('searching'); return }
    P.App.minimizeApp ? P.App.minimizeApp() : P.App.exitApp();
  });

  window.MP_NATIVE = {
    platform: C.getPlatform(),
    publicUrl: PUBLIC_URL,
    openExternal: openExternal,
    share: share,
    haptic: haptic,
    remind: remind,
    cancelRemind: cancelRemind,
    pendingReminder: pendingReminder
  };
})();
