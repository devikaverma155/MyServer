const express = require("express");
const app = express();
const user = require("./MOCK_DATA.json");
const PORT = 8000;
const fs=require('fs');
app.use(express.json());
app.listen(PORT, () => console.log("Listening on " + PORT));

app.get("/user", (req, res) => {
    return res.json(user);
});

app.delete("/users/delete/:id", (req, res) => {
    const userId = parseInt(req.params.id);

    // Find the index of the user with the given ID
    const userIndex = user.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        // Remove the user from the array
        user.splice(userIndex, 1);

        res.status(200).json({ message: "User deleted successfully", user });
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

app.post("/users/post", (req, res) => {
   
        const newUser = req.body;
        console.log("Body", req.body);
        user.push({...newUser,id:user.length+1});
            fs.writeFile('./MOCK_DATA.json',JSON.stringify(user),(err,data)=>
            {
                res.status(201).json({ message: "User added successfully", user });
            })
    
    }
);
 //replace and add new data
 app.put("/users/put/:id", (req, res) => {
    const userId = parseInt(req.params.id || 0);

    // Find the index of the user with the given ID
    const userIndex = user.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
        // User with the specified ID exists, update the user
        const updatedUser = req.body;
        console.log("Body", req.body);

        // Replace the existing user with the updated user
        user[userIndex] = updatedUser;

        res.status(200).json({ message: "User updated successfully", user});
    } else {
        // User with the specified ID does not exist
        res.status(404).json({ message: "User not found" });
    }
});
