'use strict';

var dgramSocket = require('dgram').Socket;

module.exports = function encode(socketDetails) {
	var family = socketDetails.remoteFamily || 'IPv4',
		protocol =
			socketDetails.protocol ||
			(socketDetails.constructor === dgramSocket ? 'udp' : 'tcp'),
		afString;

	if (protocol == 'udp') throw new Error('Unsupported protocol: udp');

	if (family == 'IPv4') {
		afString = 'TCP4';
	} else if (family == 'IPv6') {
		afString = 'TCP6';
	} else {
		throw new Error('Unsupported address family: ' + family);
	}

	return Buffer.from(
		[
			'PROXY',
			afString,
			socketDetails.remoteAddress,
			socketDetails.localAddress,
			socketDetails.remotePort,
			socketDetails.localPort,
		].join(' ') + '\r\n'
	);
};
