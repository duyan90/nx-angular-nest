import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
 async getData(name: string) {

  return { message: `Hello, ${name}!` };
 }
}