"use strict";
const { Expo } = require("expo-server-sdk");

const getStartFormQuery = (query) => {
  const { page, pageSize } = query;
  if (Number(page) <= 1) {
    return 0;
  }
  return (Number(page) - 1) * pageSize;
};

async function sendThem(expo, chunks) {
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
    return tickets;
  }
}

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::expo-notifications.exponotification",
      query
    );
  },
  async findFrom(query = { page: "1", pageSize: "10" }) {
    const start = getStartFormQuery(query);
    const count = await strapi.entityService.count(
      "plugin::expo-notifications.exponotification"
    );
    const notifications = await strapi.entityService.findMany(
      "plugin::expo-notifications.exponotification",
      {
        start: start,
        limit: query.pageSize,
        sort: "createdAt:desc",
      }
    );
    return { notifications, count };
  },
  async recipientsFrom(start) {
    const count = await strapi.entityService.count(
      "plugin::users-permissions.user"
    );
    const recipients = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        start: start,
        limit: 10,
      }
    );
    return { recipients, count };
  },
  async create(body) {
    const { data, tokens } = body;
    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    let messages = [];
    for (let pushToken of tokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      messages.push({
        to: pushToken,
        sound: "default",
        title: data.title,
        body: data.subtitle,
        // data: { withSome: "data" },
      });
    }
    let chunks = expo.chunkPushNotifications(messages);
    const tickets = sendThem(expo, chunks);
    const strapiData = await strapi.entityService.create(
      "plugin::expo-notifications.exponotification",
      { data: data }
    );
    return { tickets, strapiData };
  },
  async update(id, data) {
    return await strapi.entityService.update(
      "plugin::expo-notifications.exponotification",
      id,
      data
    );
  },
  async delete(id) {
    return await strapi.entityService.delete(
      "plugin::expo-notifications.exponotification",
      id
    );
  },
});
