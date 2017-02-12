(function() {
  angular.module("oxymoron.config.http", [])
  .config(['$httpProvider', '$locationProvider', '$stateProvider', function($httpProvider, $locationProvider, $stateProvider) {
    /*
     *  Set token for AngularJS ajax methods
    */
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'AngularXMLHttpRequest';
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }])

  .config(["$httpProvider", function ($httpProvider) {
      $httpProvider.defaults.transformResponse.push(function(responseData){
          convertDateStringsToDates(responseData);
          return responseData;
      });
  }]);

  var regexIso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

  function convertDateStringsToDates(input) {
      // Ignore things that aren't objects.
      if (typeof input !== "object") return input;

      for (var key in input) {
          if (!input.hasOwnProperty(key)) continue;

          var value = input[key];
          var match;
          // Check for string properties which look like dates.
          // TODO: Improve this regex to better match ISO 8601 date strings.
          if (typeof value === "string" && (match = value.match(regexIso8601))) {
              // Assume that Date.parse can parse ISO 8601 strings, or has been shimmed in older browsers to do so.
              var milliseconds = Date.parse(match[0]);
              if (!isNaN(milliseconds)) {
                  input[key] = new Date(milliseconds);
              }
          } else if (typeof value === "object") {
              // Recurse into object
              convertDateStringsToDates(value);
          }
      }
  }
angular.module("oxymoron.config.states", [])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$urlMatcherFactoryProvider', function ($locationProvider, $stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
    /*
     *  Enable HTML5 History API
    */
    $locationProvider.html5Mode({enabled: true, requireBase: false});

    /*
     *  $stateProvider Rails
    */
    $urlRouterProvider.rule(function($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path[path.length-1] === '/';

      //for later access in tempalteUrl callback
      $stateProvider.oxymoron_location = $location;

      if(hasTrailingSlash) {
        var newPath = path.substr(0, path.length - 1); 
        return newPath; 
      }
    });

    var resolve = function (action, $stateParams) {
      return function (actionNames, callback) {
        try {
          var actionNames = angular.isArray(actionNames) ? actionNames : [actionNames];
          
          if (actionNames.indexOf(action)!=-1) {
            callback($stateParams);
          }
        } catch (e) {
          console.error(e);
        }
      }
    }

    $stateProvider.rails = function () {
      $stateProvider
      
        .state('order_products_path', {
          url: $urlMatcherFactoryProvider.compile("/products/{kind:(?:search|laptop|car|mobile)}"),
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['order_products_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('order', $stateParams)
            }]
          }
        })
      
        .state('product_comments_path', {
          url: '/products/:product_id/comments',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['product_comments_path'](params);
          },
          controller: 'ProductsCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_product_comment_path', {
          url: '/products/:product_id/comments/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_product_comment_path'](params);
          },
          controller: 'ProductsCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_product_comment_path', {
          url: '/products/:product_id/comments/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_product_comment_path'](params);
          },
          controller: 'ProductsCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('product_comment_path', {
          url: '/products/:product_id/comments/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['product_comment_path'](params);
          },
          controller: 'ProductsCommentsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('products_path', {
          url: '/products',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['products_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_product_path', {
          url: '/products/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_product_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_product_path', {
          url: '/products/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_product_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('product_path', {
          url: '/products/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['product_path'](params);
          },
          controller: 'ProductsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('new_user_session_path', {
          url: '/users/sign_in',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_session_path'](params);
          },
          controller: 'DeviseSessionsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('user_digitalocean_omniauth_authorize_path', {
          url: '/users/auth/digitalocean',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_digitalocean_omniauth_authorize_path'](params);
          },
          controller: 'UsersOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('passthru', $stateParams)
            }]
          }
        })
      
        .state('user_digitalocean_omniauth_callback_path', {
          url: '/users/auth/digitalocean/callback',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_digitalocean_omniauth_callback_path'](params);
          },
          controller: 'UsersOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('digitalocean', $stateParams)
            }]
          }
        })
      
        .state('user_google_oauth2_omniauth_authorize_path', {
          url: '/users/auth/google_oauth2',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_google_oauth2_omniauth_authorize_path'](params);
          },
          controller: 'UsersOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('passthru', $stateParams)
            }]
          }
        })
      
        .state('user_google_oauth2_omniauth_callback_path', {
          url: '/users/auth/google_oauth2/callback',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_google_oauth2_omniauth_callback_path'](params);
          },
          controller: 'UsersOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('google_oauth2', $stateParams)
            }]
          }
        })
      
        .state('user_facebook_omniauth_authorize_path', {
          url: '/users/auth/facebook',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_facebook_omniauth_authorize_path'](params);
          },
          controller: 'UsersOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('passthru', $stateParams)
            }]
          }
        })
      
        .state('user_facebook_omniauth_callback_path', {
          url: '/users/auth/facebook/callback',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_facebook_omniauth_callback_path'](params);
          },
          controller: 'UsersOmniauthCallbacksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('facebook', $stateParams)
            }]
          }
        })
      
        .state('new_user_password_path', {
          url: '/users/password/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_password_path', {
          url: '/users/password/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_user_password_path'](params);
          },
          controller: 'DevisePasswordsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('cancel_user_registration_path', {
          url: '/users/cancel',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['cancel_user_registration_path'](params);
          },
          controller: 'DeviseRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('cancel', $stateParams)
            }]
          }
        })
      
        .state('new_user_registration_path', {
          url: '/users/sign_up',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_user_registration_path'](params);
          },
          controller: 'DeviseRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_user_registration_path', {
          url: '/users/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_user_registration_path'](params);
          },
          controller: 'DeviseRegistrationsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_admins_path', {
          url: '/admin/admins',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_admins_path'](params);
          },
          controller: 'AdminAdminsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('admin_admin_configurable_edit_path', {
          url: '/admin/configurable/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_admin_configurable_edit_path'](params);
          },
          controller: 'AdminConfigurableCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_clients_path', {
          url: '/admin/clients',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_clients_path'](params);
          },
          controller: 'AdminClientsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_client_path', {
          url: '/admin/clients/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_client_path'](params);
          },
          controller: 'AdminClientsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_client_path', {
          url: '/admin/clients/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_client_path'](params);
          },
          controller: 'AdminClientsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_client_path', {
          url: '/admin/clients/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_client_path'](params);
          },
          controller: 'AdminClientsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('admin_tasks_path', {
          url: '/admin/tasks',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_tasks_path'](params);
          },
          controller: 'AdminTasksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_task_path', {
          url: '/admin/tasks/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_task_path'](params);
          },
          controller: 'AdminTasksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_task_path', {
          url: '/admin/tasks/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_task_path'](params);
          },
          controller: 'AdminTasksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('admin_task_path', {
          url: '/admin/tasks/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['admin_task_path'](params);
          },
          controller: 'AdminTasksCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('infos_path', {
          url: '/infos',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['infos_path'](params);
          },
          controller: 'InfosCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_info_path', {
          url: '/infos/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_info_path'](params);
          },
          controller: 'InfosCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_info_path', {
          url: '/infos/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_info_path'](params);
          },
          controller: 'InfosCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('info_path', {
          url: '/infos/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['info_path'](params);
          },
          controller: 'InfosCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('messagestoadministrators_path', {
          url: '/messagestoadministrators',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['messagestoadministrators_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_messagestoadministrator_path', {
          url: '/messagestoadministrators/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_messagestoadministrator_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_messagestoadministrator_path', {
          url: '/messagestoadministrators/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_messagestoadministrator_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('messagestoadministrator_path', {
          url: '/messagestoadministrators/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['messagestoadministrator_path'](params);
          },
          controller: 'MessagestoadministratorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('answerfrommoderators_path', {
          url: '/answerfrommoderators',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['answerfrommoderators_path'](params);
          },
          controller: 'AnswerfrommoderatorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_answerfrommoderator_path', {
          url: '/answerfrommoderators/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_answerfrommoderator_path'](params);
          },
          controller: 'AnswerfrommoderatorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_answerfrommoderator_path', {
          url: '/answerfrommoderators/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_answerfrommoderator_path'](params);
          },
          controller: 'AnswerfrommoderatorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('answerfrommoderator_path', {
          url: '/answerfrommoderators/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['answerfrommoderator_path'](params);
          },
          controller: 'AnswerfrommoderatorsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('orders_path', {
          url: '/orders',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['orders_path'](params);
          },
          controller: 'OrdersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_order_path', {
          url: '/orders/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_order_path'](params);
          },
          controller: 'OrdersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_order_path', {
          url: '/orders/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_order_path'](params);
          },
          controller: 'OrdersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('order_path', {
          url: '/orders/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['order_path'](params);
          },
          controller: 'OrdersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('line_items_path', {
          url: '/line_items',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['line_items_path'](params);
          },
          controller: 'LineItemsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_line_item_path', {
          url: '/line_items/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_line_item_path'](params);
          },
          controller: 'LineItemsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_line_item_path', {
          url: '/line_items/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_line_item_path'](params);
          },
          controller: 'LineItemsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('line_item_path', {
          url: '/line_items/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['line_item_path'](params);
          },
          controller: 'LineItemsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('carts_path', {
          url: '/carts',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['carts_path'](params);
          },
          controller: 'CartsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_cart_path', {
          url: '/carts/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_cart_path'](params);
          },
          controller: 'CartsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_cart_path', {
          url: '/carts/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_cart_path'](params);
          },
          controller: 'CartsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('cart_path', {
          url: '/carts/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['cart_path'](params);
          },
          controller: 'CartsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('searches_path', {
          url: '/searches',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['searches_path'](params);
          },
          controller: 'SearchesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_search_path', {
          url: '/searches/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_search_path'](params);
          },
          controller: 'SearchesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_search_path', {
          url: '/searches/:id/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_search_path'](params);
          },
          controller: 'SearchesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
        .state('search_path', {
          url: '/searches/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['search_path'](params);
          },
          controller: 'SearchesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('home_index_path', {
          url: '/home/index',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['home_index_path'](params);
          },
          controller: 'HomeCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('store_map_path', {
          url: '/store/map',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['store_map_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('map', $stateParams)
            }]
          }
        })
      
        .state('store_index_path', {
          url: '/store/index',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['store_index_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('store_all_category_path', {
          url: '/store/all_category',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['store_all_category_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('all_category', $stateParams)
            }]
          }
        })
      
        .state('store_show_path', {
          url: '/store/show',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['store_show_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show', $stateParams)
            }]
          }
        })
      
        .state('store_contact_path', {
          url: '/store/contact',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['store_contact_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('contact', $stateParams)
            }]
          }
        })
      
        .state('increase_line_item_path', {
          url: '/line/increase',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['increase_line_item_path'](params);
          },
          controller: 'LineItemsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('increase', $stateParams)
            }]
          }
        })
      
        .state('decrease_line_item_path', {
          url: '/line/decrease',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['decrease_line_item_path'](params);
          },
          controller: 'LineItemsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('decrease', $stateParams)
            }]
          }
        })
      
        .state('store_showlike_path', {
          url: '/store/showlike',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['store_showlike_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('showlike', $stateParams)
            }]
          }
        })
      
        .state('change_locale_path', {
          url: '/change_locale/:locale',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['change_locale_path'](params);
          },
          controller: 'PagesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('change_locale', $stateParams)
            }]
          }
        })
      
        .state('finish_signup_path', {
          url: '/users/:id/finish_signup',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['finish_signup_path'](params);
          },
          controller: 'UsersCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('finish_signup', $stateParams)
            }]
          }
        })
      
        .state('user_show_path', {
          url: '/info_show_from_email/:user_id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_show_path'](params);
          },
          controller: 'InfosCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show_from_email', $stateParams)
            }]
          }
        })
      
        .state('user_show_navbar_path', {
          url: '/info_show_from_navbar/:user_id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['user_show_navbar_path'](params);
          },
          controller: 'InfosCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('show_from_navbar', $stateParams)
            }]
          }
        })
      
        .state('ban_path', {
          url: '/ban_the_user/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['ban_path'](params);
          },
          controller: 'AdminAdminsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('ban_the_user', $stateParams)
            }]
          }
        })
      
        .state('make_admin_path', {
          url: '/make_admin/:id',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['make_admin_path'](params);
          },
          controller: 'AdminAdminsCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('make_admin', $stateParams)
            }]
          }
        })
      
        .state('root_path', {
          url: '/',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['root_path'](params);
          },
          controller: 'StoreCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('index', $stateParams)
            }]
          }
        })
      
        .state('new_admin_configurable_path', {
          url: '/admin/configurable/new',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['new_admin_configurable_path'](params);
          },
          controller: 'AdminConfigurablesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('new', $stateParams)
            }]
          }
        })
      
        .state('edit_admin_configurable_path', {
          url: '/admin/configurable/edit',
          
          templateUrl: function(params) {
            params['ng-view']='';
            
            
            return Routes['edit_admin_configurable_path'](params);
          },
          controller: 'AdminConfigurablesCtrl as ctrl',
          resolve: {
            action: ['$stateParams', function ($stateParams) {
              return resolve('edit', $stateParams)
            }]
          }
        })
      
      return $stateProvider;
    }
  }])

  .config(['$provide',
    function($provide) {
      $provide.decorator('$state', ['$delegate', function($delegate) {
        var state = $delegate;
        state.baseGo = state.go;

        var go = function(to, params, options) {
          options = options || {};

          if (state.defaultParams) {
            var defaultParams = angular.copy(state.defaultParams);
            params = angular.extend(defaultParams, params);
          }

          options.inherit = false;

          state.baseGo(to, params, options);
        };
        state.go = go;

        return $delegate;
      }]);
    }
  ])
angular.module("oxymoron.config.debug", [])
.config(['$compileProvider', function ($compileProvider) {
  $compileProvider.debugInfoEnabled(false);
}]);

angular.module("oxymoron.config", ['oxymoron.config.http', 'oxymoron.config.states', 'oxymoron.config.debug'])

  angular.module("oxymoron.services.interceptor", [])
  .factory('httpInterceptor', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    return {
      request: function (config) {
        $rootScope.$broadcast('loading:progress');
        return config || $q.when(config);
      },
      response: function (response) {
        $rootScope.$broadcast('loading:finish', response);
        return response || $q.when(response);
      },
      responseError: function (response) {
        $rootScope.$broadcast('loading:error', response);
        return $q.reject(response);
      }
    };
  }])
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
  }])
angular.module("oxymoron.services.resources", [])
  .factory('resourceDecorator', [function () {
    return function(resource) {
      return resource;
    };
  }])

  
    .factory('ProductComment', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/products/:product_id/comments/:id.json', {"product_id":"@product_id","id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/products/:product_id/comments/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/products/:product_id/comments/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Product', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/products/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/products/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/products/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        },
        "order" : {
          "url" : "/products/:kind.json",
          "isArray" : null,
          "method" : "GET"
        }
      }));
    }])
  
    .factory('AdminClient', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/clients/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/admin/clients/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/admin/clients/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('AdminTask', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/admin/tasks/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/admin/tasks/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/admin/tasks/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Info', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/infos/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/infos/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/infos/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Messagestoadministrator', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/messagestoadministrators/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/messagestoadministrators/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/messagestoadministrators/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Answerfrommoderator', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/answerfrommoderators/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/answerfrommoderators/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/answerfrommoderators/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Order', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/orders/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/orders/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/orders/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('LineItem', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/line_items/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/line_items/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/line_items/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Cart', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/carts/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/carts/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/carts/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        }
      }));
    }])
  
    .factory('Search', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/searches/:id.json', {"id":"@id"}, {
        "new" : {
          "method" : "GET",
          "url" : "/searches/:id/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/searches/:id/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        },
        "search_product" : {
          "url" : "/searches/product.json",
          "isArray" : null,
          "method" : "POST"
        }
      }));
    }])
  
    .factory('StoreShow', ['$resource', 'resourceDecorator', function ($resource, resourceDecorator) {
      return resourceDecorator($resource('/store/show.json', {}, {
        "new" : {
          "method" : "GET",
          "url" : "/store/show/new.json"
        },
        "edit" : {
          "method" : "GET",
          "url" : "/store/show/edit.json"
        },
        "update" : {
          "method" : "PUT"
        },
        "create" : {
          "method" : "POST"
        },
        "destroy" : {
          "method" : "DELETE"
        },
        "showlike" : {
          "url" : "/store/showlike.json",
          "isArray" : null,
          "method" : "GET"
        }
      }));
    }])
  
angular.module("oxymoron.services.sign", [])
  .service('Sign', ['$http', function ($http) {
    var Sign = this;

    Sign.out = function (callback) {
      $http.delete(Routes.destroy_user_session_path())
        .success(function () {
          if (callback)
            callback()
        })
    }

    Sign.in = function (user_params, callback) {
      $http.post(Routes.user_session_path(), {user: user_params})
        .success(function () {
          if (callback)
            callback();
        })
    }

    Sign.up = function (user_params, callback) {
      $http.post(Routes.user_registration_path(), {user: user_params})
        .success(function () {
          if (callback)
            callback();
        })
    }
  }])
angular.module("oxymoron.services.validate", [])
  .factory('Validate', [function(){
    return function (form, errors){
      try {
        var $form = angular.element(document.querySelector('[name="'+form+'"]')).scope()[form];
      } catch(e) {
        var $form = {};
      }

      angular
        .element(document.querySelectorAll('.rails-errors')).remove();

      angular.forEach($form, function(ctrl, name) {
        if (name.indexOf('$') != 0) {
          angular.forEach(ctrl.$error, function(value, name) {
            ctrl.$setValidity(name, null);
          });
        }
      });


      angular.forEach(errors, function(errors_array, key) {
        var form_key = form+'['+key+']';
        try {
          if ($form[form_key]) {
            $form[form_key].$setTouched();
            $form[form_key].$setDirty();
            $form[form_key].$setValidity('server', false);
          }
          
          angular
            .element(document.querySelector('[name="'+form_key+'"]'))
            .parent()
            .append('<div class="rails-errors" ng-messages="'+form_key+'.$error"><div ng-message="server">'+errors_array[0]+'</div></div>')
        } catch(e) {
          console.log(e)
          console.warn('Element with name ' + form_key + ' not found for validation.')
        }
      });
    };
  }])
angular.module("oxymoron.services.notice", [])
.service('Notice', ['ngNotify', function(ngNotify){
  var Notice = this;

  Notice.callback = function (type, res) {
    ngNotify.set(res.data.msg || res.data.error, type);
  }
}])

angular.module("oxymoron.services", ["oxymoron.services.interceptor", "oxymoron.services.notice", "oxymoron.services.resources", "oxymoron.services.sign", "oxymoron.services.validate"])
  angular.module("oxymoron.directives.contentFor", [])
  .directive("contentFor", [
    "$compile", function($compile) {
      return {
        compile: function(el, attrs, transclude) {
          var template = el.html();

          return {
            pre: function(scope, iElement, iAttrs, controller) {
              var DOMElements = angular.element(document.querySelectorAll('[ng-yield="'+iAttrs.contentFor+'"]'));
              if (DOMElements.attr("only-text") == "true") {
                template = el.text().replace(/(?:\r\n|\r|\n)/g, ' ');
              }
              DOMElements.html((DOMElements.attr("prefix") || "") + template + (DOMElements.attr("postfix") || ""))
              $compile(DOMElements)(scope);

              
              return iElement.remove();
            }
          };
        }
      };
    }
  ])
angular.module("oxymoron.directives.fileupload", [])
  .directive('fileupload', ['$http', '$timeout', '$cookies', function ($http, $timeout, $cookies) {
    return {
      scope: {
        fileupload: "=",
        ngModel: "=",
        hash: "=",
        percentCompleted: "="
      },
      restrict: 'A',
      link: function($scope, element, attrs) {
        $scope.percentCompleted = undefined;

        element.bind('change', function(){
          if ($scope.xhr) $scope.xhr.abort();

          var fd = new FormData();

          angular.forEach(element[0].files, function (file) {
            fd.append("attachments[]", file);
          })

          $scope.xhr = new XMLHttpRequest;

          $scope.xhr.upload.onprogress = function(e) {
              // Event listener for when the file is uploading
              $scope.$apply(function() {
                  var percentCompleted;
                  if (e.lengthComputable) {
                      $scope.percentCompleted = Math.round(e.loaded / e.total * 100);
                  }
              });
          };

          $scope.xhr.onload = function() {
              var res = JSON.parse(this.responseText)

              $scope.$apply(function() {
                if (!$scope.hash) {
                  if (attrs.multiple) {
                    $scope.ngModel = $scope.ngModel || [];
                    angular.forEach(res, function (attachment) {
                      $scope.ngModel.push(attachment);
                    });
                  } else {
                    $scope.ngModel = res[0];
                  }
                } else {
                  $scope.ngModel = $scope.ngModel || {};
                  angular.forEach(res, function(value, key) {
                    $scope.ngModel[key] = $scope.ngModel[key] || [];
                    angular.forEach(value, function (attachment) {
                      $scope.ngModel[key].push(attachment);
                    });
                  });
                }

                $scope.percentCompleted = undefined;
              });
          };


          $scope.xhr.open('POST', $scope.fileupload);
          $scope.xhr.setRequestHeader('X-XSRF-Token', $cookies.get('XSRF-TOKEN'));
          $scope.xhr.send(fd);

          element[0].value = '';
        })
      }
    }
  }])
angular.module("oxymoron.directives.clickOutside", [])
  .directive('clickOutside', ['$document', function ($document) {
    return {
      restrict: 'A',
      scope: {
        clickOutside: '&',
        clickOutsideIf: '='
      },
      link: function (scope, el, attr) {
        var handler = function (e) {
          if (scope.clickOutsideIf && el !== e.target && !el[0].contains(e.target) && document.body.contains(e.target)) {
            scope.$apply(function () {
                scope.$eval(scope.clickOutside);
            });
          }
        }

        $document.bind('click', handler);

        scope.$on('$destroy', function () {
          $document.unbind('click', handler)
        })
      }
    }
  }])

angular.module("oxymoron.directives", ['oxymoron.directives.fileupload', 'oxymoron.directives.contentFor', 'oxymoron.directives.clickOutside'])
  angular.module("oxymoron.notifier", [])
  .run(['$rootScope', 'ngNotify', 'Validate', '$state', '$http', '$location', 'Notice', function ($rootScope, ngNotify, Validate, $state, $http, $location, Notice) {
    ngNotify.config({
        theme: 'pure',
        position: 'top',
        duration: 2000,
        type: 'info'
    });

    var callback = function(type, res) {
      if (res.data && angular.isObject(res.data)) {
        if (res.data.msg || res.data.error) {
          Notice.callback(type, res);
        }

        if (res.data.errors) {
          Validate(res.data.form_name || res.config.data.form_name, res.data.errors)
        }

        if (res.data.redirect_to_url) {
          $location.url(res.data.redirect_to_url);
        } else if (res.data.redirect_to) {
          $state.go(res.data.redirect_to, res.data.redirect_options || {});
        }

        if (res.data.reload) {
          window.location.reload();
        }
      }
    }

    $rootScope.$on('loading:finish', function (h, res) {
      callback('success', res)
    })

    $rootScope.$on('loading:error', function (h, res, p) {
      callback('error', res)
    })


  }])

  angular.module('oxymoron', ['ngNotify', 'ngCookies', 'ui.router', 'ngResource', 'oxymoron.directives', 'oxymoron.services', 'oxymoron.config', 'oxymoron.notifier'])

}).call(this);

(function () {
  var Routes = function () {
    var self = this,
        routes = {"order_products":{"defaults":{},"path":"/products/:kind"},"product_comments":{"defaults":{},"path":"/products/:product_id/comments"},"new_product_comment":{"defaults":{},"path":"/products/:product_id/comments/new"},"edit_product_comment":{"defaults":{},"path":"/products/:product_id/comments/:id/edit"},"product_comment":{"defaults":{},"path":"/products/:product_id/comments/:id"},"products":{"defaults":{},"path":"/products"},"new_product":{"defaults":{},"path":"/products/new"},"edit_product":{"defaults":{},"path":"/products/:id/edit"},"product":{"defaults":{},"path":"/products/:id"},"new_user_session":{"defaults":{},"path":"/users/sign_in"},"user_session":{"defaults":{},"path":"/users/sign_in"},"destroy_user_session":{"defaults":{},"path":"/users/sign_out"},"user_digitalocean_omniauth_authorize":{"defaults":{},"path":"/users/auth/digitalocean"},"user_digitalocean_omniauth_callback":{"defaults":{},"path":"/users/auth/digitalocean/callback"},"user_google_oauth2_omniauth_authorize":{"defaults":{},"path":"/users/auth/google_oauth2"},"user_google_oauth2_omniauth_callback":{"defaults":{},"path":"/users/auth/google_oauth2/callback"},"user_facebook_omniauth_authorize":{"defaults":{},"path":"/users/auth/facebook"},"user_facebook_omniauth_callback":{"defaults":{},"path":"/users/auth/facebook/callback"},"user_password":{"defaults":{},"path":"/users/password"},"new_user_password":{"defaults":{},"path":"/users/password/new"},"edit_user_password":{"defaults":{},"path":"/users/password/edit"},"cancel_user_registration":{"defaults":{},"path":"/users/cancel"},"user_registration":{"defaults":{},"path":"/users"},"new_user_registration":{"defaults":{},"path":"/users/sign_up"},"edit_user_registration":{"defaults":{},"path":"/users/edit"},"voices_increase":{"defaults":{},"path":"/voices/:increase_id"},"voices_decrease":{"defaults":{},"path":"/voices/:decrease_id"},"admin_admins":{"defaults":{},"path":"/admin/admins"},"admin_admin_configurable_edit":{"defaults":{},"path":"/admin/configurable/edit"},"admin_clients":{"defaults":{},"path":"/admin/clients"},"new_admin_client":{"defaults":{},"path":"/admin/clients/new"},"edit_admin_client":{"defaults":{},"path":"/admin/clients/:id/edit"},"admin_client":{"defaults":{},"path":"/admin/clients/:id"},"admin_tasks":{"defaults":{},"path":"/admin/tasks"},"new_admin_task":{"defaults":{},"path":"/admin/tasks/new"},"edit_admin_task":{"defaults":{},"path":"/admin/tasks/:id/edit"},"admin_task":{"defaults":{},"path":"/admin/tasks/:id"},"infos":{"defaults":{},"path":"/infos"},"new_info":{"defaults":{},"path":"/infos/new"},"edit_info":{"defaults":{},"path":"/infos/:id/edit"},"info":{"defaults":{},"path":"/infos/:id"},"messagestoadministrators":{"defaults":{},"path":"/messagestoadministrators"},"new_messagestoadministrator":{"defaults":{},"path":"/messagestoadministrators/new"},"edit_messagestoadministrator":{"defaults":{},"path":"/messagestoadministrators/:id/edit"},"messagestoadministrator":{"defaults":{},"path":"/messagestoadministrators/:id"},"answerfrommoderators":{"defaults":{},"path":"/answerfrommoderators"},"new_answerfrommoderator":{"defaults":{},"path":"/answerfrommoderators/new"},"edit_answerfrommoderator":{"defaults":{},"path":"/answerfrommoderators/:id/edit"},"answerfrommoderator":{"defaults":{},"path":"/answerfrommoderators/:id"},"orders":{"defaults":{},"path":"/orders"},"new_order":{"defaults":{},"path":"/orders/new"},"edit_order":{"defaults":{},"path":"/orders/:id/edit"},"order":{"defaults":{},"path":"/orders/:id"},"line_items":{"defaults":{},"path":"/line_items"},"new_line_item":{"defaults":{},"path":"/line_items/new"},"edit_line_item":{"defaults":{},"path":"/line_items/:id/edit"},"line_item":{"defaults":{},"path":"/line_items/:id"},"carts":{"defaults":{},"path":"/carts"},"new_cart":{"defaults":{},"path":"/carts/new"},"edit_cart":{"defaults":{},"path":"/carts/:id/edit"},"cart":{"defaults":{},"path":"/carts/:id"},"product_searches":{"defaults":{},"path":"/searches/product"},"searches":{"defaults":{},"path":"/searches"},"new_search":{"defaults":{},"path":"/searches/new"},"edit_search":{"defaults":{},"path":"/searches/:id/edit"},"search":{"defaults":{},"path":"/searches/:id"},"home_index":{"defaults":{},"path":"/home/index"},"store_map":{"defaults":{},"path":"/store/map"},"store_index":{"defaults":{},"path":"/store/index"},"store_all_category":{"defaults":{},"path":"/store/all_category"},"store_show":{"defaults":{},"path":"/store/show"},"store_contact":{"defaults":{},"path":"/store/contact"},"increase_line_item":{"defaults":{},"path":"/line/increase"},"decrease_line_item":{"defaults":{},"path":"/line/decrease"},"store_showlike":{"defaults":{},"path":"/store/showlike"},"change_locale":{"defaults":{},"path":"/change_locale/:locale"},"finish_signup":{"defaults":{},"path":"/users/:id/finish_signup"},"user_show":{"defaults":{},"path":"/info_show_from_email/:user_id"},"user_show_navbar":{"defaults":{},"path":"/info_show_from_navbar/:user_id"},"ban":{"defaults":{},"path":"/ban_the_user/:id"},"make_admin":{"defaults":{},"path":"/make_admin/:id"},"delete_user":{"defaults":{},"path":"/user_delete/:id"},"root":{"defaults":{},"path":"/"},"admin_configurable":{"defaults":{},"path":"/admin/configurable"},"new_admin_configurable":{"defaults":{},"path":"/admin/configurable/new"},"edit_admin_configurable":{"defaults":{},"path":"/admin/configurable/edit"}};

    self.defaultParams = {}

    var serialize = function(obj, prefix) {
      var str = [];
      for(var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(typeof v == "object" ?
            serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    }

    var omit = function (hash, key) {
      var hash = angular.copy(hash);
      delete hash[key]
      return hash
    }


    angular.forEach(routes, function (val, key) {
      var result = '';

      var gsub = function(params) {
        if (params.format) {
          result += '.' + params.format
        }

        var params = omit(params, 'format');
        angular.forEach(params, function (v, k) {
          var subst = ':' + k;
          if (result.search(subst) != -1) {
            result = result.replace(subst, v);
            params = omit(params, k);
          }
        })
        
        if (Object.keys(params).length)
          result += '?'+serialize(params)

        return result;
      }

      self[key+'_path'] = function (params) {
        var params = angular.extend(angular.copy(val.defaults), params || {});
        result = val.path;
        var defaultParams = angular.copy(self.defaultParams);
        return gsub(angular.extend(defaultParams, params));
      }

      self[key+'_url'] = function (params) {
        return window.location.origin + self[key+'_path'](params)
      }
    })
  }

  window.Routes = new Routes();

}).call(this)
