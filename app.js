const http = require("http");

const users = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 182, name: "Tom" },
  { id: 777, name: "Duck" },
];

//"/api/users/1", "/api/users/142356", "/api/users/51", "/api/users/2"
//capturing group to get the ending number
const regexUserQuery = /^\/api\/users\/(\d+)$/;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Testing root");
    res.end();
  }

  if (req.url === "/api/users") {
    res.write(JSON.stringify(users));
    res.end();
  }

  if (regexUserQuery.test(req.url)) {
    const match = regexUserQuery.exec(req.url);
    const userId = match[1];
    const user = getUserResource(userId);
    let resStringUserInfo;
    if (!user) {
      resStringUserInfo = JSON.stringify("No user found");
    } else {
      resStringUserInfo = JSON.stringify(user);
    }
    res.write("user query received: " + userId + "\n" + resStringUserInfo);
    res.end();
  }
});

function getUserResource(userId) {
  console.log("searching for user: " + userId);
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      return users[i];
    }
  }

  return null; // Return null if no user is found.
}

function init(port) {
  if (isNaN(port)) {
    return;
  } else {
    server.listen(port);
    console.log("listening on port 3000....");
  }
}

server.on("connection", (socket) => {
  console.log("new connection");
});

init(3000);
