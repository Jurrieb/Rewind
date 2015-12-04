function getViewportOffset($e) {
  var $window = $(window),
    scrollLeft = $window.scrollLeft(),
    scrollTop = $window.scrollTop(),
    offset = $e.offset(),
    windowWidth = $(window).width(),
    windowHeight = $(window).height();

  return {
    top: offset.top - scrollTop,
    right: windowWidth - (offset.left - scrollLeft),
    bottom: windowHeight - (offset.top - scrollTop),
    left: offset.left - scrollLeft
  };
}

function dropdown($menu) {

	var offset = getViewportOffset($menu.parent());
	var css = {top : 'auto', right : 'auto', bottom : 'auto', left : 'auto'};

	if(offset.left > offset.right) {
		$.extend(css, {right : '0'});
	} else {
		$.extend(css, {left : '0'});
	}

	if(offset.top > offset.bottom) {
        css.bottom = '100%';
	} else {
		css.top = '100%';
	}
    
	$('.dropdown-menu').not($menu).hide();
	$menu.css(css);
	$menu.toggle();
}

function popup($popup) {
    $popup.toggle();
}

$(function() {
    $(document).on( 'click', 'a,button[data-toggle]', function(e) {

        e.preventDefault();

		var $self = $(this);
		var type = $self.data('toggle');

		switch(type) {
			case 'popup':
                $popup = $($self.data('target'));
				popup($popup);
				break;
			case 'dropdown':
                var $menu = $self.parent().find('.dropdown-menu');
				dropdown($menu);
				break;
		}

    });

    $(document).on( 'click', '.popup', function(e) {
        $self = $(this);
        $window = $self.find('.popup-window');
        if($window.length) {
			if (!$window.is(e.target)
				&& $window.has(e.target).length === 0) {
                    popup($('#popup'));
			}
		}
    });

    $(document).on( 'click', function(e) {
		if($('.dropdown').length) {
			if (!$('.dropdown').is(e.target)
				&& $('.dropdown').has(e.target).length === 0) {
					$('.dropdown-menu').hide();
			}
		}
    });

});