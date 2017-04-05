var jwt = require('express-jwt');

function getTokenFromHeader(req){
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1];
  }

  return null;
}

var jwtCheck = jwt({audience:'TbHzK1zgP9mMH8qvoEWCN87HglMeZNxp', secret: 'KeG2O1j2xs78BuKtnjygMxWRx2Ch8VexlPNkTFuVR8P2bPGoMaLsbIWPLHoFTcvj', userProperty: 'payload', getToken: getTokenFromHeader});
var ignoreJwtCheck = jwt({audience:'TbHzK1zgP9mMH8qvoEWCN87HglMeZNxp', secret: 'KeG2O1j2xs78BuKtnjygMxWRx2Ch8VexlPNkTFuVR8P2bPGoMaLsbIWPLHoFTcvj', userProperty:'payload', getToken: getTokenFromHeader, credentialsRequired: false});

var auth = {
  required: jwtCheck,
  optional: ignoreJwtCheck,
  getTokenFromHeader: getTokenFromHeader
};

module.exports = auth;
