"use strict";
const { Expo } = require("expo-server-sdk");

const getStartFormQuery = (query) => {
  const { page, pageSize } = query;
  if (Number(page) <= 1) {
    return 0;
  }
  return (Number(page) - 1) * pageSize;
};

function buildMessage(pushToken, data) {
  const { title, subtitle, contentType, entryId } = data;
  const messageWithoutData = {
    to: pushToken,
    sound: "default",
    title: title,
    body: subtitle,
  };
  const messageWithData = {
    ...messageWithoutData,
    data: { contentType: data.contentType, entryId: data.entryId },
  };
  const messagetoSend =
    contentType && contentType !== "" && entryId && entryId !== ""
      ? messageWithData
      : messageWithoutData;
  console.log("Plugin will send the following message", messagetoSend);
  return messagetoSend;
}

async function sendThem(expo, chunks) {
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log("ticketChunk", ticketChunk);
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
    const customFieldName = await strapi
      .plugin("expo-notifications")
      .config("customFieldName");
    let recipients = [];
    if (customFieldName) {
      const rawRecipients = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          start: start,
          // limit: 200,
          filters: {
            [customFieldName]: {
              $notNull: true,
            },
          },
        }
      );
      rawRecipients.forEach((item) => {
        item.expoPushToken = item[customFieldName];
        recipients.push(item);
      });
    } else {
      recipients = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          start: start,
          // limit: 200,
          filters: {
            expoPushToken: {
              $notNull: true,
            },
          },
        }
      );
    }
    return { recipients, count };
  },
  async processNotification(body) {
    const { data, tokens } = body;
    let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });
    let messages = [];
    for (let pushToken of tokens) {
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }
      const messagetoSend = buildMessage(pushToken, data);
      messages.push(messagetoSend);
    }
    let chunks = expo.chunkPushNotifications(messages);
    const tickets = await sendThem(expo, chunks);
    console.log("tickets from process notifs", tickets);
    const strapiData = await strapi.entityService.create(
      "plugin::expo-notifications.exponotification",
      {
        data: {
          title: data.title,
          subtitle: data.subtitle,
          data: { contentType: data.contentType, entryId: data.entryId },
          receivers: tickets,
        },
      }
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
