const { test, request } = require("@playwright/test");

const loginPayLoad = {
  email: "andreevandreea.18@gmail.com",
  password: "1234554321",
};

test("Validate API login response", async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://backend-mingle.vercel.app/auth/login",
    {
      data: loginPayLoad,
      headers: {
        Origin: "https://frontend-mingle.vercel.app",
      },
    }
  );

  const loginResponseJson = await loginResponse.json();
  console.log("Response data:", loginResponseJson);
});
