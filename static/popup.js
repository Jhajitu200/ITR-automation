window.setTimeout(function(){ 
	// First check, if localStorage is supported.
	if (window.localStorage) {
		// Get the expiration date of the previous popup.
		var nextPopup = localStorage.getItem( 'nextNewsletter' );

		if (nextPopup > new Date()) {
			return;
		}

		// Store the expiration date of the current popup in localStorage.
		var expires = new Date();
		expires = expires.setHours(expires.getHours() + 24);

		localStorage.setItem( 'nextNewsletter', expires );
	}

	popup.show();
}, 10_000);
