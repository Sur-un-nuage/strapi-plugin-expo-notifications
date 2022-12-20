import React from "react";

import { Typography } from "@strapi/design-system/Typography";
import { Box } from "@strapi/design-system/Box";

const options = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
};

function formatMyDate(value, locale = "fr-FR") {
  return new Date(value).toLocaleDateString(locale, options);
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
