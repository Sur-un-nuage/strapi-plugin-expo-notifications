import React from "react";

import { Typography } from "@strapi/design-system";

import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

export default function MakeItTitle({ formik, label }) {
  const { values } = formik;
  const { entryId } = values;
  const { formatMessage } = useIntl();
  const makeItTitle = () => {
    formik.setFieldValue("title", label);
  };
  const makeItSubTitle = () => {
    formik.setFieldValue("subtitle", label);
  };
  if (!entryId || entryId === "") return null;
  return (
    <div
      style={{
        color: "#4A45FF",
        marginTop: 8,
        marginLeft: 8,
        display: "flex",
      }}
    >
      <div style={{ marginRight: 8, cursor: "pointer" }} onClick={makeItTitle}>
        <Typography variant="pi" textColor="#4A45FF">
          {formatMessage({
            id: getTrad("make.title"),
            defaultMessage: "Make it the title ",
          })}
        </Typography>
      </div>
      <Typography variant="pi" textColor="#4A45FF">
        -
      </Typography>
      <div
        style={{ marginLeft: 8, cursor: "pointer" }}
        onClick={makeItSubTitle}
      >
        <Typography variant="pi" textColor="#4A45FF">
          {formatMessage({
            id: getTrad("make.subtitle"),
            defaultMessage: " Make it the subtitle",
          })}
        </Typography>
      </div>
    </div>
  );
}
