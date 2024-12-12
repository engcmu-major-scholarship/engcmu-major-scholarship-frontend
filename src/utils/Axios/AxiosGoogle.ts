import { AxiosBase } from './AxiosBase';

export class AxiosGoogle extends AxiosBase {
  constructor(token_type: string, access_token: string) {
    super({
      baseURL: 'https://www.googleapis.com',
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
  }
}
