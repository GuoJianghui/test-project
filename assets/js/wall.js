(function($, PM) {
  if (location.href.indexOf('wall') < 0) return;

  var galleryInterval = 0;
  var lastAnchor = null;

  $(function() {
    $('#fullpage').fullpage({
      anchors:['gallery', 'theme'],
      verticalCentered: false,
      afterLoad: function(anchor, index) {
        clearInterval(galleryInterval);
        lastAnchor = anchor;

        switch (anchor) {
          case 'gallery':
            galleryInterval = setInterval(function () {
              $.fn.fullpage.moveSlideRight();
            }, 4000);
            break;
          default:
            $('#wish-board').css('visibility', 'visible');
            break;
        }
      }
    });
  });
  if ($('#wish-board').size() > 0) {
    PM.poller.interval = 2000;
    PM.poller.poll();
    PM.board.init($('#wish-board'));
    PM.board.speed = 8000;
    PM.board.duration = 1200;
    PM.board.showName = true;
  }

}(jQuery, PM));
