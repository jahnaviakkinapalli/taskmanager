var form = document.forms.form;
var regpass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/

user={username:'',password:'',confirmpassword:''}
labelMapping={username : "User Name",password : "Password",confirmpassword : "Confirm Password"}

function userName() {
    var username = form.Name.value;

    if (username.length < 6) {
        document.getElementById("usernamet").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">username should be minimum 6 characters</p>`
    }
    else {
        document.getElementById("usernamet").innerHTML = ``
        user.username = username
    }
}


function passwordd() {
    var pass = form.password.value;

    if (!pass.match(regpass)) {
        document.getElementById("passwordt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">password should contain Atleast one digit,
         Atleast one lowercase character 
         Atleast one uppercase character 
         Atleast one special character </p>`
    }
    else {
        document.getElementById("passwordt").innerHTML = ``
        user.password = pass
    }

}

function confirmPasswordd() {
    var conpass = form.confirmPassword.value;
    var pass = form.password.value;

    if (pass != conpass || conpass == "") {
        document.getElementById("confirmpasswordt").innerHTML =
            `<p class="alert alert-danger my-1 p-2" role="alert">password and confirm  password are not same</p>`
    }
    else {
        document.getElementById("confirmpasswordt").innerHTML = ``
        user.confirmpassword = conpass
    }
}


function validate() {
    var x = true
    for (const i in user) {
        if (user[i] == '') {
            console.log(i)
            document.getElementById(`${i}t`).innerHTML = `<p class="alert alert-danger my-1 p-2" role="alert"> ${labelMapping[i]} should not be empty</p>`
            x = false
        }
    }
    
    if (x == true) {
        const apiUrl = 'http://localhost:3005/user/register';
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json()) 
        .then(res => {
            if (res.message === "registration successful") {
                window.location.href = 'login.html';
            } else {
                alert(res.status);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        });
}
}