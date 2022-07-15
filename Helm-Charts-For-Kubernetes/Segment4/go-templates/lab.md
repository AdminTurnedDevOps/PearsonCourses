# Helm Chart Pipelines

The purpose of this lab is to use some of the functions that you learned about in this section to create a Helm Chart and update values of the Helm Chart with pipeline values

1. Create a Helm Chart
`helm create nginxpipelines`

2. Open up the Helm Chart and go to templates --> `deployment.yaml`

3. Replace line 6 of the `deployment.yaml` with the following:
`{{- include "nginxpipelines.labels" . | nindent 4 | lower }}`

This code ensures that the labels are all lower case, per the `lower` pipeline because per best practices and standards, lowercase RFC 1123 subdomain must consist of lower case alphanumeric characters, so you want to ensure that your labels are lowercase.

4. Run the following to install the Helm Chart
`helm install nginxupdate .`

5. Clean up
`helm uninstall nginxupdate`