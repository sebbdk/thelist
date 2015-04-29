/* 
* @Author: sebb
* @Date:   2014-04-04 20:44:35
* @Last Modified by:   sebb
* @Last Modified time: 2015-04-29 19:40:14
*/

(function($) {

	$(window).on('resize', onResize);

	$(document).ready(function() {
		onResize();

		setTimeout(function() {
			$('body').addClass('active');
		}, 300);

		_track('thelist');

		loadGames();
	});

	function loadGames() {
		$.get('games.json', function(items) {
			$('.sub-header').prepend(items.length + ' ')
			$.each(items, function(index, item) {
				var template = $($('#game-template').html());

				template.find('h3').html(item.title);
				template.find('p').html(item.description);

				if(item.picture) {
					template.find('a').css('background-image', 'url("' + item.picture + '")');
					template.addClass('has-img');
				}

				if(item.status) {
					template.find('a').addClass(item.status);

					if(item.status === "released") {
						template.removeClass('col-md-6');
						template.removeClass('has-img');
						template.addClass('col-md-12');

						if(item.picture) {
							template.find('a').css('background-image', 'none');
							template.find('a').append('<img style="" src="' + item.picture + '" />');
						}
					}
				}


				if(item.link) {
					template.find('a').attr('href', item.link);
					template.find('a').addClass('playable');
				} else {
					template.find('a').addClass('unplayable');
				}

				$('body .row').append(template);
			});

			$('.game, .sub-header').fadeIn(1500);
		});
	}

	function onResize() {
		console.log('resize!');
		var pos = ($(window).height()/2) - ($('.bubble').outerHeight()/2);
		$('.bubble').css('margin-top', pos)
	}

})(jQuery);