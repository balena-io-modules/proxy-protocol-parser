'use strict';

const common = require('./v2_common');
const v1Decode = require('./v1_decode');
const v2Decode = require('./v2_decode');

module.exports = (buf, validate) => {
	if (buf.length >= 16) {
		var sigBytes = common.sigBytes;
		var sigLength = sigBytes.length;
		var receivedSig = buf.slice(0, sigLength);

		if (!sigBytes.compare(receivedSig)) {
			return v2Decode(buf, validate, receivedSig);
		}
	}

	const str = String(buf);
	if (str.length >= 8) {
		if (str.slice(0, 5) === 'PROXY') {
			return v1Decode(str, validate);
		}
	}

	return null;
};
