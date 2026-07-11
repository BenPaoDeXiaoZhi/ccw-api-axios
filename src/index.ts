import { AxiosInstance, create } from "axios";
import { clearHmacKey, reqInterceptor, resInterceptor } from "./interceptor";

export let token: string = "";
export function setToken(tok: string): void {
  token = tok;
  clearHmacKey();
}

export const ccwAxios: AxiosInstance = create({
  baseURL: "https://community-web.ccw.site/",
  withCredentials: true,
});
ccwAxios.interceptors.request.use(reqInterceptor);
ccwAxios.interceptors.response.use(resInterceptor);
export default ccwAxios;
