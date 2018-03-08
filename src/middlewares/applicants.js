const { decodeSession } = require('../lib/applicants');
const Applicant = require('../models/applicant');

exports.fetchSession = async (ctx, next) => {
  const authorizationHeader = ctx.headers.authorization;
  if (!authorizationHeader) return next();
  const authorizationHeaders = authorizationHeader.split(' ');
  if (authorizationHeaders.length !== 2) throw new Error('Invalid Authorization Token');
  const magicToken = decodeSession(authorizationHeaders[1]);
  if (magicToken) ctx.state.applicant = await Applicant.findOne({ magicToken });
  return next();
};