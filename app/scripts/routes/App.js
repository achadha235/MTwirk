/*global define*/

define([
    'jquery',
    'backbone'
], function ($, Backbone) {
    'use strict';

    var AppRouter = Backbone.Router.extend({
        routes: {
            '':       'goHomePage',
        	'account': 'showAccount',
            'error'  : 'showError'
        },
        initialize: function(){
        },
        showAccount: function(){
            $('#statusBox').text("You're all set! Get to work.");
        },
        showError: function(){
            $('#statusBox').text("An error occured");
        }
    });

    return AppRouter;
});
