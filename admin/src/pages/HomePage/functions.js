export function buildReceiversOptions(receivers) {
  let options = [];
  const customFieldName = process.env.STRAPI_ADMIN_CUSTOM_FIELD_NAME;
  const fieldName = customFieldName ? customFieldName : "expoPushToken";
  console.log("I found a fieldName", fieldName);
  receivers.forEach((receiver) => {
    // if (!receiver[fieldName]) return;
    options.push({
      label: receiver.username,
      value: receiver[fieldName],
    });
  });
  return options;
}
