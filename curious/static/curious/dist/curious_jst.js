window.JST = window.JST || {};
var template = function(str){var fn = new Function('obj', 'var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push(\''+str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/<%=([\s\S]+?)%>/g,function(match,code){return "',"+code.replace(/\\'/g, "'")+",'";}).replace(/<%([\s\S]+?)%>/g,function(match,code){return "');"+code.replace(/\\'/g, "'").replace(/[\r\n\t]/g,' ')+"__p.push('";}).replace(/\r/g,'\\r').replace(/\n/g,'\\n').replace(/\t/g,'\\t')+"');}return __p.join('');");return fn;};
window.JST['query'] = template('<p ng-if="search_error">\n  <span class="label label-danger">Search Error</span>\n  {{ search_error }}\n</p>\n\n<p ng-if="completed && success && !last_model">\n  <em>No matching data</em>\n</p>\n\n<div ng-if="completed && success && last_model">\n\n<div id="results-header">\n  <span>{{ table.rows.length }} row(s) of <b>{{ last_model }}</b></span>\n  <div id="recommended_rels" class="dropdown navbar-right">\n    <a data-toggle="dropdown" href="javascript:void(0);">Relations from {{ last_model }}</a>\n    <ul class="rel-list dropdown-menu" role="menu">\n      <li ng-repeat="rel in last_model_rels">\n        <span class="rel-actions">\n          <a class="btn btn-xs btn-info" href=\'javascript:void(0);\' title="Extend query"\n             ng-click="newQuery(query, last_model, rel)">Q</a>\n        </span>\n        <span class="rel-name">{{ rel }}</span>\n      </li>\n    </ul>\n  </div> <!-- recommended_rels -->\n</div>\n\n<table class="table table-condensed table-striped table-bordered table-fixed" ng-if="table.attrs">\n  <tr class="success">\n    <td class="wrap" ng-repeat="q in table.queries track by $index" colspan="{{ q.cols }}">\n      <a href="javascript:void(0)" ng-click="table.toggle($index)" title="Click to show/hide attrs"\n       >{{ q.model }}</a>\n    </td>\n  </tr>\n\n  <tr class="success">\n    <th class="wrap" ng-repeat="attr in table.attrs track by $index">{{ attr }}</th>\n  </tr>\n\n  <tr ng-repeat="row in table.rows track by $index">\n    <td class="wrap" ng-repeat="object in row track by $index">\n      <span ng-bind-html="object.ptr[table.attrs[$index]]|showAttr"></span>\n    </td>\n  </tr>\n</table>\n\n<p ng-if="!table.csv">\n  <a href="javascript:void(0)" ng-click="table.showCSV()">Show CSV</a>\n</p>\n<textarea class="csv" ng-if="table.csv" readonly>{{ table.csv }}</textarea>\n\n</div> <!-- if for results table -->\n');
window.JST['search'] = template('<div class="container-fluid">\n\n<p>\n  <a href="#/" class="lead">Curious</a>\n</p>\n\n<div class="well">\n  <form ng-submit="submitQuery()">\n    <div class="input-group">\n      <span class="input-group-addon">Query</span>\n      <input class="form-control" ng-model="query" ng-change="delayCheckQuery()" />\n    </div>\n  </form>\n</div>\n\n<p ng-if="query_error">\n  <span class="label label-danger">Query Syntax Error</span>\n  <code>{{ query_error }}</code\n</p>\n\n<p ng-if="query_accepted">\n  <span class="label label-info">Valid Query</span>\n  <code>{{ query_accepted }}</code>\n</p>\n\n<div id="results">\n  <div ng-repeat="query in query_submitted">\n    <partial template="query" ng-controller="QueryController"></partial>\n  </div>\n</div>\n\n<div id="queries">\n  <p><h4>Recent Queries</h4></p>\n  <div ng-repeat="query in recent_queries">\n    <a href="#/q/{{ query|encodeURI }}">{{ query }}</a>\n  </div>\n</div>\n\n</div> <!-- container-fluid -->\n');
