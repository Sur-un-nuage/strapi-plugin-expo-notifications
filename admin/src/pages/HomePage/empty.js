import React from "react";

import { EmptyStateLayout } from "@strapi/design-system";

import { Illo } from "../../components/Illo";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

export default function Empty() {
  const { formatMessage } = useIntl();
  return (
    <div>
      <EmptyStateLayout
        shadow={null}
        icon={<Illo />}
        content={formatMessage({
          id: getTrad("empty.state"),
          defaultMessage: "You haven't sent any notification yet",
        })}
      />
    </div>
  );
}
