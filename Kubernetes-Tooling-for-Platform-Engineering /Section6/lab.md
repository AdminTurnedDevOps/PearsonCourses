# Deploy Kratix and Radius

10 minutes

## Kratix

1. Open up the Kratix directory in Section6

2. Install the dependencies in `dependencies.sh`

3. Install Kratix in `kratix.sh`

4. Deploy the promise in `promise.yaml`

## Radius

1. Install the Radius CLI: https://docs.radapp.io/installation/

2. Create a new directory to house the Radius app
```
mkdir radapp
```

3. `cd` into the new directory and initialize the app
```
rad init
```

4. Add the `test.bicep` file from Section6 > radius into the `radapp` directory

5. Deploy the app
```
rad deploy test.bicep
```