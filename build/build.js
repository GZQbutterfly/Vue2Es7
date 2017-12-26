module.exports = (process.env.NODE_ENV === 'production') ? require('./prod.env') : require('./dev.env');
