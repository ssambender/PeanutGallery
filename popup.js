let chatOpened = false;

// site domain name
document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length === 0) return;

        let currentTab = tabs[0];
        let hostnameParts = new URL(currentTab.url).hostname.split('.');
        let sitename = hostnameParts.slice(-2).join('.');
        let siteurl = currentTab.url;
        let sitesupported = false;

        document.getElementById('detectedSite').innerText = sitename;
        document.getElementById('detectedSite').title = siteurl;

        if (sitename === "disneyplus.com") {
            console.log(" site -- use disney plus ");
            sitesupported = true;
        }
        else if (siteurl.includes("espn") && siteurl.includes("plus")) {
            console.log(" site -- use espn plus ");
            sitesupported = true;
        }
        else if (sitename === "sambender.net") {
            console.log(" site -- use sambender.net ");
            sitesupported = true;
        }

        document.getElementById('supported-yes').style.display = 'none';
        document.getElementById('supported-no').style.display = 'block';
        document.getElementById('openchat').setAttribute("disabled", "disabled");
        if (sitesupported) {
            document.getElementById('supported-yes').style.display = 'block';
            document.getElementById('supported-no').style.display = 'none';
            document.getElementById('openchat').removeAttribute("disabled");
        }
    });
});

// launch chat overlay
document.getElementById('openchat').addEventListener(('click'), () => {
    if (chatOpened) {
        console.log("CLOSING CHAT!");
        document.getElementById('openchat').innerText = "Open Chat Popup";

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length === 0) return;
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, {"message": "closechat" });
        });
    }
    else {
        console.log("LAUNCHING CHAT!");
        document.getElementById('openchat').innerText = "Close Chat Popup";

        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs.length === 0) return;
            var currentTab = tabs[0];
            chrome.tabs.sendMessage(currentTab.id, {"message": "openchat" });
        });
    }
    chatOpened = !chatOpened;
});


// view settings
document.getElementById('opensettings').addEventListener(('click'), () => {
    console.log("OPEN SETTINGS!");
    document.getElementById('settingsContainer').style.display = 'flex';
});

document.getElementById('closesettings').addEventListener(('click'), () => {
    document.getElementById('settingsContainer').style.display = 'none';
});

// Get the theme and style radio buttons
const themeRadios = document.querySelectorAll('input[name="theme"]');
const styleRadios = document.querySelectorAll('input[name="style"]');

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.setProperty('--main-1', '#222222');
        document.documentElement.style.setProperty('--main-2', '#222222');
        document.documentElement.style.setProperty('--main-3', '#e49935');
        document.documentElement.style.setProperty('--main-4', '#fcd292');
        document.documentElement.style.setProperty('--disabled-opacity', '20%');
    } else if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        document.documentElement.style.setProperty('--main-1', '#fcd292');
        document.documentElement.style.setProperty('--main-2', '#f1ba64');
        document.documentElement.style.setProperty('--main-3', '#e49935');
        document.documentElement.style.setProperty('--main-4', '#735a40');
        document.documentElement.style.setProperty('--disabled-opacity', '50%');
    } else {
        // System theme - dynamically check OS preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light'); // Apply system theme dynamically
    }
}

// Function to save preferences
function savePreferences() {
    let theme = 'system'; // Default theme
    let style = 'classic'; // Default style

    // Determine the selected theme and style
    themeRadios.forEach(radio => {
        if (radio.checked) {
            theme = radio.value;
        }
    });

    styleRadios.forEach(radio => {
        if (radio.checked) {
            style = radio.value;
        }
    });

    // Save the preferences using chrome.storage
    chrome.storage.sync.set({ theme, style }, () => {
        console.log('Preferences saved.');
    });

    // Apply theme immediately
    applyTheme(theme);
}

// Add event listeners to save preferences when changed
themeRadios.forEach(radio => {
    radio.addEventListener('change', savePreferences);
});

styleRadios.forEach(radio => {
    radio.addEventListener('change', savePreferences);
});

document.addEventListener('DOMContentLoaded', function() {
    // Restore preferences
    chrome.storage.sync.get(['theme', 'style'], function(data) {
        const theme = data.theme || 'system';
        const style = data.style || 'classic';

        // Set the selected theme and style
        themeRadios.forEach(radio => {
            if (radio.value === theme) {
                radio.checked = true;
            }
        });

        styleRadios.forEach(radio => {
            if (radio.value === style) {
                radio.checked = true;
            }
        });

        applyTheme(theme);

        // Apply the style (example logic)
        if (style === 'modern') {
            document.documentElement.classList.add('modern-style');
        } else { // Classic style
            document.documentElement.classList.remove('modern-style');
        }
    });
});

/**

 popup html/js:
 if (e.target.id === "blue"){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "blue" });
});
}

 overlay.js:
 chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
 if( request.message === "blue" ) {
     document.body.style.backgroundColor="blue";
     console.log("Content: Changing to blue");
 }
 if( request.message === "black" ) {
     document.body.style.backgroundColor="black";
}

 });

 */