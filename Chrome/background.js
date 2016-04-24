
        
function checkIfBlocked(request, sender, sendResponse) {
    
    var unblock = false;
    var newblocklist = "";
    
    if (request.type == "reset") {
        resetBlockList();
        return;
    } else if (request.type == "unblock_next") {
        unblock = true;
    } else {
        unblock = false;
    }
    
    if (request.url == null || request.url == "") {
        return;
    }
    
    //Look up list of blocked items.
    var blocked = localStorage["blocked"];
    
    //If nothing is blocked, set to default.
    if (blocked == null) {
        resetBlockList();
        blocked = localStorage["blocked"];
    }
    
    if (blocked == "|") {
        return;
    }
    
    //Get an array of blocked items.
    var blocked_sites = blocked.split('|');
    
    //Get hostname passed to us from the content script.
    var hostname = request.url;
    
    //For each blocked hostname.
    for (var i = 0 ; i < blocked_sites.length; i ++) {      
        //If any of the blocked hostnames are contained within the page hostname then respond to content script to block page.
        if (blocked_sites[i] != null && blocked_sites[i].indexOf('.') > -1 && hostname.indexOf(blocked_sites[i]) > -1) {
            
            if (!unblock) {
                //Respond to content script with block.
                sendResponse({url: hostname});
            }
        } else {
            newblocklist += ("|" + blocked_sites[i]);
        }
    }
    
    if (unblock) {
        localStorage["blocked"] = newblocklist;
    }

};

function resetBlockList() {
    localStorage["blocked"] = "|CNP|bigtennetwork.com|foxbusiness.com|thefoxmoviechannel.com|foxnews.com|foxcable.com|foxsports.com|foxsportsesp.com|foxsoccer.com|fuel.tv|fxnetworks.com|animals.nationalgeographic.com|nationalgeographic.com|natgeotv.com|speedtv.com|startv.com|stats.com|TV|foxsports.com.au|mynetworktv.com|myfoxny.com|my9tv.com|myfoxla.com|my13la.com|myfoxchicago.com|my50chicago.com|myfoxphilly.com|myfoxboston.com|myfoxdfw.com|watchmy27.com|myfoxdc.com|upn20dc.com|myfoxtwincities.com|my29tv.com|myfoxdetroit.com|myfoxatlanta.com|my24wutb.com|myfoxhouston.com|my20houston.com|myfoxtampabay.com|myfoxorlando.com|myfoxphoenix.com|my45.com|myfoxmemphis.com|myfoxaustin.com|wogx.com|PUB|alphamagazine.com.au|dailytelegraph.com.au|donnahay.com.au|dowjones.com|goldcoast.com.au|harpercollins.com|harpercollins.com.au|harpercollins.ca|harpercollinschildrens.com|harpercollins.co.in|harpercollins.co.nz|harpercollins.co.uk|heraldsun.com.au|homelife.com.au|nypost.com|newsamerica.com|newsint.co.uk|newsoftheworld.co.uk|ntnews.com.au|postcourier.com.pg|smartsource.net|sundayheraldsun.com.au|adelaidenow.com.au|sundaytasmanian.com.au|perthnow.com.au|theadvertiser.news.com.au|theaustralian.com.au|couriermail.com.au|thedaily.com|themercury.com.au|thesundaymail.com.au|telegraph.co.uk|thesun.co.uk|thesundaytimes.co.uk|thetimes.co.uk|timesonline.co.uk|wsj.com|weeklytimesnow.com.au|zondervan.com";
}


chrome.extension.onRequest.addListener(checkIfBlocked);
//chrome.tabs.onUpdated.addListener(checkForValidUrl);

