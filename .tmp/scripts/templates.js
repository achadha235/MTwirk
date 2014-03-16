define(function(){

this["JST"] = this["JST"] || {};

this["JST"]["app/scripts/templates/App.ejs"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!doctype html>\n<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->\n<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->\n<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->\n    <head>\n        <meta charset="utf-8">\n        <meta http-equiv="X-UA-Compatible" content="IE=edge">\n        <title> MTwirk | Home </title>\n        <meta name="description" content="">\n        <meta name="viewport" content="width=device-width">\n        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->\n        <!-- build:css(.tmp) styles/main.css -->\n        <link rel="stylesheet" href="app/styles/main.css">\n        <link rel=\'stylesheet\' href="app/bower_components/sass-bootstrap/dist/css/bootstrap-theme.css"> </link>\n        <!-- endbuild -->\n        <!-- build:js scripts/vendor/modernizr.js -->\n        <script src="app/bower_components/modernizr/modernizr.js"></script>\n        <!-- endbuild -->\n    </head>\n    <body>\n\n        <div class="navbar navbar-default navbar-static-top" id=\'appNav\' role="navigation">\n          <div class="container-fluid">\n            <div class="navbar-header">\n              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">\n                <span class="sr-only">Toggle navigation</span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n                <span class="icon-bar"></span>\n              </button>\n              <a class="navbar-brand" href="#">MTwirk</a>\n            </div>\n            <div class="navbar-collapse collapse">\n              <ul class="nav navbar-nav">\n                <li class=\'active\' id=\'accountButton\'> <a href="/connect/twitter">Connect With Twitter </a></li>\n            </div>\n          </div>\n        </div>\n\n        <div class=\'container-fluid\' id=\'mainContainer\'>\n\n                <div class="jumbotron">\n                  <h1 id=\'statusBox\' >Welcome to MTwirk</h1>\n                  <p> MTwirk = Mechanical Turk + Twitter</p>\n                  <p><a class="btn btn-primary btn-lg" role="button">Requester</a></p>\n                  <p><a class="btn btn-primary btn-lg" role="button">Worker / Tweeter</a></p>\n\n                </div>\n\n        </div>\n\n\n        <!-- build:js scripts/main.js -->\n        <script data-main="app/scripts/main" src="app/bower_components/requirejs/require.js"></script>\n        <!-- endbuild -->\n    </body>\n</html>\n';

}
return __p
};

  return this["JST"];

});