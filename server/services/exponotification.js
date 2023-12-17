"use strict";
const { Expo } = require("expo-server-sdk");
const getExpoSender = require("./expoSender");
const getManageReceipts = require("./manageReceipts");

const getStartFromQuery = (query) => {
  const { page, pageSize } = query;
  if (Number(page) <= 1) {
    return 0;
  }
  return (Number(page) - 1) * pageSize;
};

module.exports = ({ strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany(
      "plugin::expo-notifications.exponotification",
      query
    );
  },
  async findFrom(query = { page: "1", pageSize: "10" }) {
    const start = getStartFromQuery(query);
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
    const { buildMessage, sendWithExpo } = getExpoSender();
    const { scheduleReceiptFetch } = getManageReceipts();
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
    const tickets = await sendWithExpo(expo, chunks);
    let combinedArray = [];
    for (let i = 0; i < chunks[0].length; i++) {
      let chunk = chunks[0][i];
      let ticket = tickets[i];
      // Only take the tickets with errors, indicating a sending error
      if (ticket.status !== "ok") {
        combinedArray.push({
          to: chunk.to,
          status: ticket.status,
          id: ticket.id,
        });
      }
    }
    const strapiNotificationResult = await strapi.entityService.create(
      "plugin::expo-notifications.exponotification",
      {
        data: {
          title: data.title,
          subtitle: data.subtitle,
          data: { contentType: data.contentType, entryId: data.entryId },
          receivers: { errorsWhileSending: combinedArray },
        },
      }
    );
    console.log(
      "strapiNotificationResult from process notifs",
      strapiNotificationResult
    );
    if (strapiNotificationResult) {
      scheduleReceiptFetch(strapi, strapiNotificationResult, expo, tickets);
    }
    return { tickets, strapiNotificationResult };
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
