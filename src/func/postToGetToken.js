// export async function postToGetToken(client_id, client_secret, refresh_token) {
//     var formBody = generateBody(client_id, client_secret, refresh_token);

//     let response = await fetch('https://oauth2.googleapis.com/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//         },
//         body: formBody
//     });
//     return await response.json();
// }
export function generateBody(client_id, client_secret, refresh_token) {
    var details = {
        "client_id": client_id,
        "client_secret": client_secret,
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
}
