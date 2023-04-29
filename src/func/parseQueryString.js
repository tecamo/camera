export function parseQueryString() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    // Get query params:
    let client_id = params.client_id;
    let client_secret = params.client_secret;
    let refresh_token = params.refresh_token;
    let folder_id = params.folder_id;
    return { client_id, client_secret, refresh_token, folder_id };
}
