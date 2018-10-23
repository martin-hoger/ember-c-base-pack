/**
  @module ember-drop-zone
*/
import Mixin from '@ember/object/mixin';
import { get } from '@ember/object';

/**
  @class DraggableMixin
  @namespace Mixins
*/
export default Mixin.create({

  /**
    @property classNameBindings
    @type {Array}
    @private
  */
  classNameBindings: ['dragged'],

  /**
    @property attributeBindings
    @type {Array}
    @private
  */
  attributeBindings: ['draggable'],

  /**
    @property draggable
    @type {Boolean}
    @default true
  */
  draggable: true,

  /**
    @type {Boolean}
    @default true
  */
  dragged: false,

  /**
    @property effectAllowed
    @type {String}
    @default `copyMove`
  */
  effectAllowed: 'copyMove',

  /**
    @event dragStart
    @param {Object} event
  */
  dragStart(event) {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = this.get('effectAllowed');
    this.set('dragged', true);
    this._dragStart(...arguments);
  },

  /**
    @method _dragStart
    @param {Object} event
    @private
  */
  _dragStart(event) {
    var string = JSON.stringify(this.serialize());
    event.dataTransfer.setData('text', string);
  },

  /**
    @method serialize
    @private
    @return {Object}
  */
  serialize() {
    let id, type;
    let model = get(this, 'model');
    if (model) {
      id = get(model, 'id');
      type = get(model, 'constructor.modelName') || get(model, '_internalModel.modelName');
    }
    return { id, type };
  },

  /**
    @event dragStart
    @param {Object} event
  */
  dragEnd(event) {
    event.stopPropagation();
    this.set('dragged', false);
    this._dragEnd(...arguments);
  },

  /**
    @method _dragStart
    @param {Object} event
    @private
  */
  _dragEnd() {
  },

});
