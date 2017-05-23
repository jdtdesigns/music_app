
const app = (() => {
	let show_form = false;

	const saveSongs = () => {
		_.each(songs, song => {
			const songs_ref = firebase.database().ref('songs');

			songs_ref.push(song);
		});
	};

	const addSong = (e) => {
		e.preventDefault();

		const title = $('#title').val(),
					writer = $('#writer').val(),
					lyrics = $('#lyrics').val(),
					songs_ref = firebase.database().ref('songs');

		songs_ref.push({
			title: title,
			writer: writer,
			lyrics: quill.getContents()
		});
		// console.log(quill.getContents());
		// songs_ref.push({

		// });
	};

	const login = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
      
    firebase.auth().signInWithPopup(provider).then(result => {
      const token = result.credential.accessToken;
      const user = result.user;
      
      $('#add').show();
      // saveSongs();
      
    }).catch(error => {
      console.log(error.message);        
    });
	};

	const logout = () => {
		firebase.auth().signOut();
		$('#add').hide();
	};

	const setLogStatus = (e) => {
		const btn = $(e.target);

		if ( btn.text() == 'Log In' ) {
			btn.text('Log Out');
			login();
		} else {
			btn.text('Log In');
			logout();
		}
	};

	const setAddStatus = () => {
		if ( show_form ) {
			$('.input-form').addClass('hide');
			show_form = false;
		} else {
			$('.input-form').removeClass('hide');
			show_form = true;
		}
	};

	const init = () => {
		window.quill = new Quill('#editor', {
	    theme: 'snow'
	  });

		$('#log').on('click', setLogStatus);
		$('#add').on('click', setAddStatus);

		$('#submit').on('click', addSong);
	};

	return { 
		init: init 
	};
})();

app.init();










