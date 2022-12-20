import React, { useState } from "react";

// import pluginId from "../../pluginId";
import { Switch, Route } from "react-router-dom";
import { NotFound } from "@strapi/helper-plugin";

import notificationsRequests from "../../api/exponotification";

import { Icon } from "@strapi/design-system/Icon";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  BaseHeaderLayout,
  TwoColsLayout,
  ContentLayout,
} from "@strapi/design-system/Layout";

import Sender from "./sender";
import Sent from "./sent";
import Receivers from "./receivers";

import pluginId from "../../pluginId";

const Pencil = () => (
  <Icon
    width={`${25 / 16}rem`}
    height={`${25 / 16}rem`}
    color="secondary500"
    as={Pencil}
  />
);

export default function Main({
  notifications,
  count,
  receivers,
  receiversCount,
  refreshNotificationsState,
  isLoading,
}) {
  const [tokens, setTokens] = useState([]);
  const [testMode, setTestMode] = useState(false);

  const addToken = (token) => {
    setTokens([...tokens, token]);
  };
  const removeToken = (token) => {
    setTokens(tokens.filter((item) => item !== token));
  };
  const addAll = () => {
    setTokens(receivers.map((item) => item.expoPushToken));
  };
  const removeAll = () => {
    setTokens([]);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      subtitle: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Ce champ est requis"),
    }),
    onSubmit: async (values) => {
      // console.log("values", values, "testMode", testMode, "tokens", tokens);
      if (!testMode && tokens.length !== 0) {
        await notificationsRequests
          .createNotification(values, tokens)
          .then((res) => {
            // console.log(res);
            refreshNotificationsState();
            resetForm();
          });
      } else {
        console.log("no receivers");
      }
    },
  });
  const resetForm = () => {
    formik.handleReset();
    setTokens([]);
  };
  const sendTest = (e) => {
    e.preventDefault();
    setTestMode(true);
    formik.handleSubmit();
  };
  const sendForReal = async (e) => {
    e.preventDefault();
    setTestMode(false);
    formik.handleSubmit();
  };

  return (
    <div>
      <BaseHeaderLayout
        title="Mes notifications"
        subtitle={`${count} notifications envoyées`}
        as="h2"
      />
      <ContentLayout>
        <TwoColsLayout
          startCol={
            <Sender
              formik={formik}
              sendTest={sendTest}
              sendForReal={sendForReal}
            />
          }
          endCol={
            <Receivers
              receivers={receivers}
              receiversCount={receiversCount}
              tokens={tokens}
              setTokens={setTokens}
              addToken={addToken}
              removeToken={removeToken}
              addAll={addAll}
              removeAll={removeAll}
            />
          }
        />
        <div style={{ paddingTop: 12 }}>
          <Switch>
            <Route path={`/plugins/${pluginId}`} exact>
              <Sent
                notifications={notifications}
                count={count}
                isLoading={isLoading}
              />
            </Route>
            <Route component={NotFound} />
          </Switch>
        </div>
      </ContentLayout>
    </div>
  );
}
