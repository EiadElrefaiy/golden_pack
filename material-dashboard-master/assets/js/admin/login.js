/*window.onload = function () {
    localStorage.setItem("login" , 0);
    var form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        if(username == "" || password == "" ){
            document.getElementById('username').placeholder = "من فضلك ادخل اسم الادمن"
            document.getElementById('password').placeholder = "من فضلك ادخل كلمة السر"
            with(document.getElementById("username").style) {
                borderColor = 'red' ;
            } 
            with(document.getElementById("password").style) {
                borderColor = 'red' ;
            } 
            }else{
            fetch("http://127.0.0.1:8000/api/v1/admins/login", {
                method: 'POST',
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8"
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    if (data["status"] == true) {
                        localStorage.setItem("login" , 1);
                        location.replace("dayData.html");
                    }
                    else{
                        alert("خطأ في اسم المستخدم او كلمة السر")
                    }
                });    
        }
    });
}
*/
//window.onload();

function login(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if(username == "" || password == "" ){
        document.getElementById('username').placeholder = "من فضلك ادخل اسم الادمن"
        document.getElementById('password').placeholder = "من فضلك ادخل كلمة السر"
        with(document.getElementById("username").style) {
            borderColor = 'red' ;
        } 
        with(document.getElementById("password").style) {
            borderColor = 'red' ;
        } 
        }else{
        fetch("http://127.0.0.1:8000/api/v1/admins/login", {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data["status"] == true) {
                    localStorage.setItem("login" , 1);
                    window.location.replace("dayData.html.html");
                }
                else{
                    alert("خطأ في اسم المستخدم او كلمة السر")
                }
            });    
    }
}
