document.getElementById('submit').addEventListener('click', async () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === '' || password === '') {
        alert('Enter details');
        return;
    }
    const signObj = {
        username: username,
        password: password
    };
    try {
        window.location.href = 'cart.html';
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(signObj)
        });
        const result = await response.json();
        if (result.message === 'failure') {
            alert('Invalid credentials!!!');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
        else{
            window.location.href = 'car.html';
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during login.');
    }
});
