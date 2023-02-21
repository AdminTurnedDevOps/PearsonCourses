1. First, log into the AWS console and go to your EKS cluster.

2. Go to the **Overview** tab and click on **Details**. Copy the OpenID Connect URL.

3. Next, open the AWS IAM service and go to **Identity Providers** —> **Access Management**.

4. Click the blue **Add provider** button.

5. For the provider type, choose OpenID Connect.

6. Paste in the OpenID Connect URL that you copied from the EKS cluster and then click the **Get thumbprint** button.

7. For the Audience, add the following:

```jsx
sts.amazonaws.com
```

8. Once complete, click the blue **Add provider** button.

9. Once added, you’ll see an output that shows the provider. There will be a green box on the screen that indicates you must assign an IAM Role to start using the provider.

10. Click the **Assign role** button and choose the option to **Create a new role**.

11. Choose **Web identity** for the OpenID provider (the provider should already be auto-populated) and then choose the **Audience**. Once complete, click the blue **Next: Permissions** button.

12. The permissions indicate what a Pod is allowed to access in AWS. For example, if the Pod needs to communicate with S3, you could give the role S3 permissions.

13. Click Next through the Tags screen, indicating that you don’t add any tags (although, you can if you’d like).

14. Then, give the Role a name and click the blue **Create role** button.

15. The OIDC provider is now connected.