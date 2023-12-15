import React from "react";
import { Box, Typography } from "@strapi/design-system";

import ReceiverItem from "./receiver_item";
// import SelectReceivers from "./select_receivers";

import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

export default function Receivers({
  receivers,
  tokens,
  removeAll,
  addAll,
  addToken,
  removeToken,
  // receiversCount,
  // setTokens,
}) {
  const { formatMessage } = useIntl();
  return (
    <div style={{ height: 450 }}>
      <Box padding={6}>
        <Box paddingBottom={2}>
          <Typography variant="beta">
            {formatMessage({
              id: getTrad("title.receivers"),
              defaultMessage: "Receivers",
            })}
          </Typography>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4,
            color: "#4A45FF",
          }}
        >
          <div style={{ cursor: "pointer" }} onClick={() => addAll()}>
            <Typography variant="pi" textColor="#4A45FF">
              {formatMessage({
                id: getTrad("select.all"),
                defaultMessage: "Select all",
              })}
            </Typography>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => removeAll()}>
            <Typography variant="pi" textColor="#4A45FF">
              {formatMessage({
                id: getTrad("unselect.all"),
                defaultMessage: "Unselect all",
              })}
            </Typography>
          </div>
        </div>
        <div
          style={{
            overflowY: "scroll",
            marginTop: 16,
            height: 160,
          }}
        >
          {receivers.map((item) => (
            <div key={item.label}>
              <ReceiverItem
                item={item}
                tokens={tokens}
                addToken={addToken}
                removeToken={removeToken}
              />
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

{
  /* <SelectReceivers
  receivers={receivers}
  tokens={tokens}
  setTokens={setTokens}
/> */
}
