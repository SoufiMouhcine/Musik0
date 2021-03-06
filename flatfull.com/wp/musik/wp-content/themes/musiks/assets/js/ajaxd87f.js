+function ($) {
    if ($.support.pjax) {
      $.pjax.defaults.maxCacheLength = 0;
      var container = $('#ajax-container');
      $(document).on('click', 'a[data-pjax], .jp-title a, a', function(event) {
        var ids = ['change-avatar', 'change-cover-image', 'group-avatar', 'group-cover-image'];
        var classes = ['.no-ajax', '.edd_checkout'];
        if($("#ajax-container").length == 0 || event.currentTarget.href.indexOf('redirect') > -1 || $.inArray($(this).attr('id'), ids) !== -1 || $(this).hasClass('no-ajax') || $(this).is(classes.join(", ")) || $(this).parent().is(classes.join(", "))){
          return;
        }
        $.pjax.click(event, {container: '#ajax-container', timeout: 6000, fragment: '#ajax-container'});
      });

      $(document).on('pjax:success', function(event, data) {
        var $body = data.match(/<body class\=\"(.*)\"/);
        if($body){
          document.body.className = $body[1];
        }
      });

      $(document).on('pjax:start', function() { NProgress.start(); });

      $(document).on('pjax:beforeReplace', function() {
        // fix slider widget
        if($.fn.cycle){
          $('.sow-slider-images').cycle('destroy');
        }
      });

      // fix js
      $(document).on('pjax:end', function() {
        NProgress.done();
          // fix edd ajax cart
        $( ".edd-add-to-cart.edd-no-js" ).each(function() {
          ($( this ).css('display') != 'none') && $( this ).css('display','none').prev().css('display','inline-block');
        });
        // fix masonry
        $('#masonry').tile();
        // fix mediaelement
        $(container).find('audio,video').mediaelementplayer();

        // setup page build widget
        var sowb = window.sowb || {};
        $( sowb ).trigger( 'setup_widgets' );

        $( document ).trigger( "pjaxEnd" );
      });
    }
}(jQuery);
