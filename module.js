/**
 * Created by eolt on 08.10.2015.
 */



    angular.module('components', ['ui.bootstrap'])
        .config([function () {

            }
        ])
        .controller('mainCtrl', function($scope){
            $scope.status = 
            {
                isOpen: true
            }
        })