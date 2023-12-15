import React, { useState } from "react";
import { Typography, Box } from "@strapi/design-system";
import { Attachment } from "@strapi/icons";
import AttachAnEntry from "./attach_an_entry";

import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

export default function SwitchAttachAnEntry(props) {
  const { formik } = props;
  const [showAttachEntry, setShowAttachEntry] = useState(false);
  const { formatMessage } = useIntl();
  const removeAttachment = () => {
    formik.setFieldValue("contentType", "");
    formik.setFieldValue("entryId", "");
    setShowAttachEntry(false);
  };
  const showAttachment = () => {
    setShowAttachEntry(true);
  };
  if (showAttachEntry) {
    return (
      <div>
        <Box style={{ marginBottom: 20 }} background="neutral100" padding="4">
          <AttachAnEntry {...props} />
        </Box>
        <div
          style={{
            cursor: "pointer",
            color: "#4A45FF",
            maxWidth: 150,
          }}
          onClick={removeAttachment}
        >
          <Typography variant="pi" textColor="#4A45FF">
            {formatMessage({
              id: getTrad("detach.entry"),
              defaultMessage: "Remove attachment",
            })}
          </Typography>
        </div>
      </div>
    );
  }
  return (
    <Box background="neutral100" padding="6">
      <div
        style={{
          cursor: "pointer",
          color: "#4A45FF",
          display: "flex",
        }}
        onClick={showAttachment}
      >
        <Attachment width={20} height={20} color="neutral600" />
        <div style={{ marginLeft: 8 }}>
          <Typography variant="omega" textColor="neutral600">
            {formatMessage({
              id: getTrad("attach.entry"),
              defaultMessage: "Attach an entry",
            })}
          </Typography>
        </div>
      </div>
    </Box>
  );
}
