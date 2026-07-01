import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { token } from ".";
import CryptoJS from "crypto-js";

const { HmacMD5 } = CryptoJS;
export let hmacKey: string = "";
let guestId = CryptoJS.lib.WordArray.random(16).toString();

interface HealthCheckResponse {
  body: {
    name: string;
    status: string;
    traceId: string;
  }[];
  code: "200";
  msg: null;
  status: 200;
}

export async function getHmacKey(headers: Record<string, string>) {
  if (hmacKey) return hmacKey;
  const response: HealthCheckResponse = await fetch(
    "https://community-web.ccw.site/health/check",
    {
      method: "POST",
      headers,
      credentials: "include",
    },
  ).then((res) => res.json());
  if (response.code !== "200") {
    throw new Error("Request failed: failed to health check", {
      cause: response,
    });
  }
  hmacKey = response.body
    .map(({ traceId }) => {
      return traceId[parseInt(traceId[0], 16) + 1];
    })
    .reverse()
    .join("");
  return getHmacKey(headers);
}

export async function reqInterceptor(
  req: { headers: Record<string, string>; data?: any },
  timeStamp: number = Date.now(),
): Promise<InternalAxiosRequestConfig> {
  req.headers["Cookie"] = token ? `token=${token}` : "";
  req.headers["Guest-Id"] = token ? "" : guestId;
  const hmacKey = await getHmacKey(req.headers);
  req.headers["B"] = `${timeStamp}`;
  req.headers["A"] = HmacMD5(
    `ccw${JSON.stringify(req.data)}${timeStamp}`,
    hmacKey,
  ).toString();
  return req as InternalAxiosRequestConfig;
}

export type ApiResponse = {
  body: any;
  code: string;
  msg: string;
  status: number;
};

export async function resInterceptor(res: {
  data: ApiResponse;
}): Promise<AxiosResponse<ApiResponse>> {
  if (res.data.code == "200") {
    return res as AxiosResponse;
  }
  throw new Error(`ccw axios Request failed: ${res.data.msg}`, { cause: res });
}
