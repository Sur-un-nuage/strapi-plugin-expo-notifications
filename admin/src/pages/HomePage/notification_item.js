import React from "react";

import { Typography, Box } from "@strapi/design-system";

import { auth } from "@strapi/helper-plugin";

const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function formatMyDate(value, locale = "en") {
  if (!value) return null;
  return new Date(value).toLocaleDateString(locale, options);
}

export default function NotificationItem({ item }) {
  const user = auth.get("userInfo");
  const { preferedLanguage } = user;
  const { title, subtitle, createdAt } = item;
  const legibleCreatedAt = formatMyDate(createdAt, preferedLanguage);
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
