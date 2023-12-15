import React from "react";

import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

export default function Selector({
  type = "Content type",
  options = [],
  required,
  value,
  manageSelected,
  placeholder,
}) {
  const { formatMessage } = useIntl();
  return (
    <SingleSelect
      label={formatMessage({
        id: getTrad(type),
        defaultMessage: type === "Entry" ? "Entry" : "Content type",
      })}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={manageSelected}
      disabled={options.length === 0}
    >
      {options.map((option) => {
        return (
          <SingleSelectOption value={option.value} key={option.value}>
            {option.label}
          </SingleSelectOption>
        );
      })}
    </SingleSelect>
  );
}
