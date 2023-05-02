## Cloud Run Setup

1. Log into GCP and go to the Cloud Run pane.

2. Click the blue **CREATE SERVICE** button.

3. Once you reach the service, you'll see that you have to specifiy a container image. This means that you'd have to specifiy a container image that exists in GCR. To avoid having to create one, we can use a public container image that already exists.

In this case, it's the Nginx container image.

Use the container image URL below.

`gcr.io/google-containers/nginx@sha256:f49a843c290594dcf4d193535d1f4ba8af7d56cea2cf79d1e9554f077f1e7aaa`

4. Add the following pieces of information within the same pane as step 3:
- The container name (you can call it `debian`)
- Your specified region
- For autoscaling, you can put the minimum to `1` and the max to `3`
- Allow `all` traffic (this is a demo/test container, not production)
- Allow unauthenticated invocations under the **Authentication** option. This isn't production and we're just seeing how it all works, so we don't have to configure the security needs.

Under the **Container, Networking, and Security** section, change the port from `8080` to `80`.

5. Once complete, click the blue **CREATE** button.

When the container gets fully created, you'll be able to see all of it's stats. You'll also see a URL available. If you click it, it'll bring you to the default Nginx page.