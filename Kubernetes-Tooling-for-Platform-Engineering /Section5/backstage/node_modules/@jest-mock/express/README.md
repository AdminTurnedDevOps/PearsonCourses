# @jest-mock/express

A lightweight Jest mock for unit testing Express

[![Build and Test](https://github.com/bikk-uk/jest-mock-express/actions/workflows/build-test.yml/badge.svg?branch=master)](https://github.com/bikk-uk/jest-mock-express/actions/workflows/build-test.yml)
[![Coverage Status](https://coveralls.io/repos/github/bikk-uk/jest-mock-express/badge.svg?branch=master)](https://coveralls.io/github/bikk-uk/jest-mock-express?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/bikk-uk/jest-mock-express/badge.svg?targetFile=package.json)](https://snyk.io/test/github/bikk-uk/jest-mock-express?targetFile=package.json)
![GitHub package.json version](https://img.shields.io/github/package-json/v/bikk-uk/jest-mock-express?label=github)
![npm](https://img.shields.io/npm/v/@jest-mock/express)
![NPM](https://img.shields.io/npm/l/@jest-mock/express)

## Getting Started

Installation:

`yarn add --dev @jest-mock/express`

`npm install --save-dev @jest-mock/express`

Importing:

```typescript
import { getMockReq, getMockRes } from '@jest-mock/express'
```

## Usage

### Request - `getMockReq`

`getMockReq` is intended to mock the `req` object as quickly as possible. In its simplest form, you can call it with no arguments to return a standard `req` object with mocked functions and default values for properties.

```typescript
const req = getMockReq()
```

To create a mock `req` with provided values, you can pass them to the function in any order, with all being optional. The advantage of this is that it ensures the other properties are not `undefined`. Loose type definitions for standard properties are provided, custom properties (`[key: string]: any`) will be passed through to the returned `req` object.

```typescript
// an example GET request to retrieve an entity
const req = getMockReq({ params: { id: '123' } })
```

```typescript
// an example PUT request to update a person
const req = getMockReq({
  params: { id: 564 },
  body: { firstname: 'James', lastname: 'Smith', age: 34 },
})
```

For use with extended Requests, `getMockReq` supports generics.

```typescript
interface AuthenticatedRequest extends Request {
  user: User
}

const req = getMockReq<AuthenticatedRequest>({ user: mockUser })

// req.user is typed
expect(req.user).toBe(mockUser)
```

### Response - `getMockRes`

`getMockRes` will return a mocked `res` object with Jest mock functions. Chaining has been implemented for the applicable functions.

```typescript
const { res, next, clearMockRes } = getMockRes()
```

All of the returned mock functions can be cleared with a single call to `mockClear`. An alias is also provided called `clearMockRes`.

```typescript
const { res, next, mockClear } = getMockRes()

beforeEach(() => {
  mockClear() // can also use clearMockRes()
})
```

It will also return a mock `next` function for convenience. `next` will also be cleared as part of the call to `mockClear`/`clearMockRes`.

To create mock responses with provided values, you can provide them to the function in any order, with all being optional. Loose type definitions for standard properties are provided, custom properties (`[key: string]: any`) will be passed through to the returned `res` object.

```typescript
const { res, next, clearMockRes } = getMockRes({
  locals: {
    user: getLoggedInUser(),
  },
})
```

For use with extended Responses, `getMockRes` supports generics.

```typescript
interface CustomResponse extends Response {
  locals: {
    sessionId?: string
    isPremiumUser?: boolean
  }
}

const { res } = getMockRes<CustomResponse>({
  locals: {
    sessionId: 'abcdef',
    isPremiumUser: false,
  },
})

// res.locals is typed
expect(res.locals.sessionId).toBe('abcdef')
expect(res.locals.isPremiumUser).toBe(false)
```

## Example

A full example to test a controller could be:

```typescript
// generate a mocked response and next function, with provided values
const { res, next } = getMockRes({
  locals: {
    isPremiumUser: true,
  },
})

test('will respond with the entity from the service', async () => {
  // generate a mock request with params
  const req = getMockReq({ params: { id: 'abc-def' } })

  // provide the mock req, res, and next to assert
  await myController.getEntity(req, res, next)

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 'abc-def',
    }),
  )
  expect(next).toBeCalled()
})
```
