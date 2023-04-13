"use strict";
const form = document.getElementById("uv-form");
const input = document.getElementById("uv-address");

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await registerSW();
  } catch (err) {
	alert("An error occured. Check your console for more info.");
    throw err;
  }

  let url = input.value.trim();
  if (!isUrl(url)) url = "https://www.google.com/search?q=" + url;
  else if (!(url.startsWith("https://") || url.startsWith("http://")))
  url = "http://" + url;
  window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url);
  
});
