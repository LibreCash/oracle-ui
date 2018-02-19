// todo: review crypto algo PoW-hack

import CryptoJS from "crypto-js"

class Crypto {
	constructor () {
	}
	test () {
		var enc = this.encrypt('test', 'key0')
		var dec = this.decrypt(enc, 'key0')
	  console.log(enc)
	  console.log(dec.toString())
	}
	encrypt (s, key) {
		var ciphertext = CryptoJS.AES.encrypt(s, key)
		return ciphertext.toString()
	}
	decrypt (s, key) {
		var text = CryptoJS.AES.decrypt(s, key)
		try {
			return text.toString(CryptoJS.enc.Utf8)
		}
		catch (e) {
			return null
		}
	}
}

export default Crypto
