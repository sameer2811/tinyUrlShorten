import { createApp } from "./app";
import { SERVER_CONFIG } from "./src/config/serverConfig";

const app = createApp();

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server running on port ${SERVER_CONFIG.PORT}`);
});