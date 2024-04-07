// ANIMACIÓN DEL LOGIN--->

const container = document.querySelector('#container');
const registerBtn = document.querySelector('#register');
const loginBtn = document.querySelector('#login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// COMUNICACIÓN CON EL BACKEND--->

// Span de errores del resgistro
const spanErrorUp = document.getElementsByClassName("error")[0];

document.getElementById("sign-up-form").addEventListener("submit", async (e) => {

    //Para que  no se reinicie la pagina
    e.preventDefault();

    //Mando la peticion al endpoint correspondiente con los valores de los inputs
    const res = await fetch("http://localhost:4000/api/register",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.username.value,
            email: e.target.children.email.value,
            password: e.target.children.password.value
        })
    });

    // Espero la respuesta y la convierto en objeto
    const resJson = await res.json();

    // Si la respuesta del servidor no es ok, muestro el error
    if(!res.ok) {
        spanErrorUp.textContent = resJson.message;
        spanErrorUp.classList.toggle("escondido",false);
        spanErrorUp.classList.add("desaparecer-aparecer");
        setTimeout(function() {
            spanErrorUp.classList.remove("desaparecer-aparecer");
        }, 2000);

    // Si no y tiene la propiedad redirect, redirijo hacia donde indique el servidor
    }else if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
    
})

// Span de errores del incio de sesion
const spanErrorIn = document.getElementsByClassName("error")[1];

document.getElementById("sign-in-form").addEventListener("submit", async (e) => {

    //Para que  no se reinicie la pagina
    e.preventDefault();

    //Mando la peticion al endpoint correspondiente con los valores de los inputs
    const res = await fetch("http://localhost:4000/api/login",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            email: e.target.children.email.value,
            password: e.target.children.password.value
        })
    });

    // Espero la respuesta y la convierto en objeto
    const resJson = await res.json();

    // Si la respuesta del servidor no es ok, muestro el error
    if(!res.ok) {
        spanErrorIn.textContent = resJson.message; 
        spanErrorIn.classList.toggle("escondido",false);
        spanErrorIn.classList.add("desaparecer-aparecer");
        setTimeout(function() {
            spanErrorIn.classList.remove("desaparecer-aparecer");
        }, 2000);

    // Si no y tiene la propiedad redirect, redirijo hacia donde indique el servidor
    }else if(resJson.redirect){
        window.location.href = resJson.redirect;
    }
})