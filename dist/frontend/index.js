const baseURL = "https://98.57.186.27:3000/"
const paths = "/"
const headers = {}
const AxiosInstance = window.axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

const doFetch = (paths = "") => {
    const options = {}
    
    AxiosInstance.get(
        paths, 
        {headers: headers},
    ).then((res) => {
        console.log(res);
    }).catch(rej => {
        console.log(rej);
    })


}

const button = document.createElement("button");
button.innerHTML = "Im a button!";
button.onclick = doFetch();
button.style.border = "1px solid red"

const header = document.getElementById("header");
header.innerHTML = "New Words!"
header.appendChild(button);

console.log("Hello from frontend!");