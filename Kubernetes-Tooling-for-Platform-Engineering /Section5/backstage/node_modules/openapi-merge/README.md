# openapi-merge

This library assumes that you have a number of microservices that you wish to expose through one main service or gateway.

With this assumption in mind, it allows you to provide multiple OpenAPI 3.0 files and have them be merged together, in a 
deterministic manner, into a single OpenAPI specification.

Many of the design decisions of this library have that use case in mind and thus the features will be geared to making that
be a good experience.

If you are looking for a CLI tool based on this library, then please check out: [![npm](https://img.shields.io/npm/v/openapi-merge-cli?label=openapi-merge-cli&logo=npm)](https://bit.ly/3bEVq3f)

## How to use this library

This library is intended to be used in a JavaScript or Typescript project. Here is a Typescript example that will work 100%:

``` typescript
import { merge, isErrorResult } from 'openapi-merge';
import { Swagger } from 'atlassian-openapi';

// Does not have to use the 'SwaggerV3' type, the merge function will accept 'any' so long as the underlying object is valid
const oas1: Swagger.SwaggerV3 = {
  openapi: "3.0.2",
  info: {
    title: "First Input",
    description: "Merge conflicts often use the first element",
    version: "1.0"
  },
  paths: {
    "/cats": {
      get: {
        summary: 'Get the cats',
        responses: {
          200: {
            description: "All of the cats"
          }
        }
      }
    }
  }
};

const oas2: Swagger.SwaggerV3 = {
  openapi: "3.0.2",
  info: {
    title: "Second Input",
    version: "1.0"
  },
  paths: {
    "/dogs": {
      get: {
        summary: 'Get the dogs',
        responses: {
          200: {
            description: "All of the dogs"
          }
        }
      }
    }
  }
};

function main() {
  const mergeResult = merge([{
    oas: oas1,
    pathModification: {
      prepend: '/one'
    }
  }, {
    oas: oas2,
    pathModification: {
      prepend: '/two'
    }
  }]);

  if (isErrorResult(mergeResult)) {
    // Oops, something went wrong
    console.error(`${mergeResult.message} (${mergeResult.type})`);
  } else {
    console.log(`Merge successful!`);
    console.log(JSON.stringify(mergeResult.output, null, 2));
  }
}

main();
```

If you wish to play around with this example further, then please [fork this Repl](https://replit.com/@RobertMassaioli/openapi-merge-Example?v=1). 

## Merging Behaviour

We process the inputs sequentially such that the first input in the list takes preference and subsequent inputs will be 
modified to merge seamlessly into the first.

For some parts of the OpenAPI file, like `paths`, `components` and `tags` we attempt to merge the definitions together 
such that there are no overlaps and no information is dropped.

However, for other elements of the OpenAPI files, the algorithm simply takes the value that is first defined in the list of
OpenAPI files. Examples of elements of the OpenAPI files that follow this pattern are:

 - Info
 - Servers
 - Security Schemes
 - ExternalDocumentation

The intention here is that the first file will define these elements and effectively override them from the other files. This 
matches the "API gateway" use case that we have mentioned previously whereby we probably want these definitions to be specific to
the API gateway and thus override the top level definitions from other inputs.
