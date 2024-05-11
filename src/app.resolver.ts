import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { join } from 'path';
import { CloudinaryService } from './cloudinary.service';


@Resolver()
export class AppResolver {

    constructor(private readonly cloudinary: CloudinaryService) { }


    @Query(() => String)
    async getName(): Promise<string> {
        return 'Coding for testing image upload';
    }

    // @Mutation(() => Boolean, { name: 'uploadImage' })
    // async uploadImage(
    //     @Args({ name: 'image', type: () => GraphQLUpload })
    //     image: Upload,
    //     @Args({ name: 'createFileInDirectory', type: () => Boolean })
    //     createFileInDirectory: boolean,
    // ) {
    //     const file = await image;

    //     console.log('UPLOAD_IMAGE_CALLED', {
    //         file,
    //         createFileInDirectory,
    //     });

    //     return new Promise((resolve, reject) => {
    //         if (createFileInDirectory) {
    //             const dirPath = join(__dirname, '/uploads');

    //             if (!existsSync(dirPath)) {
    //                 mkdirSync(dirPath, { recursive: true });
    //             }

    //             const fileUploaded = file
    //                 .createReadStream()
    //                 .pipe(createWriteStream(`${dirPath}/${file.filename}`))
    //                 .on('finish', () => {
    //                     console.log('IMAGE_CREATED_IN_DIRECTORY');
    //                     resolve(true);
    //                 })
    //                 .on('error', error => {
    //                     console.log('IMAGE_UPLOAD_ERROR', error);
    //                     reject(false);
    //                 });

    //             console.log('fileUploaded', fileUploaded)

    //         } else {
    //             file
    //                 .createReadStream()
    //                 .on('data', data => {
    //                     console.log('DATE_FROM_STREAM', data);
    //                 })
    //                 .on('end', () => {
    //                     console.log('END_OF_STREAM');
    //                     resolve(true);
    //                 })
    //                 .on('error', error => {
    //                     console.log('IMAGE_UPLOAD_ERROR', error);
    //                     reject(false);
    //                 });
    //         }
    //     });
    // }

    @Mutation(() => Boolean, { name: 'uploadImage' })
    async uploadImage(
      @Args({ name: 'image', type: () => GraphQLUpload })
      image: Upload,
    ) {
      const file = await image;
    
      console.log('UPLOAD_IMAGE_CALLED', { file });
    
      const uploadStream = this.cloudinary.v2.uploader.upload_stream((error, result) => {
        if (error) {
          console.error('Cloudinary Upload Error:', error);
          return false; // Or reject the promise if using async/await
        }
    
        console.log('Cloudinary Upload Result:', result);
        return true; // Or resolve the promise if using async/await
      });
    
      file.createReadStream()
        .pipe(uploadStream)
        .on('finish', () => {
          console.log('Image uploaded to Cloudinary successfully!');
        })
        .on('error', (error) => {
          console.error('Error uploading image to Cloudinary:', error);
        });
    
      // Return true regardless of success/failure for now (modify as needed)
      return true;
    }

}
