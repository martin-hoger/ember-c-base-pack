import Ember from 'ember';

export function price(params/*, hash*/) {
    var price = params[0];
    return `${price} Kč`;
}

export default Ember.Helper.helper(price);
