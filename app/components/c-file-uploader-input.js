import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  multiple : true,
  url      : '',

  //File is added.
  filesDidChange (files) {
    const uploader  = EmberUploader.Uploader.create({
      url: this.get("url")
    });

    if (!Ember.isEmpty(files)) {
      //File upload.
      uploader.upload(files, {}).then(data => {
        this.sendAction('successAction', data);
        // this.sendAction('errorAction', data);
      });
      
      //When file is uploaded.
      uploader.on('progress', e => {
        this.sendAction('progressAction', e.percent);
      });
    }
  }


});
