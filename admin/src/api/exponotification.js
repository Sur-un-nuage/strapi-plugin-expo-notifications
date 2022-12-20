import { request } from "@strapi/helper-plugin";

const expoNotificationsRequests = {
  getPagedNotifications: async (page = 1, pageSize = 10) => {
    // console.log("page", page, "pageSize", pageSize);
    return await request(
      `/expo-notifications/findFrom/?page=${page}&pageSize=${pageSize}`,
      {
        method: "GET",
      }
    );
  },

  getPagedRecipients: async (start = 0) => {
    return await request(`/expo-notifications/recipientsFrom/${start}`, {
      method: "GET",
    });
  },

  createNotification: async (data, tokens) => {
    return await request(`/expo-notifications/create`, {
      method: "POST",
      body: { data: data, tokens: tokens },
    });
  },

  editNotification: async (id, data) => {
    return await request(`/expo-notifications/update/${id}`, {
      method: "PUT",
      body: { data: data },
    });
  },

  deleteNotification: async (id) => {
    return await request(`/expo-notifications/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default expoNotificationsRequests;
