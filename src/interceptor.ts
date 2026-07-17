import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { token } from ".";
import md5 from "blueimp-md5";

export let hmacKey: string = "";
function getRandomId() {
  let tmp = "";
  for (let i = 0; i < 4; i++) {
    tmp += Math.round(Math.random() * 4096)
      .toString(16)
      .padStart(0);
  }
  return tmp;
}
let guestId = getRandomId();

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

export function clearHmacKey() {
  hmacKey = "";
}

export async function reqInterceptor(
  req: { headers: Record<string, string>; data?: any },
  timeStamp: number = Date.now(),
): Promise<InternalAxiosRequestConfig> {
  if (token.length > 0) {
    req.headers["Cookie"] = `token=${token}`;
  } else {
    req.headers["Guest-Id"] = guestId;
  }
  const hmacKey = await getHmacKey(req.headers);
  req.headers["B"] = `${timeStamp}`;
  req.headers["A"] = md5(`ccw${JSON.stringify(req.data)}${timeStamp}`, hmacKey);
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
