'use strict';

module.exports = function decode(buf, validate) {
	var socketDetails = {};
	var parts = String(buf)
		.split(/( |\r\n)/)
		.filter((s) => s !== ' ');
	var sig = parts[0];
	var family = parts[1];
	var remoteAddress = parts[2];
	var localAddress = parts[3];
	var remotePort = Number(parts[4]);
	var localPort = Number(parts[5]);
	var crlf = parts[6];

	if (validate) {
		if (sig !== 'PROXY') {
			throw new Error('proxy protocol: invalid signature received');
		}

		if (family !== 'TCP4' && family !== 'TCP6') {
			throw new Error('proxy protocol: unsupported family received');
		}

		if (crlf !== '\r\n') {
			throw new Error('proxy protocol: invalid end of line received');
		}
	}

	socketDetails.protocol = 'tcp';
	socketDetails.remoteFamily = family === 'TCP4' ? 'IPv4' : 'IPv6';
	socketDetails.remoteAddress = remoteAddress;
	socketDetails.localAddress = localAddress;
	socketDetails.remotePort = remotePort;
	socketDetails.localPort = localPort;

	return socketDetails;
};
