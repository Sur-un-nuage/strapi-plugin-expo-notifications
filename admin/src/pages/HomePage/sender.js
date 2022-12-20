import React from "react";
import _ from "lodash";

import { Box, Typography, Button, Stack } from "@strapi/design-system";

import {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  FieldInput,
  FieldAction,
} from "@strapi/design-system/Field";

export default function Sender({ formik, sendTest, sendForReal }) {
  return (
    <div style={{ height: 280 }}>
      <Box padding={4}>
        <Box paddingTop={2} paddingBottom={4}>
          <Typography variant="beta">Nouvelle notification</Typography>
        </Box>
        <form>
          <Stack spacing={4}>
            <Field name="title">
              <FieldLabel>Titre</FieldLabel>
              <FieldInput
                type="text"
                placeholder="Choisissez un titre pour votre notification"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </Field>
            <Field name="subtitle">
              <FieldLabel>Sous-titre</FieldLabel>
              <FieldInput
                type="text"
                placeholder="Choisissez un sous-titre"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.subtitle}
              />
            </Field>
          </Stack>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 24,
              marginBottom: 14,
            }}
          >
            <Button variant="secondary" type="submit" onClick={sendTest}>
              Envoyer un test
            </Button>
            <div style={{ marginLeft: 8 }}>
              <Button type="submit" onClick={sendForReal}>
                Envoyer
              </Button>
            </div>
          </div>
        </form>
      </Box>
    </div>
  );
}
