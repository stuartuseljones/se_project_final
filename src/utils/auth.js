export const authorize = () => {
  return new Promise((resolve) => {
    // simulate network delay
    setTimeout(() => {
      resolve({ token: "fake-jwt-token" });
    }, 500);
  });
};

export const checkToken = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          name: "Stuart",
          email: "fake@example.com",
          _id: "fake-user-id",
        },
      });
    }, 500);
  });
};

export const logout = () => {
  return Promise.resolve();
};
