import { AxiosRequestConfig } from 'axios';

export function RequestAuthInterceptor(
  requestConfig: AxiosRequestConfig,
  jwt: string
): AxiosRequestConfig {
  requestConfig.headers['Authorization'] = `Bearer ${jwt}`;
  return requestConfig;
}