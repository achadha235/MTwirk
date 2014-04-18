/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';
    var AppModel = Backbone.Model.extend({
        defaults: {
        	authenticated: false,
            user: undefined
        },
        initialize: function (options){
        }
    });

    return AppModel;
});
