import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import axios from 'axios';
import BoxSDK from 'box-node-sdk';
import { ConfigService } from '@nestjs/config';

@Controller('box')
export class BoxAuthController {
  constructor(private configService: ConfigService) {}
  @Get('auth-url')
  getAuthUrl() {
    const clientID = this.configService.get<string>('BOX_CLIENT_ID');
    const redirectUri = this.configService.get<string>('BOX_REDIRECT_URI');
    const url = `https://account.box.com/api/oauth2/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectUri}&state=random123`;
    return { url };
  }

  @Get('callback')
  async callback(@Query('code') code: string, @Res() res: Response) {
    const clientID = this.configService.get<string>('BOX_CLIENT_ID');
    const clientSecret = this.configService.get<string>('BOX_CLIENT_SECRET');
    const redirectUri = this.configService.get<string>('BOX_REDIRECT_URI');

    const tokenRes = await axios.post(
      'https://api.box.com/oauth2/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        client_id: clientID,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenRes.data.access_token;

    const sdk = new BoxSDK({ clientID, clientSecret });
    const client = sdk.getBasicClient(accessToken);
    const user = await client.users.get(client.CURRENT_USER_ID);

    return res.send(`
      <script>
        window.opener.postMessage({
          accessToken: "${accessToken}",
          name: "${user.name}"
        }, "*");
        window.close();
      </script>
    `);
  }
}
