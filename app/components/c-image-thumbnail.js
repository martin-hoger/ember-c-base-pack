import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['image-thumbnail'],
  attributeBindings: ['style'],
  height: 100,
  width: 100,

  style: Ember.computed('height', 'width', 'resolvedUrl', 'rounded', function() {
    // console.log('height: ', this.get('height'));
    var height = this.get('height');
    var width = this.get('width');
    var resolvedUrl = this.get('resolvedUrl');
    var styleStr ;
    var roundedVal;

    //if rounded, the picture will have border-radius 50%
    if (this.get('rounded')) {
      roundedVal = 50;
    } else {
      roundedVal = 0;
    }

    styleStr = `background-image: url(${resolvedUrl}); background-size: cover; border-radius: ${roundedVal}%; height: ${height}px; width: ${width}px`;
    //toto vrátí objekt:
    return Ember.String.htmlSafe(styleStr);
  }),

  resolvedUrl: Ember.computed('url', 'defaultUrl', function () {
    // console.log('url =', this.get('url'));
    // console.log('defaultUrl =', this.get('defaultUrl'));
    if (this.get('url') == ''){
      return this.get('defaultUrl');
    }
    else {
      return this.get('url');
    }
  })

});
