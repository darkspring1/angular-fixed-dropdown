
(function($) {
    $.fn.hasScrollBar = function() {
        return (this.get(0).scrollHeight > this.height()) || (this.get(0).scrollWidth > this.width());
    }
})(jQuery);

angular
    .module("components")
    .directive("fixedDropdown", [
        "$timeout", '$log', '$window', function ($timeout, $log, $window) {
            return {

                restrict: "EA",
                link: function link(scope, element, attrs) {

                    function trace(messsage){
                        $log.debug('fixedDropdown >> ' + messsage);
                    }

                    var $button = element.find("[uib-dropdown-toggle]");
                    var $menu = element.find("[role = menu]");

                    function setMenuPosition() {
                        
                        /*может быть 0, если элемент спрятан*/
                        var menuPosition = $button.offset();
                        menuPosition.top += $button.outerHeight(true) - $window.document.documentElement.scrollTop;
                        menuPosition.position = 'fixed';

                        if($menu.attr('button-width') == 'true')
                        {
                            var menuWidth = $button.outerWidth();
                            $menu.css('max-width', menuWidth);
                            $menu.css('min-width', menuWidth);
                        }
                        $menu.css(menuPosition);
                    }

                    $button.on('click', setMenuPosition);

                    var setMenuPositionThrottle = _.throttle(setMenuPosition, 10);

                    /* фильтр может осекать элементы со скролом
                    var scrollableParents = element.parents().filter(function () {
                        return $(this).hasScrollBar();
                    });
                    */
                    var scrollableParents = element.parents();

                    scrollableParents.on('scroll',setMenuPositionThrottle);
                    angular.element($window)
                        .on('resize', setMenuPositionThrottle)
                        .on('scroll', setMenuPositionThrottle);

                    scope.$on('$destroy', function () {
                        angular.element($window)
                            .off('click', setMenuPositionThrottle)
                            .off('scroll', setMenuPositionThrottle);
                        scrollableParents.off('scroll', setMenuPositionThrottle);
                    });
                    setMenuPosition();

                }
            };
        }
    ]);