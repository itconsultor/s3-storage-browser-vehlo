import { defineAuth, secret } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      oidc: [
        {
          name: "AzureOIDC",
          clientId: secret("authClient"),
          clientSecret: secret("authSecret"),
          issuerUrl: "https://login.microsoftonline.com/809bacef-ae55-4f6f-8b7e-48dd4d5b247f/v2.0",
          scopes: ["openid", "profile", "email"], 
          attributeMapping: {
            email: "email",
            givenName: "given_name",
            familyName: "family_name",
          },
        },
      ],
      logoutUrls: [
        "https://main.d3noy8z3i5gnx3.amplifyapp.com/",
        // your staging / production domain later
      ],
      callbackUrls: [
        "https://main.d3noy8z3i5gnx3.amplifyapp.com/",
        // your staging / production domain later
      ],
    },
  },
  groups: ['admin','read','editor']
});
