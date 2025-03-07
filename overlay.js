console.log("overlay.js working!");
const peanut = (`
                  ▒▒▒▒▒▒▒▒▒▒
               ▒▒░░▒▒░▒▒░▒░░▒▒             currently running:
              ▒▒░░░▒░░▒░░▒░░░░▒
             ▒░░░▒░▒▒░▒▒░▒▒░▒░▒▒     _____                       _
            ▒░░░▒░░▒░░▒░░▒░░▒░░▒    |  __ \\                     | |
         ▒▒▒░░░░░░░░░░░░░░░░░░░▒    | |__) |__  __ _ _ __  _   _| |_
     ▒▒▒▒░░▒░▒▒░▒▒░▒▒░▒▒░▒▒░▒░▒▒    |  ___/ _ \\/ _\` | '_ \\| | | | __|
   ▒▒░░▒░░▒░░▒░░▒░░▒░░▒░░▒░░░▒▒     | |  |  __/ (_| | | | | |_| | |_
  ▒░░░░░░░░░░░░░░░░░░░░░░░░▒▒       |_|   \\___|\\__,_|_| |_|\\__,_|\\__|
▒▒░░▒▒░▒▒░▒▒░▒▒░▒▒░▒▒░░░▒▒            _____       _ _
▒░░░▒░░▒░░▒░░▒░░▒░░▒░░▒              / ____|     | | |
▒░░░░░░░░░░░░░░░░░░░▒▒              | |  __  __ _| | | ___ _ __ _   _
▒░░░▒░░▒░░▒░░▒░░▒░░░▒               | | |_ |/ _\` | | |/ _ \\ '__| | | |
 ▒░░░░░░░░░░░░░░░░░▒                | |__| | (_| | | |  __/ |  | |_| |
  ▒░▒▒░▒▒░▒▒░▒▒░░▒▒                  \\_____|\\__,_|_|_|\\___|_|   \\__, |
   ▒▒░░▒░░▒░░░░▒▒▒                                               __/ |
      ▒▒▒▒▒▒▒▒▒                                                 |___/
      
                        Sam Bender 2025 - sambender.net
`);
console.log("%c" + peanut, "color:" + '#F1BA64' + ";font-weight:bold;");
//console.log("%c" + "Sam Bender 2025 - sambender.net", "color:" + '#F1BA64' + ";");


// Check if the overlay already exists
if (!document.getElementById("chat-overlay")) {
    const overlay = document.createElement("div");
    overlay.id = "chat-overlay";
    overlay.style.position = "fixed";
    overlay.style.right = "10px";
    overlay.style.bottom = "10px";
    overlay.style.minWidth = "300px";
    overlay.style.minHeight = "400px";
    overlay.style.backgroundColor = "#222222";
    overlay.style.color = "#fcd292";
    overlay.style.fontFamily = "monospace";
    overlay.style.borderRadius = "8px";
    overlay.style.padding = "10px";
    overlay.style.zIndex = "9999";
    overlay.style.flexDirection = "column";
    overlay.style.display = "none";
    overlay.style.border = "solid 4px #e49935"
    overlay.style.borderRadius = "12px";

    const parentUrl = window.location.hostname;

    overlay.innerHTML = `
<p>PeanutGallery Live Chat</p><div id='chat-box'></div>
<iframe src="https://www.twitch.tv/embed/SamIsSquam/chat?parent=${parentUrl}"
        height="500"
        width="350">
</iframe>
`;

    document.body.appendChild(overlay);
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if( request.message === "openchat" ) {
        document.getElementById("chat-overlay").style.display = "flex";
    }

    if( request.message === "closechat" ) {
        document.getElementById("chat-overlay").style.display = "none";
    }
});