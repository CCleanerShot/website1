const doFetch = () => {
    const options = {}
    fetch("/")
        .then(res => console.log(res))
        .catch(rej => console.log("rejected,", rej))
}

const button = document.createElement("button");
button.onclick(doFetch);

document.appendChild(button);