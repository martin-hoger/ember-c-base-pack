import Ember from 'ember';

export default Ember.Mixin.create({

  chartOptions: {
    chart: {
      type: 'column',
      spacingBottom: 30
    },
    colors: ['#f25c19', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    title: {
      text: null,
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      title: {
        text: ''
      }
    }
  },

});




