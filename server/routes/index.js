module.exports = [
  {
    method: "GET",
    path: "/find",
    handler: "exponotification.find",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/findFrom",
    handler: "exponotification.findFrom",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/recipientsFrom/:start",
    handler: "exponotification.recipientsFrom",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/create",
    handler: "exponotification.create",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "DELETE",
    path: "/delete/:id",
    handler: "exponotification.delete",
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: "PUT",
    path: "/update/:id",
    handler: "exponotification.update",
    config: {
      policies: [],
      auth: false,
    },
  },
];
