# @swagger-api/apidom-ns-workflows-1

`@swagger-api/apidom-ns-workflows-1` contains ApiDOM namespace specific to [Workflows 1.0.0 specification](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md).

## Installation

You can install this package via [npm CLI](https://docs.npmjs.com/cli) by running the following command:

```sh
 $ npm install @swagger-api/apidom-ns-workflows-1
```

## Workflows 1.0.0 namespace

Workflows 1.0.0 namespace consists of [number of elements](https://github.com/swagger-api/apidom/tree/main/packages/apidom-ns-worfklows-1/src/elements) implemented on top
of [primitive ones](https://github.com/refractproject/minim/tree/master/lib/primitives).

```js
import { createNamespace } from '@swagger-api/apidom-core';
import workflows1Namespace from '@swagger-api/apidom-ns-workflows-1';

const namespace = createNamespace(workflows1Namespace);

const objectElement = new namespace.elements.Object();
const workflowsElement = new namespace.elements.WorkflowsSpecification1();
```

When namespace instance is created in this way, it will extend the base namespace
with the namespace provided as an argument.

Elements from the namespace can also be used directly by importing them.

```js
import { WorkflowsSpecification1Element, InfoElement } from '@swagger-api/apidom-ns-workflows-1';

const infoElement = new InfoElement();
const workflowsElement = new WorkflowsSpecification1Element();
```

## Predicates

This package exposes [predicates](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-workflows-1/src/predicates.ts)
for all higher order elements that are part of this namespace.

```js
import { isWorkflowsSpecification1Element, WorkflowsSpecification1Element } from '@swagger-api/apidom-ns-workflows-1';

const workflowsElement = new WorkflowsSpecification1Element();

isWorkflowsSpecification1Element(workflowsElement); // => true
```

## Traversal

Traversing ApiDOM in this namespace is possible by using `visit` function from `apidom` package.
This package comes with its own [keyMap](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-workflows-1/src/traversal/visitor.ts) and [nodeTypeGetter](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ns-workflows-1/src/traversal/visitor.ts).
To learn more about these `visit` configuration options please refer to [@swagger-api/apidom-ast documentation](https://github.com/swagger-api/apidom/blob/main/packages/apidom-ast/README.md#visit).

```js
import { visit } from '@swagger-api/apidom-core';
import { WorkflowsSpecification1Element, keyMap, getNodeType } from '@swagger-api/apidom-ns-workflows-1';

const element = new WorkflowsSpecification1Element();

const visitor = {
  WorkflowsSpecification1Element(workflowsElement) {
    console.dir(workflowsElement);
  },
};

visit(element, visitor, { keyMap, nodeTypeGetter: getNodeType });
```

## Refractors

Refractor is a special layer inside the namespace that can transform either JavaScript structures
or generic ApiDOM structures into structures built from elements of this namespace.

**Refracting JavaScript structures**:

```js
import { InfoElement } from '@swagger-api/apidom-ns-workflows-1';

const object = {
    title: 'my title',
    summary: 'my summary',
    description: 'my description',
    version: '0.1.0',
};

InfoElement.refract(object); // => InfoElement({ title, summary, description, version })
```

**Refracting generic ApiDOM structures**:

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-workflows-1';

const objectElement = new ObjectElement({
    title: 'my title',
    summary: 'my summary',
    description: 'my description',
    version: '0.1.0',
});

InfoElement.refract(objectElement); // => InfoElement({ title = 'my title', summary = 'my summary', description = 'my description', version = '0.1.0' })
```

### Refractor plugins

Refractors can accept plugins as a second argument of refract static method.

```js
import { ObjectElement } from '@swagger-api/apidom-core';
import { InfoElement } from '@swagger-api/apidom-ns-workflows-1';

const objectElement = new ObjectElement({
    title: 'my title',
    summary: 'my summary',
    description: 'my description',
    version: '0.1.0',
});

const plugin = ({ predicates, namespace }) => ({
  name: 'plugin',
  pre() {
      console.dir('runs before traversal');
  },
  visitor: {
    InfoElement(infoElement) {
      infoElement.version = '2.0.0';
    },
  },
  post() {
      console.dir('runs after traversal');
  },
});

InfoElement.refract(objectElement, { plugins: [plugin] }); // => InfoElement({ title = 'my title', description = 'my description', version = '2.0.0' })
```

You can define as many plugins as needed to enhance the resulting namespaced ApiDOM structure.
If multiple plugins with the same visitor method are defined, they run in parallel (just like in Babel).

#### Replace Empty Element plugin

This plugin is specific to YAML 1.2 format, which allows defining key-value pairs with empty key,
empty value, or both. If the value is not provided in YAML format, this plugin compensates for
this missing value with the most appropriate semantic element type.

```js
import { parse } from '@swagger-api/apidom-parser-adapter-yaml-1-2';
import { refractorPluginReplaceEmptyElement, WorkflowsSpecification1Element } from '@swagger-api/apidom-ns-workflows-1';

const yamlDefinition = `
workflows: 1.0.0
info:
`;
const apiDOM = await parse(yamlDefinition);
const workflowsElement = WorkflowsSpecification1Element.refract(apiDOM.result, {
  plugins: [refractorPluginReplaceEmptyElement()],
});

// =>
// (WorkflowsSpecification1Element
//   (MemberElement
//     (StringElement)
//     (StringElement))
//   (MemberElement
//     (StringElement)
//     (InfoElement)))

// => without the plugin the result would be as follows:
// (WorkflowsSpecification1Element
//   (MemberElement
//     (StringElement)
//     (StringElement))
//   (MemberElement
//     (StringElement)
//     (StringElement)))
```

## Implementation progress

Only fully implemented specification objects should be checked here.

- [x] [Workflows Specification Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#workflows-specification-object)
- [x] [Info Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#info-object)
- [x] [Source Description Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#source-description-object)
- [x] [Workflow Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#workflow-object)
- [x] [Step Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#step-object)
- [x] [Parameter Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#parameter-object)
- [x] [Success Action Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#success-action-object)
- [x] [Failure Action Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#failure-action-object)
- [x] [Component Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#component-object)
- [x] [Criterion Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#criterion-object)
- [x] [Reference Object](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#reference-object)
- [x] [JSON Schema](https://json-schema.org/specification-links#2020-12)
- [x] [Specification extensions](https://github.com/OAI/sig-workflows/blob/main/versions/1.0.0.md#specification-extensions)
