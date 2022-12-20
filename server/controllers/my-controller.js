'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('expo-notifications')
      .service('myService')
      .getWelcomeMessage();
  },
});
