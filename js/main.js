var select = document.querySelector("#select");
var options = document.querySelectorAll("option");
var hash_input = document.querySelector("#hash-input");
var output = document.querySelector("#output");
var output_hash = document.querySelector("#output-hash");
var copy = document.querySelector("#copy");
chrome.storage.local.get(["hash_type"], (result) => {
    if (!result) {
       chrome.storage.local.set({"hash_type": "SHA1"});
    }
 });
chrome.storage.local.get(["hash_type"], (result) => {
   if (result.hash_type) {
      options.forEach((res)=> {
         if (res.value == result.hash_type) {
            res.selected = true;
         }
      });
   }
});
window.onload = () => {
    hash_input.focus();
}
select.addEventListener("change",() => {
   var hash_type = select.value;
   chrome.storage.local.set({"hash_type": hash_type});
});
hash_input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
       copy.innerText = "Copy";
       var text = hash_input.value;
       chrome.storage.local.get(["hash_type"], (result) => {
          var hash = CryptoJS[result.hash_type](text).toString(CryptoJS.enc.Hex);
          output_hash.value = hash;
          output.style.display = "block";
       })
    }
});
copy.addEventListener("click", () => {
   navigator.clipboard.writeText(output_hash.value);
   copy.innerText = "Copied!";
});