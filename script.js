const getIPs = callback => {
  const ip_dups = {};
  const pc = new (window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection)({
    iceServers: [{ urls: "stun:stun.services.mozilla.com" }],
  }, { optional: [{ RtpDataChannels: true }] });

  pc.onicecandidate = ice => {
    ice.candidate && (ip_dups[ip_addr] = true, callback(ip_addr), ip_addr = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1], ip_dups[ip_addr] === undefined);
  };

  pc.createDataChannel(""), pc.createOffer().then(result => pc.setLocalDescription(result));

  setTimeout(() => pc.localDescription.sdp.split('\n').forEach(line => line.indexOf('a=candidate:') === 0 && (ip_dups[ip_addr] = true, callback(ip_addr), ip_addr = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(line)[1], ip_dups[ip_addr] === undefined)), 1000);
};
