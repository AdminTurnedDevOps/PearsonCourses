# Deploy Backstage and CNOE

10 minutes

## Backstage

1. Download Node version 18
```
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
```

2. Install Node
```
sudo apt install nodejs
```

**If you're on Mac: https://formulae.brew.sh/formula/node@18**
**If you're on Windows: https://community.chocolatey.org/packages/nodejs/18.11.0**

3. Create/deploy the Backstage app. You'll be prompted to give it a name. Name is `k8sbackstage`
```
npx @backstage/create-app
```

4. `cd` in the backstage app
```
cd k8sbackstage
```

5. Run Backstage
```
yarn dev
```

## CNOE

To run CNOE, you'll need Docker running on your desktop or a Kubernetes cluster in your current context.

1. Run the following to Download idpbuilder
```
curl -fsSL https://raw.githubusercontent.com/cnoe-io/idpbuilder/main/hack/install.sh | bash
```

2. Run the following command

```
idpbuilder create
```