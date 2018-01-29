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
        console.log('uploaded data', data)
        ctx.setState({
          'image': data.secure_url,
          'images': imageApi.makeImageUrls(data.secure_url),
          'publicId': data.public_id
        })
        ctx.setState({'uploading': false})
      }.bind(ctx));
  },
  makeImageUrls: url => {
    return {
      'thumb': imageApi.avatar(url),
      'small': imageApi.preview(url),
      'medium': imageApi.medium(url),
      'large': imageApi.medium(url)
    }
  }
}


export default imageApi