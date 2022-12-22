import React from "react";

import { Typography, Box } from "@strapi/design-system";

const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function formatMyDate(value) {
  if (!value) return null;
  const currentLocale =
    localStorage.getItem("strapi-admin-language") ?? "en-US";
  try {
    const date = new Date(value);
    const localizedDate = date.toLocaleDateString(currentLocale, options);
    return localizedDate;
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default function NotificationItem({ item }) {
  const { title, subtitle, createdAt } = item;
  const legibleCreatedAt = formatMyDate(createdAt);
  return (
    <Box paddingBottom={4}>
      <Typography variant="pi">{legibleCreatedAt}</Typography>
      <br />
      <Typography variant="epsilon">{title}</Typography>
      <br />
      <div style={{ color: "#B1B1C3" }}>
        <Typography variant="omega" textColor="textColor">
          {subtitle}
        </Typography>
      </div>
    </Box>
  );
}
