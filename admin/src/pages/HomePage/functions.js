export function buildReceiversOptions(receivers) {
  let options = [];
  receivers.forEach((receiver) => {
    if (!receiver.expoPushToken) return;
    options.push({
      label: receiver.username,
      value: receiver.expoPushToken,
    });
  });
  return options;
}
