define(function() {

    // Enables DOMs
    $.fn.enable = function() {
        return this.each(function() {
            $(this).removeClass("disabled").prop('disabled', false);
        });
    };

    // Disable DOMs
    $.fn.disable = function() {
        return this.each(function() {
            $(this).addClass("disabled").prop('disabled', true);
        });
    };

    // Resizes/Rezooms when orientation change on mobile device
    $(window).bind('orientationchange', function() {
        if (window.orientation == 90 || window.orientation == -90 || window.orientation == 270) {
            // portrait mode
            $('meta[name="viewport"]').attr('content', 'height=device-width,width=device-height,initial-scale=1.0,minimum-scale=1.0');
        } else {
            // lanscape mode
            $('meta[name="viewport"]').attr('content', 'height=device-height,width=device-width,initial-scale=1.0,minimum-scale=1.0');
        }
        $(window).resize();
    }).trigger('orientationchange');
    
});
