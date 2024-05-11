import * as cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
dotenv.config();
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME , 
      api_key: process.env.API_KEY ,
      api_secret: process.env.API_SECRET ,
    });
  }

  get v2() {
    return cloudinary.v2;
  }
}
