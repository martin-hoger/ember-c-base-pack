import Ember from 'ember';

var alreadyRun = false;

export function initialize(/* container, application */) {
    if (alreadyRun) {
        return;
    } else {
        alreadyRun = true;
    }

    Ember.Route.reopen({
        activate: function() {
            var cssClass = this.generateCssClass();
            if (cssClass !== 'application') {
                Ember.$('body').addClass(cssClass);
            }
        },
        deactivate: function() {
            Ember.$('body').removeClass(this.generateCssClass());
        },
        generateCssClass: function() {
            return "route-" + this.routeName.replace(/[^a-z0-9]/ig, '-').dasherize();
        }
    });
}

export default {
    name: 'route-body-tags',
    initialize: initialize
};
