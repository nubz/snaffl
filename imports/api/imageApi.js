import Secrets from '../../secrets'
import { Cloudinary } from 'meteor/lepozepo:cloudinary'

const imageApi = {
  avatar: url => url.replace('upload/', 'upload/c_fill,g_center,h_120,w_120/'),
  preview: url => url.replace('upload/', 'upload/c_scale,w_240/'),
  medium: url => url.replace('upload/', 'upload/c_scale,w_600/'),
  fullFat: url => url.replace('upload/', 'upload/c_scale,w_1200/'),
  uploadFiles: function (event, ctx) {
    ctx.setState({'uploading': true})
    Cloudinary.upload(
      event.currentTarget.files,
      {'folder': Secrets.cloudinary.folder},
      function (res, data) {
        const images = imageApi.makeImageUrls(data.secure_url);
        if (ctx.setImages) {
          ctx.setImages(images)
        }
        ctx.setState({
          "images": images,
          'publicId': data.public_id,
          "image": data.secure_url,
          'uploading': false
        })
      }.bind(ctx));
  },
  makeImageUrls: url => {
    const images = {};
    images.thumb = imageApi.avatar(url);
    images.small = imageApi.preview(url);
    images.medium = imageApi.medium(url);
    images.large = imageApi.fullFat(url);
    return images;
  },
  returnSecureUrl: url => {
    return url.replace('http:', 'https:')
  }
}


export default imageApi