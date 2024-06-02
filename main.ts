import app from "./app";

function main() {
  try {
    app.listen(8080, () => {
      console.log("Server running at port 8080");
    });
  } catch (error) {
    console.log("Error: ", error);
  }
}

main();

export default main;
