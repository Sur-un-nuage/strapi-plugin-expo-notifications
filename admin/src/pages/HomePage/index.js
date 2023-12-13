import React, { useEffect, useState } from "react";

import useQueryParams from "../../utils/useQueryParams";
import { useFetchClient } from "@strapi/helper-plugin";

import Main from "./main";

import { buildReceiversOptions } from "./functions";

export default function HomePageWithData() {
  const { get } = useFetchClient();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [testToken, setTestToken] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [receivers, setReceivers] = useState([]);
  const [receiversCount, setReceiversCount] = useState(0);
  const [{ query }] = useQueryParams();
  const fetchConfig = async () => {
    const config = await get(`/expo-notifications/get-plugin-config`);
    if (config.data && config.data.testToken) {
      setTestToken(config.data.testToken);
    }
  };
  const fetchRecipients = async () => {
    const res = await get(`/expo-notifications/recipientsFrom/0`);
    const { data } = res;
    const options = buildReceiversOptions(
      data.recipients ? data.recipients : []
    );
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
      const res = await get(
        `/expo-notifications/findFrom/?page=${query.page}&pageSize=${pageSize}`
      );
      setNotifications(res.data?.notifications);
      setCount(res.data?.count);
      setIsLoading(false);
    } else {
      const res = await get(
        `/expo-notifications/findFrom/?page=${page}&pageSize=${pageSize}`
      );
      setNotifications(res.data?.notifications);
      setCount(res.data?.count);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchRecipients();
    fetchConfig();
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
