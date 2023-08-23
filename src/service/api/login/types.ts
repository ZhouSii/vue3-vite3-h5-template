export interface ILoginApi {
  get: ({ token }: { token: string }) => Promise<any>
}
