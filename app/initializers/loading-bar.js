export function initialize(application) {
  application.inject('route', 'loadingBar', 'service:loadingBar');
  application.inject('controller', 'loadingBar', 'service:loadingBar');
  application.inject('component', 'loadingBar', 'service:loadingBar');
}

export default {
  name: 'loadingBar',
  initialize: initialize
};
