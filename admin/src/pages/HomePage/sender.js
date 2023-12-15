import React from "react";

import {
  Box,
  Typography,
  Button,
  Stack,
  Field,
  FieldLabel,
  FieldInput,
} from "@strapi/design-system";

import SwitchAttachAnEntry from "./switch_attach";

import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

export default function Sender(props) {
  const { formik, sendTest, sendForReal, testToken } = props;
  const { formatMessage } = useIntl();
  return (
    <div style={{ height: 450 }}>
      <Box padding={4}>
        <Box paddingTop={2} paddingBottom={4}>
          <Typography variant="beta">
            {formatMessage({
              id: getTrad("title.new"),
              defaultMessage: "New notification",
            })}
          </Typography>
        </Box>
        <form>
          <div
            style={{
              height: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Stack spacing={4}>
              <Field name="title">
                <FieldLabel>
                  {formatMessage({
                    id: getTrad("title"),
                    defaultMessage: "Title",
                  })}
                </FieldLabel>
                <FieldInput
                  type="text"
                  placeholder={formatMessage({
                    id: getTrad("title.placeholder"),
                    defaultMessage: "Chose a title",
                  })}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
              </Field>
              <Field name="subtitle">
                <FieldLabel>
                  {formatMessage({
                    id: getTrad("subtitle"),
                    defaultMessage: "Subtitle",
                  })}
                </FieldLabel>
                <FieldInput
                  type="text"
                  placeholder={formatMessage({
                    id: getTrad("subtitle.placeholder"),
                    defaultMessage: "Chose a subtitle",
                  })}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.subtitle}
                />
              </Field>
              <SwitchAttachAnEntry {...props} />
            </Stack>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 24,
                marginBottom: 14,
              }}
            >
              {testToken && (
                <Button variant="secondary" type="submit" onClick={sendTest}>
                  {formatMessage({
                    id: getTrad("send.test"),
                    defaultMessage: "Send a test",
                  })}
                </Button>
              )}
              <div style={{ marginLeft: 8 }}>
                <Button type="submit" onClick={sendForReal}>
                  {formatMessage({
                    id: getTrad("send.real"),
                    defaultMessage: "Send",
                  })}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}
