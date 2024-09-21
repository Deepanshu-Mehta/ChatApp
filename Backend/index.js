const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/Database.js")
const userRoute = require("./Routes/userRoute.js");
const messageRoute = require("./Routes/messageRouter.js");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { app, server } = require("./socket/socket.js");


dotenv.config();
const App = express();
const PORT = process.env.PORT || 5000;

// middleware
App.use(express.urlencoded({ extended: true }));
App.use(express.json());
App.use(cookieParser());
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
};
App.use(cors(corsOption));

// routes
App.use("/api/v1/user", userRoute);
App.use("/api/v1/message", messageRoute);

// server.listen(PORT, () => {
//     connectDB();
//     console.log(`Server listening at port ${PORT}`);
// });

App.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});
