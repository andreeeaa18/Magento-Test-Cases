const { test, expect, request } = require("@playwright/test");

const loginPayLoad = {
  userEmail: "andreevandreea.18@gmail.com",
  userPassword: "1234554321",
};

let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://frontend-mingle.vercel.app/sign-in",
    {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(loginPayLoad),
    }
  );

  console.log("Status:", loginResponse.status());
  console.log("Response text:", await loginResponse.text());

  expect(loginResponse.ok()).toBeTruthy(); // Verifică dacă cererea a avut succes

  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token; // Salvează token-ul
});

// Adaugă testul aici
test("Test protected API endpoint", async ({ request }) => {
  // Creează un context API cu token-ul autentificat
  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Accesează un endpoint protejat
  const protectedResponse = await apiContext.get(
    "https://frontend-mingle.vercel.app/protected-endpoint"
  );

  console.log("Protected response status:", protectedResponse.status());
  expect(protectedResponse.ok()).toBeTruthy(); // Verifică dacă răspunsul este valid

  const protectedResponseJson = await protectedResponse.json();
  console.log("Protected response data:", protectedResponseJson);

  // Adaugă verificări specifice
  expect(protectedResponseJson).toHaveProperty("data"); // Exemplu de verificare
});
