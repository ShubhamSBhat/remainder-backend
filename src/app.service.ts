import { Injectable } from '@nestjs/common';
import { RemainderInterface } from './app.controller';
import admin = require('firebase-admin');
import serviceAccount from '../service.json';
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

@Injectable()
export class AppService {
  firebase;
  db;
  constructor() {
    this.firebase = initializeApp({
      credential: cert(serviceAccount as any),
    });
    this.db = getFirestore();
  }
  getHello(): string {
    return 'Hello World!';
  }

  async getAllReminders() {
    let res = [];
    const snapshot = await this.db.collection('remainder').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      res.push({ id: doc.id, data: doc.data() });
    });
    return res;
  }

  async createRemainder(body) {
    const docRef = await this.db.collection('remainder').add(body);
    return {
      message: 'Successful',
      id: docRef.id,
    };
  }

  // async create() {
  //   await this.http
  //     .post('http://localhost:3000/createReminder', {
  //       activity: 'IO',
  //       time: '4PM',
  //     })
  //     .toPromise();
  // }
}
