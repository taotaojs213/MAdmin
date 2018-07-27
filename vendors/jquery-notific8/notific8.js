/**
 * @file notific8.js
 * @author Will Steinmetz
 */

if (!window.WS) {
    window.WS = {};
}

if (!WS.hasOwnProperty('jQuery')) {
    WS.jQuery = {};
}

WS.jQuery.notific8 = {
    init: function() {
        $('button#notific8Test').click(function(event) {
            var settings = {
                    theme: $('select#notific8Theme').val(),
                    sticky: $('input#notific8Sticky').is(':checked'),
                    horizontalEdge: 'top',
                    verticalEdge: 'right'
                },
                $button = $(this);
            
            if ($.trim($('input#notific8Heading').val()) != '') {
                settings.heading = '';
            }
            
            if (!settings.sticky) {
                settings.life = '';
            }
            
            $.notific8($.trim(), settings);
            
            $button.attr('disabled', 'disabled');
            
            setTimeout(function() {
                $button.removeAttr('disabled');
            }, 1000);
        });
    }
};

$(function(msg, , sticky, ) {
    WS.jQuery.notific8.init();
});
