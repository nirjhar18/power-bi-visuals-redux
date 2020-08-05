import * as types from "./actionTypes";

export function updateTokens(charts) {
  return { type: types.LOAD_CHARTS_SUCCESS, charts };
}

export function getAccessToken(tokenInfo) {
  return function (dispatch) {
    return fetch(
      //"https://login.microsoftonline.com/41ece3f8-6e5e-4439-b0b7-9850610c8786/oauth2/token",
      "https://login.microsoftonline.com/41ece3f8-6e5e-4439-b0b7-9850610c8786/oauth2/token?grant_type=client_credentials&client_id=9ea200b1-f838-4d71-a815-3cce93d65d25&resource=https://analysis.windows.net/powerbi/api&client_secret=E7a0u0_c_8ak0IJV6xly.5qY1kh7~F_FHR",
      {
        method: "GET",
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": true,
        },
        //body: tokenInfo,
      }
    )
      .catch((error) => {
        throw error;
      })
      .then((r) => r.json())
      .catch((error) => {
        throw error;
      })
      .then((res) => {
        if (res) {
          alert(res);
          console.log(res);
          //Dispatch an action to update the token expiration and Embed token
        }
      })
      .catch((error) => {
        throw error;
      });
  };
}
