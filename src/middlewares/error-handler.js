module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const errorStatus = Number.isInteger(err.status) && err.status;
    ctx.status = errorStatus || 500;
    ctx.body = {
      error: {
        message: err.message,
      }
    };
    ctx.app.emit('error', err, ctx);
  }
};