const baseURL = "http://localhost:3000/";
const paths = "/";
const headers = {};

let username = "";
let password = "";
let items = [];
const SESSION_CONTAINER = document.getElementById("session-container");
const SESSION_USERNAME = document.getElementById("session-username-field");
const SESSION_ITEMS = document.getElementById("session-items-field");
const ADD_ITEM_BUTTON = document.getElementById("add-item-button");
const ADD_ITEM_URL_WARNING = document.getElementById("add-item-header-warning");
const LOGIN_BUTTON = document.getElementById("login-button");
const LOGIN_WARNING = document.getElementById("login-warning");
const ITEM_TABLE_HEADER_BUTTON = document.getElementById("item-table-header-button");
const ITEM_TABLE_HEADER_WARNING = document.getElementById("item-table-header-warning");

const SUBMIT_USERNAME = document.getElementById("submit-username");
const SUBMIT_PASSWORD = document.getElementById("submit-password");
const SUBMIT_URL = document.getElementById("submit-url");
const AxiosInstance = window.axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

function POSTRequest (paths, options) {
    return new Promise((res, rej) => {
        let response;
        AxiosInstance.post(paths, options)
        .then((axiosRes) => {
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


function trimItems() {
    items.forEach(i => i.name = i.name.trim());
}


function removeAllChildren(parentElement) {
    while(parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild)
    }
}


function removeAllWarnings() {
    [
        LOGIN_WARNING, 
        ADD_ITEM_URL_WARNING, 
        ITEM_TABLE_HEADER_WARNING
    ].forEach(warning => warning.classList.add("invisible"));
}


function loadSessionItems() {
    if(SESSION_ITEMS.firstChild.innerHTML == "PLACEHOLDER") {
        SESSION_ITEMS.classList.add("invisible");
        return;
    }

    removeAllChildren(SESSION_ITEMS);
    items.forEach(i => {
        console.log(i);
        const sessionItem = document.createElement("div");
        sessionItem.classList.add("container-item")
        sessionItem.innerHTML = i.name.substring(0, 20) + "...";
        SESSION_ITEMS.appendChild(sessionItem);
    });
    SESSION_ITEMS.classList.remove("invisible")
}


function DisplayTable() {

}




LOGIN_BUTTON.onclick = () => { 
    ServerAddUser(SUBMIT_USERNAME.value, SUBMIT_PASSWORD.value)
    .then(res => {
        removeAllWarnings();
        loadSessionItems();
        username = res.data.response.username;
        password = res.data.response.password;
        SUBMIT_USERNAME.innerHTML = "";
        SUBMIT_PASSWORD.innerHTML = "";
        SESSION_USERNAME.innerHTML = username;
        SESSION_USERNAME.classList.remove("invisible");
        SESSION_CONTAINER.classList.remove("container-neutral");
        SESSION_CONTAINER.classList.add("container-success");
    }).catch(rej => {
        LOGIN_WARNING.classList.remove("invisible");
    });

}

ADD_ITEM_BUTTON.onclick = () => {
    ServerAddItemToUser(username, password, SUBMIT_URL.value)
    .then(res => {
        removeAllWarnings();
        items = res.data.response.user.items;
        trimItems();
        loadSessionItems();
    }).catch(rej => {
        ADD_ITEM_URL_WARNING.classList.remove("invisible");
    });
}

ITEM_TABLE_HEADER_BUTTON.onclick = () => {
    ServerGetItemsFromUser(username, password)
    .then(res => {

    }).catch(rej => {
        ITEM_TABLE_HEADER_WARNING.classList.remove("invisible");
    });
}

console.log("Hello from frontend!");