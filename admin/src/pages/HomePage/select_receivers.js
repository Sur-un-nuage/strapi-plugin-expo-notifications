import React from "react";

import { Stack, Select, Option } from "@strapi/design-system";

import { buildReceiversOptions } from "./functions";

export default function SelectReceivers({ receivers, tokens, setTokens }) {
  const options = buildReceiversOptions(receivers);
  return (
    <Stack spacing={11}>
      <Select
        id="select1"
        onClear={() => setTokens([])}
        clearLabel="Déselectionner"
        selectButtonTitle="Carret Down Button"
        value={tokens}
        onChange={setTokens}
        customizeContent={(values) => `${values.length} sélectionné(s)`}
        multi
        // placeholder="Your example"
        // label="Choose your meal"
        // disabled={disabled}
        // hint="Description line"
        // error={error}
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Stack>
  );
}
