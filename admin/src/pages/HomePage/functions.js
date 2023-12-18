export function getContentTypeName(contentTypeUid) {
  if (!contentTypeUid.includes("::")) {
    return contentTypeUid.trim();
  }
  let parts = contentTypeUid.split("::");
  if (parts.length < 2 || !parts[1].includes(".")) {
    return contentTypeUid.trim();
  }

  let myContentType = parts[1].split(".")[1];
  return myContentType.trim();
}

export function buildReceiversOptions(receivers) {
  let options = [];
  receivers.forEach((receiver) => {
    options.push({
      label: receiver.username,
      value: receiver.expoPushToken,
    });
  });
  return options;
}
