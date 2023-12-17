async function fetchReceipts(strapi, strapiNotification, expo, tickets) {
  let receiptIds = [];
  let receiptErrors = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }
  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log("receipts", receipts);
      for (let receiptId in receipts) {
        let { status, message, details } = receipts[receiptId];
        if (status === "ok") {
          continue;
        } else if (status === "error") {
          console.error(
            `There was an error sending a notification: ${message}`
          );
          receiptErrors.push({ status, message, details });
          if (details && details.error) {
            console.error(`The error code is ${details.error}`);
          }
        }
      }
      const { id, receivers } = strapiNotification;
      return await strapi.entityService.update(
        "plugin::expo-notifications.exponotification",
        id,
        {
          data: {
            receivers: { ...receivers, errorsWhileReceiving: receiptErrors },
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = () => ({
  scheduleReceiptFetch(strapi, strapiNotification, expo, tickets) {
    const delay = 5 * 60 * 1000;
    setTimeout(
      () => fetchReceipts(strapi, strapiNotification, expo, tickets),
      delay
    );
  },
});
