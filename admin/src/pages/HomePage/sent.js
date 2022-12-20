import React from "react";
import _ from "lodash";

import {
  Loader,
  Box,
  EmptyStateLayout,
  Typography,
  Divider,
} from "@strapi/design-system";

import { Illo } from "../../components/Illo";
import NotificationItem from "./notification_item";
import PaginationURLQuery from "../../components/paginationURLQuery";

function getCurrentPageFromCount(count, pageSize) {
  const rawCount = count - 1;
  const currentPage = parseInt(rawCount / pageSize) + 1;
  return currentPage;
}

function SentList({ notifications, isLoading }) {
  const sortedNotifs = _.orderBy(notifications, ["createdAt"], ["desc"]);
  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        <Loader>Loading content...</Loader>
      </div>
    );
  if (!notifications.length || notifications.length === 0) {
    return (
      <EmptyStateLayout
        shadow={null}
        icon={<Illo />}
        content="Vous n'avez pas encore envoyé de notification..."
      />
    );
  }
  return (
    <div>
      {sortedNotifs.map((item) => (
        <div key={item.id}>
          <Box paddingTop={3} paddingBottom={3}>
            <NotificationItem item={item} />
            <Divider />
          </Box>
        </div>
      ))}
    </div>
  );
}

export default function Sent({ notifications, count, isLoading }) {
  const currentPage = getCurrentPageFromCount(count, 10);
  // console.log("currentPage", currentPage);
  return (
    <div style={{ backgroundColor: "white" }}>
      <Box paddingTop={6} paddingBottom={6} paddingLeft={4} paddingRight={4}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="beta">Notifications envoyées</Typography>
          <PaginationURLQuery pagination={{ pageCount: currentPage }} />
        </div>
        <Divider unsetMargin={false} />
        <SentList notifications={notifications} isLoading={isLoading} />
      </Box>
    </div>
  );
}
