import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  multiple: true,
  url: '',
  classNames: ['file-uploader'],

  init() {
    this._super(...arguments);
    this.set('isDragging', false);
  },

  dragOver(event) {
    event.preventDefault();
    this.set('isDragging', true);
  },

  dragLeave(event) {
    event.preventDefault();
    this.set('isDragging', false);
  },

  drop(event) {
    event.preventDefault();
    this.set('isDragging', false);
    const files = event.dataTransfer.files;
    this.filesDidChange(files);
  },

  classNameBindings: ['isDragging:drag-over'],

  filesDidChange(files) {
    const uploader = EmberUploader.Uploader.create({
      url: this.get("url")
    });

    if (!Ember.isEmpty(files)) {
      uploader.upload(files, {}).then(data => {
        this.sendAction('successAction', data);
      });

      uploader.on('progress', e => {
        this.sendAction('progressAction', e.percent);
      });
    }
  }
});
