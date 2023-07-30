const baseURL = "http://localhost:3000/"
const paths = "/"
const headers = {}

const HEADER = document.getElementById("header");
const SUBMIT_INPUT = document.getElementById("submit-input");
const SUBMIT_BUTTON = document.getElementById("submit-button");
const AxiosInstance = window.axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

function doFetchPrice (paths = "", productURL = "") {
    console.log(`sending ${productURL}...`);
    const data = {
        productURL: productURL
    };
    
    AxiosInstance.post(paths, data)
    .then((res) => {
        console.log(res)
    }).catch(rej => {
        console.log(rej);
    })
}



SUBMIT_BUTTON.onclick = () => { doFetchPrice("findItem", SUBMIT_INPUT.value); };
SUBMIT_BUTTON.style.border = "1px solid red"

HEADER.innerHTML = "Header Words!";

console.log("Hello from frontend!");