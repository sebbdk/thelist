/* 
* @Author: sebb
* @Date:   2014-04-04 20:44:35
* @Last Modified by:   sebb
* @Last Modified time: 2015-01-18 20:57:51
*/

(function($) {

	$(window).on('resize', onResize);

	$(document).ready(function() {
		onResize();

		setTimeout(function() {
			$('body').addClass('active');
		}, 300);

		_track('blog_sebb_dk');

		loadGames();
	});

	function loadGames() {
		$.get('games.json', function(items) {
			$('.sub-header').prepend(items.length + ' ')
			$.each(items, function(index, item) {
				var template = $($('#game-template').html());

				template.find('h3').html(item.title);
				template.find('p').html(item.description);

				if(item.link) {
					template.find('a').attr('href', item.link);
				} else {
					template.find('a').remove();
				}

				$('body').append(template);
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