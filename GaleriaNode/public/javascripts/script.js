var CropImage = (function () {

	function popupResult(result) {
		var html;
		if (result.html) {
			html = result.html;
		}
		if (result.src) {
			html = '<img src="' + result.src + '" />';
		}
		swal({
			title: '',
			html: true,
			text: html,
			allowOutsideClick: true
		});
		setTimeout(function () {
			$('.sweet-alert').css('margin', function () {
				var top = -1 * ($(this).height() / 2),
					left = -1 * ($(this).width() / 2);

				return top + 'px 0 0 ' + left + 'px';
			});
		}, 1);
	}



	function demoUpload() {
		var $uploadCrop;

		function readFile(input) {
			if (input.files && input.files[0]) {
				var reader = new FileReader();

				reader.onload = function (e) {
					$('.upload-demo').addClass('ready');
					$uploadCrop.croppie('bind', {
						url: e.target.result
					}).then(function () {
						console.log('Bind con JQuery completo.');
					});

				}

				reader.readAsDataURL(input.files[0]);
			}
			else {
				swal("Algo pasó");
			}
		}

		$uploadCrop = $('#upload-demo').croppie({
			viewport: {
				width: 250,
				height: 250
			},
			enableExif: true
		});

		$('#upload').on('change', function () { readFile(this); });
		$('.upload-result').on('click', function (ev) {
			$uploadCrop.croppie('result', {
				type: 'canvas',
				size: 'viewport'
			}).then(function (resp) {
				popupResult({
					src: resp
				});
			});
		});
	}


	return { demoUpload } ;

})();
