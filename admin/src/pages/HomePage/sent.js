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

import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

function getCurrentPageFromCount(count, pageSize) {
  const rawCount = count - 1;
  const currentPage = parseInt(rawCount / pageSize) + 1;
  return currentPage;
}

function SentList({ notifications, isLoading, formatMessage }) {
  const sortedNotifs = _.orderBy(notifications, ["createdAt"], ["desc"]);
  if (isLoading)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: 100 }}
      >
        <Loader>
          {formatMessage({
            id: getTrad("loading"),
            defaultMessage: "Loading content...",
          })}
        </Loader>
      </div>
    );
  if (!notifications || !notifications.length || notifications.length === 0) {
    return (
      <EmptyStateLayout
        shadow={null}
        icon={<Illo />}
        content={formatMessage({
          id: getTrad("empty.state"),
          defaultMessage: "You haven't sent any notification yet",
        })}
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
  const { formatMessage } = useIntl();
  const currentPage = getCurrentPageFromCount(count, 10);
  return (
    <Box style={{ backgroundColor: "white" }}>
      <Box paddingTop={6} paddingBottom={6} paddingLeft={4} paddingRight={4}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="beta">
            {formatMessage({
              id: getTrad("title.sent"),
              defaultMessage: "Sent notifications",
            })}
          </Typography>
          <PaginationURLQuery pagination={{ pageCount: currentPage }} />
        </div>
        <Divider unsetMargin={false} />
        <SentList
          notifications={notifications}
          isLoading={isLoading}
          formatMessage={formatMessage}
        />
      </Box>
    </Box>
  );
}
