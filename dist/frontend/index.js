const baseURL = "http://localhost:3000/";
const paths = "/";
const headers = {};

let username = "";
let password = "";
const items = [];
const SESSION_CONTAINER = document.getElementById("session-container");
const SESSION_USERNAME = document.getElementById("session-username-field");
const SESSION_ITEMS = document.getElementById("session-items-field");
const SUBMIT_USERNAME = document.getElementById("submit-username");
const SUBMIT_PASSWORD = document.getElementById("submit-password");
const SUBMIT_USER_BUTTON = document.getElementById("submit-login");
const SUBMIT_URL = document.getElementById("#submit-url");
const LOGIN_USERNAME_WARNING = document.getElementById("login-username-header-warning");
const AxiosInstance = window.axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

function POSTRequest (paths, options) {
    return new Promise((res, rej) => {
        let response;
        AxiosInstance.post(paths, options)
        .then((axiosRes) => {
            console.log(axiosRes)
            if(axiosRes.data.success == true) {
                res(axiosRes);
            } else {
                rej(axiosRes);
            }
            response = res;
        }).catch(axiosRej => {
            console.log("AXIOS ERROR: ", axiosRej);
        })

    })
}


function ServerAddUser(username, password) {
    const options = {
        username: username,
        password: password
    };
    
    return new Promise((res, rej) => {
        POSTRequest("/addUser", options)
        .then((POSTres) => {
            res(POSTres)
        }).catch((POSTrej) => {
            rej("POSTREQUEST REJECTION: ", POSTrej)
        })
    })
}


function ServerAddItem(url) {
    const options = {
        productURL: url
    };
    
    return new Promise((res, rej) => {
        POSTRequest("/addItem", options)
        .then((POSTres) => {
            res(POSTres)
        }).catch((POSTrej) => {
            rej("POSTREQUEST REJECTION: ", POSTrej)
        })
    })
}

function ServerAddItemToUser(username, password, productURL) {
    const options = {
        username: username,
        password: password,
        productURL: productURL
    };
    
    return new Promise((res, rej) => {
        POSTRequest("/addItemToUser", options)
        .then((POSTres) => {
            res(POSTres)
        }).catch((POSTrej) => {
            rej("POSTREQUEST REJECTION: ", POSTrej)
        })
    })
}

function ServerGetItemsFromUser(username, password) {
    const options = {
        username: username,
        password: password
    };
    
    return new Promise((res, rej) => {
        POSTRequest("/getItemsFromUser", options)
        .then((POSTres) => {
            res(POSTres)
        }).catch((POSTrej) => {
            rej("POSTREQUEST REJECTION: ", POSTrej)
        })
    })
}

SUBMIT_USER_BUTTON.onclick = () => { 
    ServerAddUser(SUBMIT_USERNAME.value, SUBMIT_PASSWORD.value)
    .then(res => {
        SESSION_USERNAME.innerHTML = res.data.response.username;
        SESSION_CONTAINER.classList.add("container-success");
    }).catch(rej => {
        LOGIN_USERNAME_WARNING.classList.remove("hidden");
    });

}

console.log("Hello from frontend!");