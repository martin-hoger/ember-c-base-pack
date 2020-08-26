/**
  @module ember-drop-zone
  */
import Mixin from '@ember/object/mixin';
import { on } from '@ember/object/evented';

/**
  @class DroppableMixin
  @namespace Mixins
  */
export default Mixin.create({

  /**
    @property classNameBindings
    @type {Array}
    @private
    @default `['dropTarget']`
  */
  classNameBindings: ['dropTarget'],

  /**
    @property dropTarget
    @type {Boolean}
    @private
    @default `false`
  */
  dropTarget: false,

  /**
    @method setDropTarget
    @param {Object} event
    @param {Boolean} value
    */
  setDropTarget(value) {
    this.set('dropTarget', value);
  },

  /**
    @method _drop
    @param {Object} event
    @private
  */
  _drop(event) {
    if (this.get('element').contains(event.target)) {
      this.setDropTarget(false);
    }
  },

  /**
    @method _dragEnter
    @param {Object} event
    @private
  */
  _dragEnter(event) {
    if (this.get('element').contains(event.target)) {
      this.setDropTarget(true);
    }
  },

  /**
    @method _dragLeave
    @param {Object} event
    @private
  */
  _dragLeave(event) {
    if (this.get('element').contains(event.target)){
      this.setDropTarget(false);
    }
  },

  /**
    @method _dragOver
    @param {Object} event
    @private
  */
  _dragOver(event) {
    if (this.get('element').contains(event.target)){
      this.setDropTarget(true);
    }
  },

  /**
    @event onDrop
    @param {Object} event
  */
  onDrop: on('drop', function (event) {
    event.preventDefault();
    this._drop(event);
  }),

  /**
    @event onDragEnter
    @param {Object} event
  */
  onDragEnter: on('dragEnter', function (event) {
    event.preventDefault();
    this._dragEnter(event);
    return false;
  }),

  /**
    @event onDragLeave
    @param {Object} event
    */
  onDragLeave: on('dragLeave', function (event) {
    event.preventDefault();
    this._dragLeave(...arguments);
    return false;
  }),

  /**
    @event onDragOver
    @param {Object} event
    */
  onDragOver: on('dragOver', function (event) {
    event.preventDefault();
    this._dragOver(...arguments);
    return false;
  }),

  /**
    Sort 'rows', when dragged row is dropped to the target row. Rows are re-orderd
    and weight is updated to 0..numberOfElements-1

    Usage, if we use default 'weight' as a weight key and 'id' as ID key:
    var sorted = this._getGragDropSortedArray(targetProperty, draggedProperty, properties);
    Usage, if we use 'weight' as a weight key:
    var sorted = this._getGragDropSortedArray(targetProperty, draggedProperty, properties, 'property.id');
  */
  _getGragDropSortedArray(targetRow, draggedRow, rows, idKey, weightKey) {
    // If variables not defined, use default:
    idKey = (idKey) ? idKey : 'id';
    weightKey = (weightKey) ? weightKey : 'weight';

    var addWeight = false;
    // Go through rows and find target row. Change weight of target row, dragged
    // row and all next rows:
    rows.forEach(function(row){
      // Add weight? But not to the dragged row!
      if (addWeight && row.get(idKey) != draggedRow.get(idKey)) {
        row.set(weightKey, row.get(weightKey) + 1);
      }
      // Found target row:
      if (row.get(idKey) == targetRow.get(idKey)) {
        if (row.get(weightKey) >= draggedRow.get(weightKey)) {
          // Dragging from top to the bottom: dragged.weight++
          draggedRow.set(weightKey, row.get(weightKey) + 1);
        } else {
          // dragging from bottom to the top: dragged.weight = row.weight
          // and add weight to this row and all next rows
          draggedRow.set(weightKey, row.get(weightKey));
          row.set(weightKey, row.get(weightKey) + 1);
        }
        // And all next rows: add weight to it
        addWeight = true;
      }
    });
    // Sort array by weight and then reindex, so weight will be again in interval
    // 0 .. number of items-1
    rows = rows.sortBy(weightKey);
    rows.forEach(function(row, index){
      row.set(weightKey, index);
    });

    return rows;
  },

});
