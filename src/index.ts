import app from "./app";
import "./database";

const server  = app.listen(app.get("port"));
console.log("Server running on port: ", app.get("port"));

export default server