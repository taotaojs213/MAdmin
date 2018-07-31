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
                    theme: 'teal',
                    sticky: false,
                    horizontalEdge: 'top',
                    verticalEdge: 'right'
                },
                $button = $(this);
            
            if ($.trim($('input#notific8Heading').val()) != '') {
                settings.heading = '';
            }
            
            if (!settings.sticky) {
                settings.life = '10000';
            }
            
            $.notific8($.trim('测试'), settings);
            
            $button.attr('disabled', 'disabled');
            
            setTimeout(function() {
                $button.removeAttr('disabled');
            }, 1000);
            
        });
    }
};

$(function() {
    WS.jQuery.notific8.init();
});
