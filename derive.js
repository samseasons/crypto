function chars (a) {
  return btoa(String.fromCharCode(...a))
}

pair = await crypto.subtle.generateKey({name: 'ecdh', namedCurve: 'p-521'}, true, ['deriveBits'])
priv = new Uint8Array(await crypto.subtle.exportKey('pkcs8', pair.privateKey))
publ = new Uint8Array(await crypto.subtle.exportKey('spki', pair.publicKey))
console.log('public:\n' + chars(publ) + '\n\nprivate:\n' + chars(priv))