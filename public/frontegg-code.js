console.log("===== Frontegg Code - module =====");

import {initialize} from "@frontegg/js"

const style = document.createElement('style');
style.setAttribute('type', 'text/css');
style.innerHTML = '';
document.getElementsByTagName('head')[0].appendChild(style);


const app = initialize({
  contextOptions: {
    baseUrl: "https://YOUR_DOMAIN.frontegg.com", //set your Frontegg environment domain and client ID here
    clientId: 'YOUR_FRONTEGG_CLIENT_ID'
  },
  hostedLoginBox: true
})

document.getElementById("loginWithRedirect").addEventListener('click', () => {
  app.loginWithRedirect()
})

document.getElementById("logout").addEventListener('click', () => {
  app.logout()
})