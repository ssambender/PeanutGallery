console.log("overlay.js working!");

// Check if the overlay already exists
if (!document.getElementById("sports-chat-overlay")) {
    const overlay = document.createElement("div");
    overlay.id = "sports-chat-overlay";
    overlay.style.position = "fixed"; // Changed from 'absolute' to 'fixed'
    overlay.style.right = "10px";
    overlay.style.bottom = "10px";
    overlay.style.width = "300px";
    overlay.style.height = "400px";
    overlay.style.backgroundColor = "rgba(255,0,0,0.8)";
    overlay.style.borderRadius = "8px";
    overlay.style.padding = "10px";
    overlay.style.color = "white";
    overlay.style.zIndex = "9999"; // Ensure it's on top of other elements
    overlay.innerHTML = "<p>Live Sports Chat</p><div id='chat-box'></div>";

    document.body.appendChild(overlay);
}
