export interface uploadFileParams {
  file: any
  fileBucket?: string
}

export interface CommonApi {
  uploadFile: (params: uploadFileParams) => Promise<any>
}
