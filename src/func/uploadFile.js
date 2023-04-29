export async function uploadFile(file, folderId, fileName, accessToken, loading) {
    // let contentType = getContentTypeBasedOnFileEnding(fileFormat);
    let contentType = "image/png";

    // Load file and upload it
    const reader = new FileReader();

    reader.addEventListener("load", async (event) => {
        const bytes = event.target.result;
        let response = await postFileToGoogleDrive(bytes, contentType, accessToken);
        if (response.ok) {
            let result = await response.json();
            let fileId = result.id;
            await patchFileWithNewNameAndFolder(fileId, folderId, fileName, accessToken);
            loading.value = false;
        } else {
            loading.value = false;
        }
    });
    reader.readAsArrayBuffer(file);
}

async function postFileToGoogleDrive(bytes, contentType, accessToken) {
    return await fetch(
        `https://www.googleapis.com/upload/drive/v3/files?uploadType=media`,
        {
            method: "POST",
            headers: {
                "Content-Type": contentType,
                Authorization: `Bearer ${accessToken}`,
            },
            body: bytes,
        }
    );
}

async function patchFileWithNewNameAndFolder(fileId, folderId, fileName, accessToken) {
    return await fetch(
        `https://www.googleapis.com/drive/v3/files/` + fileId
        + `?addParents=`+folderId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ "name": fileName }),
        }
    );
}
