window.onload = init;
var headers = {};
var url_R = "http://localhost:3000/employees";

function init() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            'Authorization': "bearer " + localStorage.getItem("token")
        }
        load_functions();
    }
    else {
        window.location.href = "index.html";
    }
}

function load_functions() {
    document.querySelector('.btn_add').addEventListener('click', add_user);
    document.querySelector('.btn_update').addEventListener('click', update_user);
    document.querySelector('.btn_delete').addEventListener('click', delete_user);
    document.querySelector('.btn_search').addEventListener('click', search_user);
}

function update_user() {
    var namelocal = document.getElementById('name_up').value;
    var lastnamelocal = document.getElementById('last_name_up').value;
    var phonelocal = document.getElementById('phone_up').value;
    var emaillocal = document.getElementById('email_up').value;
    var passwordlocal = document.getElementById('password_up').value;
    url_R = url_R + "/" + nombrelocal;
    alert(url_R);
    axios({
        method: 'put',
        url: url_R,
        headers,
        data: {
            first_name: namelocal,
            last_name: lastnamelocal,
            phone: phonelocal,
            email: emaillocal,
            password: passwordlocal
        }
    }).then(function (res) {
        console.log(res.data);
        if (res.data.code === 200) {
            alert("actulizacion exitosa");
        }
        else {
            alert("usuario no insertado");
        }
    }).catch(function (err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/employees";
}

function add_user() {
    var nombrelocal = document.getElementById('name_add').value;
    var apellidoslocal = document.getElementById('last_name_add').value;
    var telefonolocal = document.getElementById('phone_add').value;
    var correolocal = document.getElementById('email_add').value;
    var passwordlocal = document.getElementById('password_add').value;
    
    alert(url_R);
    axios({
        method: 'post',
        url: url_R,
        headers,
        data: {
            first_name: nombrelocal,
            last_name: apellidoslocal,
            phone: telefonolocal,
            email: correolocal,
            password: passwordlocal,
        }
    }).then(function (res) {
        console.log(res.data);
        if (res.data.code === 201) {
            alert("insercion exitosa");
        }
        else {
            alert("usuario no insertado");
        }
    }).catch(function (err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/employees";
}

function delete_user() {
    var idlocal = document.getElementById('id_delete').value;
    var nombrelocal = document.getElementById('name_delete').value;
    url_R = url_R + "/";
    axios({
        method: 'delete',
        url: url_R,
        headers,
        data: {
            employee_id: idlocal,
            first_name: nombrelocal
        }
    }).then(function (res) {
        console.log(res.data);
        if (res.data.code === 200) {
            alert("eliminacion exitosa");
        }
        else {
            alert("usuario no eliminado");
        }
    }).catch(function (err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/employees";
}

function search_user() {
    var idlocal = document.getElementById('id_search').value;
    var nombrelocal = document.getElementById('name_search').value;
    url_R = url_R + "/buscar";
    alert(url_R)
    axios({
        method: 'post',
        url: url_R,
        headers,
        data: {
            employee_id: idlocal,
            first_name: nombrelocal
        }
    }).then(function (res) {
        console.log(res.data);
        if (res.data.code === 200) {
            const usuario = res.data.message;
            displaydatos(usuario);
        }
        else {
            alert("usuario no eliminado");
        }
    }).catch(function (err) {
        console.log(err);
    })
    url_R = "http://localhost:3000/employees";
}

function displaydatos(usuario) {
    const contenedor = document.querySelector("div.seccion");
    contenedor.innerHTML += `<div>
        apellidos:<br>
        <h5 class="int_AP">${usuario[0].first_name}</h5>
        </div>
        <div>
        telefono:<br>
        <h5 class="int_tel">${usuario[0].phone}</h5>
        </div>
        <div>
        correo electrónico:<br>
        <h5 class="int_CE">${usuario[0].email}</h5>
        </div>
        <div>
        contraseña:<br>
        <h5 class="int_PS">${usuario[0].password}</h5>
        </div>`;
}