import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {

    constructor(
      private readonly appService: AppService
    ) { }
    
    @Query(() => String)
    async getName(): Promise<string> {
        return 'Coding for testing image upload';
    }

    @Mutation(() => Boolean, { name: 'uploadImage' })
    async UploadImage(
      @Args({ name: 'image', type: () => GraphQLUpload })
      image: Upload,
    ) {
      const file = await image;
      return this.appService.uploadFile(file)
    }

}
