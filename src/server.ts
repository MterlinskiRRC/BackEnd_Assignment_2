import app from "./app";
import { Server } from "http";

// Port from environment variable or default to 3000
const PORT: string | number = process.env.PORT || 3000;

// Start the Express server and listen on the specified port
const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export { server };