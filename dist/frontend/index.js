console.log("top");
const doFetch = () => {
    const options = {}
    fetch("/")
        .then(res => console.log(res))
        .catch(rej => console.log("rejected,", rej))
}

const button = document.createElement("button");
button.innerHTML = "Im a button!";
button.onclick(doFetch);

const header = document.getElementById("header");
header.innerHTML = "New Words!"
header.appendChild(button);

console.log("Hello!");