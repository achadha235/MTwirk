/*global require*/4
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'backbone',
    'models/App',
    'views/App',
    'routes/App'
], function (Backbone, AppModel, AppView, AppRouter) {
    Backbone.history.start();

    var appRouter = new AppRouter();
    var app = new AppModel({authenticated: false});
    var appView = new AppView({el: $('body'), model: app});

    appRouter.view = appView;
    appRouter.model = app; 
    
    appRouter.navigate(location.hash, true);
});
