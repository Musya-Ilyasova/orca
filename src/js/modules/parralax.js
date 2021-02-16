// INTRO SECTION

var imgX = $('.intro-referral_image').offset().left + ( $('.intro-referral_image').width() / 2 );
var imgY = $('.intro-referral_image').offset().top + ( $('.intro-referral_image').height() / 2 );

// Parallax phone image
$(window).on('mousemove', function(e){
    var x = ( e.clientX - imgX ) / 100;
    var y = ( e.clientY - imgY ) / 100;    
    $('.intro-referral_image_guys').css('transform', 'translate3d(' + x * 2 + 'px, ' + y * 2 + 'px, 0)')
    $('.intro-referral_image_logotypes').css('transform', 'translate3d(' + x * 3 + 'px, ' + y * 3 + 'px, 0)')
    $('.intro-referral_image_gifts').css('transform', 'translate3d(' + x * 4 + 'px, ' + y * 4 + 'px, 0)')
    $('.intro-referral_background').css('transform', 'translate3d(' + x * 1 + 'px, ' + y * 1 + 'px, 0)')
})