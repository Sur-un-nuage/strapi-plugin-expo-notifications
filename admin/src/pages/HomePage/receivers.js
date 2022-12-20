import React from "react";
import { Box } from "@strapi/design-system/Box";
import { Typography } from "@strapi/design-system/Typography";

import ReceiverItem from "./receiver_item";
// import SelectReceivers from "./select_receivers";

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
  return (
    <div style={{ height: 280 }}>
      <Box padding={6}>
        <Box paddingBottom={2}>
          <Typography variant="beta">Destinataires</Typography>
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
              Sélectionner tout
            </Typography>
          </div>
          <div style={{ cursor: "pointer" }} onClick={() => removeAll()}>
            <Typography variant="pi" textColor="#4A45FF">
              Déselectionner tout
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
        {/* <SelectReceivers
          receivers={receivers}
          tokens={tokens}
          setTokens={setTokens}
        /> */}
      </Box>
    </div>
  );
}
