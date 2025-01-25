import AggregateError from "aggregate-error";
function getPayload(request) {
  if (request.body) {
    if (typeof request.body !== "string") {
      console.warn(
        "[@octokit/webhooks] Passing the payload as a JSON object in `request.body` is deprecated and will be removed in a future release of `@octokit/webhooks`, please pass it as a a `string` instead."
      );
    }
    return Promise.resolve(request.body);
  }
  return new Promise((resolve, reject) => {
    let data = "";
    request.setEncoding("utf8");
    request.on("error", (error) => reject(new AggregateError([error])));
    request.on("data", (chunk) => data += chunk);
    request.on("end", () => {
      try {
        JSON.parse(data);
        resolve(data);
      } catch (error) {
        error.message = "Invalid JSON";
        error.status = 400;
        reject(new AggregateError([error]));
      }
    });
  });
}
export {
  getPayload
};
