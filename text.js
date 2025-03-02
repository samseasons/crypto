priv = ''
text = ''

function and (a1, a2) {
  j = a1.length
  while (j--) a1[j] ^= a2[j]
  return a1
}

function array (a) {
  return Uint8Array.from(atob(a), a => a.charCodeAt())
}

function chars (a) {
  return btoa(String.fromCharCode(...a))
}

function sabe (a, b) {
  c = new FileReader()
  c.onloadend = () => b(c.result)
  c.readAsText(new Blob([array(a)]))
}

out = ''
pub = 212
span = 300
priv = await crypto.subtle.importKey('pkcs8', array(priv), {name: 'ecdh'}, true, ['deriveBits'])
range = Math.floor((text.length - 1) / span) + 1
for (i = 0; i < range; i++) {
  p = span * i
  peer = await crypto.subtle.importKey('spki', array(text.slice(p, p + pub)), {name: 'ecdh'}, true, ['deriveBits'])
  shar = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ecdh', public: peer }, priv, 528))
  out += chars(and(shar.slice(1), array(text.slice(p + pub, p + span - 1))))
}
sabe(out, out => { console.log('text:\n' + out) })