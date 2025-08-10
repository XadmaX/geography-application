process.env.NODE_ENV = 'test';
// Prevent unhandledRejection from failing specs when we intentionally reject in spies
process.on('unhandledRejection', () => {});
