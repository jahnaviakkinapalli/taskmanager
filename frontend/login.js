document.getElementById('submit').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '' || password === '') {
        alert('Enter details');
        return;
    }
    const signObj = {
        user_name: username,
        password: password
    };
    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(signObj)
        });
        const result = await response.json();
        if (result.status === 'success') {
            window.location.href = '/frontend/cart.html';
            localStorage.setItem('jwtToken', result.token)
            localStorage.setItem('user_id', result?.data?.id);
        }
        else {
            alert('Invalid credentials!!!');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});
