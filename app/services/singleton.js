import Service from '@ember/service';
import { inject } from '@ember/service';
import { run } from '@ember/runloop';
import { Promise } from 'rsvp';

export default Service.extend({

  storage : inject('local-storage-wrapper'),
  heartbeatTimeout : 5000, //ms


  // -----------------------------------------------------------------
  // Client

  /**
   * Check if I am the first instance online.
   */
  amIFirst() {
    var timestamp = Date.now();

    return new Promise((resolve) => {
      // If it was long time since website stored heartbeat info, feel free to start a new instance.
      // Heartbeat is stored every X seconds.
      var heartbeatTimestamp = this.storage.getItem('singleton:heartbeat') || 0;
      if (timestamp - heartbeatTimestamp > this.get('heartbeatTimeout') * 2) {
        this._resolvePromise(resolve, true);
      }

      // Notify that "I am online" and wait for the response.
      this.storage.setItem('singleton:request', timestamp);
      run.later(() => {
        var timestamp2 = this.storage.getItem('singleton:response') || 0;
        this._resolvePromise(resolve, timestamp2 < timestamp);
      }, 500);

    });
  },

  /**
   * Resolves the promise, it the client is alone, 
   * we start the server.
   */
  _resolvePromise(resolve, condition) {
    if (condition) {
      this.startServer();
    }
    resolve(condition);
  },


  // -----------------------------------------------------------------
  // Server

  /**
   * Check if there is an instance already running.
   */
  startServer() {
    window.addEventListener('storage', this._answerReqest.bind(this), false);
    this._startHardbeat();
  },

  /**
   * Handle storage events.
   * https://emberway.io/metaprogramming-in-emberjs-627921395299
   * https://gist.github.com/catkins/3145bee11b76f4e4e907
   */
  _answerReqest(event) {
    var key = event.key.replace(/^[^:]+:/, '')
    if (key == 'singleton:request') {
      this.storage.setItem('singleton:response', Date.now());
    }
  },

  /**
   * Run hardbeat.
   * Store every X seconds info about being alive.
   *
   */
  _startHardbeat() {
    var timeout = this.get('heartbeatTimeout');
    this.storage.setItem('singleton:heartbeat', Date.now());
    return setInterval(() => {
      this.storage.setItem('singleton:heartbeat', Date.now());
    }, timeout);
  },

});
