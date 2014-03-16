/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'bootstrap'
], function ($, _, Backbone, JST) {
    'use strict';
    var AppView = Backbone.View.extend({
        template: JST['app/scripts/templates/App.ejs'],
        render: function(){
        	this.$el.html(this.template({}));
        },
        initialize: function(){
            this.render();            
        }
    });
    return AppView;
});
