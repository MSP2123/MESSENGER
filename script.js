let username = "";
let friends = {};
let currentChatFriend = "";

function createUsername() {
    const usernameInput = document.getElementById("usernameInput").value;
    if (usernameInput) {
        username = usernameInput;
        document.getElementById("loginSection").style.display = "none";
        document.getElementById("friendsSection").style.display = "block";
    } else {
        alert("Please enter a username.");
    }
}

function addFriend() {
    const friendUsername = document.getElementById("friendUsernameInput").value;
    if (friendUsername && friendUsername !== username && !friends[friendUsername]) {
        friends[friendUsername] = [];
        updateFriendsList();
    } else {
        alert("Invalid username or username already added.");
    }
}

function updateFriendsList() {
    const friendsList = document.getElementById("friendsList");
    friendsList.innerHTML = "";
    for (const friend in friends) {
        const friendElement = document.createElement("div");
        friendElement.textContent = friend;
        friendElement.onclick = () => openChat(friend);
        friendsList.appendChild(friendElement);
    }
}

function openChat(friend) {
    currentChatFriend = friend;
    document.getElementById("friendsSection").style.display = "none";
    document.getElementById("chatSection").style.display = "block";
    document.getElementById("chatWith").textContent = friend;
    updateChatBox();
}

function sendMessage() {
    const messageInput = document.getElementById("messageInput").value;
    if (messageInput) {
        friends[currentChatFriend].push({ from: username, message: messageInput });
        document.getElementById("messageInput").value = "";
        updateChatBox();
    } else {
        alert("Please enter a message.");
    }
}

function updateChatBox() {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = "";
    const chatMessages = friends[currentChatFriend];
    for (const msg of chatMessages) {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${msg.from}: ${msg.message}`;
        chatBox.appendChild(messageElement);
    }
}
