function createProfileAvatarUploader(profiles, uploadFetch) {
  return async (id, { companyId, file, filename, filetype }, init = {}) => {
    const isBlob = typeof Blob !== 'undefined' && file instanceof Blob
    if (!isBlob && !(file instanceof Uint8Array)) {
      throw new TypeError('file must be a Blob, File or Uint8Array')
    }
    const filesize = isBlob ? file.size : file.byteLength
    const mimeType = filetype || (isBlob ? file.type : undefined)
    if (!filesize || !mimeType) throw new TypeError('A non-empty image and its MIME type are required')
    const upload = await profiles.prepareAvatarUpload(
      id,
      {
        companyId,
        filename,
        filetype: mimeType,
        filesize,
      },
      init,
    )
    // Storage requests must never inherit Rundit auth or custom API headers.
    const response = await uploadFetch(upload.uploadUrl, {
      method: upload.httpMethod,
      headers: upload.headers,
      body: file,
      signal: init.signal,
      credentials: 'omit',
      redirect: 'error',
    })
    if (!response.ok) {
      throw new RunditSdkError('Avatar byte upload failed; the previous avatar is unchanged', {
        status: response.status,
        body: null,
      })
    }
    return profiles.completeAvatarUpload(id, { companyId, fileUuid: upload.fileUuid }, init)
  }
}
