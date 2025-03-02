peer = ''
text = ''

function and (a1, a2) {
  j = a1.length
  while (j--) a1[j] ^= a2[j]
  return a1
}

function array (a) {
  return Uint8Array.from(atob(a), a => a.charCodeAt())
}

function base (a, b) {
  c = new FileReader()
  c.onloadend = () => b(c.result.slice(37))
  c.readAsDataURL(new Blob([a]))
}

function chars (a) {
  return btoa(String.fromCharCode(...a))
}

out = ''
len = 65
peer = await crypto.subtle.importKey('spki', array(peer), {name: 'ecdh'}, true, ['deriveBits'])
base(text, async text => {
  text = array(text)
  range = Math.floor((text.length - 1) / len) + 1
  for (i = 0; i < range; i++) {
    pair = await crypto.subtle.generateKey({name: 'ecdh', namedCurve: 'p-521'}, true, ['deriveBits'])
    shar = new Uint8Array(await crypto.subtle.deriveBits({name: 'ecdh', public: peer}, pair.privateKey, 528))
    publ = new Uint8Array(await crypto.subtle.exportKey('spki', pair.publicKey))
    start = len * i
    out += chars(publ) + chars(and(shar.slice(1), text.slice(start, start + len)))
  }
  console.log('share:\n' + out)
})