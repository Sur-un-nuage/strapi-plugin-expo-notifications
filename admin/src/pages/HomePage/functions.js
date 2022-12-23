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
