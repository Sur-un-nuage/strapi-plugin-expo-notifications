import React, { useEffect, useState } from "react";

import { useFetchClient } from "@strapi/helper-plugin";
import { Grid, GridItem } from "@strapi/design-system";

import Selector from "./selector";
import MakeItTitle from "./make_it_title";

const buildOptionsFromContentTypes = (contentTypes) => {
  const options = [];
  if (!contentTypes || contentTypes.length === 0) return options;
  contentTypes.forEach((contentType) => {
    options.push({
      label: contentType.globalId,
      value: contentType.uid,
    });
  });
  return options;
};

function buildOptionsFromEntries(responseData) {
  let options = [];
  if (!responseData) {
    return options;
  } else if (Array.isArray(responseData)) {
    options = responseData.map((item) => {
      return { value: item.id, label: item.title || "No title" };
    });
  } else if (typeof responseData === "object") {
    if ("title" in responseData) {
      options.push({ value: responseData.id, label: responseData.title });
    } else {
      console.error("The object does not have a title property");
    }
  } else {
    console.error("Response data is neither an array nor an object");
  }
  return options;
}

export default function AttachAnEntry(props) {
  const { formik } = props;
  const [contentTypes, setContentTypes] = useState([]);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { get } = useFetchClient();
  async function fetchTypes() {
    setLoading(true);
    const res = await get(`/expo-notifications/get-content-types`);
    const typesOptions = buildOptionsFromContentTypes(res.data);
    setContentTypes(typesOptions);
    if (typesOptions.length > 0) {
      formik.setFieldValue("contentType", typesOptions[0].value);
      fetchEntries(typesOptions[0].value);
    }
  }
  async function fetchEntries(value) {
    const res = await get(`/expo-notifications/get-entries/${value}`);
    const entriesOptions = buildOptionsFromEntries(res.data);
    setEntries(entriesOptions);
    if (entriesOptions.length > 0) {
      formik.setFieldValue("entryId", entriesOptions[0].value);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchTypes();
  }, []);
  const manageContentTypeSelected = (value) => {
    formik.setFieldValue("contentType", value);
    fetchEntries(value);
  };
  const manageEntrySelected = (value) => {
    formik.setFieldValue("entryId", value);
  };
  function getLabelFromValue(value) {
    const found = entries.find((item) => item.value == value);
    return found ? found.label : "";
  }
  return (
    <div>
      <Grid gap={5}>
        <GridItem col={3}>
          <Selector
            type="Content type"
            options={contentTypes}
            manageSelected={manageContentTypeSelected}
            value={formik.values.contentType}
            placeholder="Select a content type"
            loading={loading}
          />
        </GridItem>
        <GridItem col={9}>
          <Selector
            type="Entry"
            options={entries}
            manageSelected={manageEntrySelected}
            value={formik.values.entryId}
            placeholder="Select an entry"
          />
          <MakeItTitle
            formik={formik}
            label={getLabelFromValue(formik.values.entryId)}
          />
        </GridItem>
      </Grid>
    </div>
  );
}
