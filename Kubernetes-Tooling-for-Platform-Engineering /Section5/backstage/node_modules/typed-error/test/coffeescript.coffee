chai = require 'chai'
chaiAsPromised = require 'chai-as-promised'

chai.use(chaiAsPromised)
{expect} = chai

{ TypedError } = require '../lib/typed-error'
Promise = require 'bluebird'

class MyError extends TypedError

describe 'coffeescript', ->
	describe 'Standard try/catch', ->
		it 'instanceof', ->
			try
				throw new MyError()
			catch e

			expect(e).to.be.an.instanceof MyError

		it 'name', ->
			try
				throw new MyError()
			catch e

			expect(e).to.have.a.property('name', 'MyError')

		it 'constructor.name', ->
			try
				throw new MyError()
			catch e

			expect(e).to.have.property('constructor').that.has.property('name', 'MyError');

	describe 'Bluebird try/catch', ->
		it 'instanceof', ->
			expect(
				Promise.try ->
					throw new MyError()
				.return(false)
				.catchReturn(MyError, true)
				.catchReturn(false)
			).to.eventually.equal true

		it 'name', ->
			MyErrorName = (e) -> e.name is 'MyError'
			expect(
				Promise.try ->
					throw new MyError()
				.return(false)
				.catchReturn(MyErrorName, true)
				.catchReturn(false)
			).to.eventually.equal true

		it 'constructor.name', ->
			MyErrorConstructorName = (e) -> e.constructor.name is 'MyError'
			expect(
				Promise.try ->
					throw new MyError()
				.return(false)
				.catchReturn(MyErrorConstructorName, true)
				.catchReturn(false)
			).to.eventually.equal true
