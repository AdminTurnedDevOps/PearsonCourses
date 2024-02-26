import radius as radius
param application string

resource demo 'Applications.Core/containers@2023-10-01-preview' = {
  name: 'demo'
  properties: {
    application: application
    container: {
      image: 'ghcr.io/radius-project/tutorial/webapp:edge'
      ports: {
        web: {
          containerPort: 3000
        }
      }
    }
  }
}
