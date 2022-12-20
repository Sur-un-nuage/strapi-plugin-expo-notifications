import React, { useEffect, useState } from "react";
import _ from "lodash";
// import { useLocation } from "react-router-dom";
// import pluginId from "../../pluginId";

import myRequests from "../../api/exponotification";
import useQueryParams from "../../utils/useQueryParams";

import Main from "./main";

import { buildReceiversOptions } from "./functions";

export default function HomePageWithData() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [testToken, setTestToken] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [receiversCount, setReceiversCount] = useState(0);
  // const location = useLocation();
  const [{ query }] = useQueryParams();

  const fetchConfig = async () => {
    const config = await myRequests.getPluginConfig();
    if (config && config.testToken) {
      setTestToken(config.testToken);
    }
  };

  const fetchRecipients = async () => {
    const data = await myRequests.getPagedRecipients(0);
    console.log("fetched receivers", data);
    const options = buildReceiversOptions(data.recipients);
    setReceivers(options);
    setReceiversCount(data.count);
  };

  const fetchData = async () => {
    if (isLoading === false) setIsLoading(true);
    let page = 1;
    let pageSize = 10;
    if (query && query.page) {
      if (query.pageSize) {
        pageSize = Number(query.pageSize);
      }
      const data = await myRequests.getPagedNotifications(query.page, pageSize);
      setNotifications(data.notifications);
      setCount(data.count);
      setIsLoading(false);
    } else {
      const data = await myRequests.getPagedNotifications(page, pageSize);
      setNotifications(data.notifications);
      setCount(data.count);
      setIsLoading(false);
    }
  };

  useEffect(async () => {
    await fetchData();
    await fetchRecipients();
    await fetchConfig();
  }, [query]);

  const refreshNotificationsState = () => {
    fetchData();
  };

  return (
    <div>
      <Main
        notifications={notifications}
        count={count}
        receivers={receivers}
        receiversCount={receiversCount}
        refreshNotificationsState={refreshNotificationsState}
        isLoading={isLoading}
        testToken={testToken}
      />
    </div>
  );
}
