export const authorize = (email, password) => {
  return new Promise((resolve, reject) => {
    // simulate network delay
    setTimeout(() => {
      resolve({ token: "fake-jwt-token" });
    }, 500);
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
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
