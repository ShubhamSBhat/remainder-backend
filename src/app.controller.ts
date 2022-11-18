import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

export interface RemainderInterface {
  time: string;
  activity: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/get-all')
  getAll(): any {
    return this.appService.getAllReminders();
  }

  @Post('/createRemainder')
  createRemainder(@Body() body) {
    //console.log(body);
    return this.appService.createRemainder(body);
  }
}
