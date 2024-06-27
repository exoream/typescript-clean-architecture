import { routes } from "./app/routes/route";

routes.listen(8080, () => {
  console.log("Server is running on port 8080");
});
