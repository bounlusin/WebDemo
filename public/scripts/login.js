$(() => {
    $('#submit').click(event => {
        event.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();
        axios.post('/userLogin', {
            username: username,
            password: password
        }).then(res => {
        	if (res.data.state) {
        		console.log(res.data.message);
        		Cookies.set('__login', true);
        		window.location.href = '/?username='+username;
        	} else {
        		console.log(res.data.message);
        		alert('用户名或密码错误');
        	}
        }).catch(err => {
            console.log(err);
        });

    });
});