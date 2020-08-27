function number() {
    var div = document.createElement("div");
    div.setAttribute("id", "number");
    div.innerHTML = 30000 + 1000;
    document.body.appendChild(div);
}
export default number;