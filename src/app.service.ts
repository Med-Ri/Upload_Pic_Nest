import { Injectable } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class AppService {

    constructor(private readonly cloudinary: CloudinaryService) { }

    async uploadFile(file: any) {

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
