// Tested Module
import getMockRes from '../../../response/response'

describe('response - Defaults for "stream.Writable" (accepts no arguments and return default values)', () => {
  test('res.writable is a boolean', () => {
    const { res } = getMockRes()

    expect(res.writable).toBeDefined()
    expect(res.writable).toEqual(false)
  })

  test('res.writableEnded is a boolean', () => {
    const { res } = getMockRes()

    expect(res.writableEnded).toBeDefined()
    expect(res.writableEnded).toEqual(false)
  })

  test('res.writableFinished is a boolean', () => {
    const { res } = getMockRes()

    expect(res.writableFinished).toBeDefined()
    expect(res.writableFinished).toEqual(false)
  })

  test('res.writableHighWaterMark is a number', () => {
    const { res } = getMockRes()

    expect(res.writableHighWaterMark).toBeDefined()
    expect(res.writableHighWaterMark).toEqual(0)
  })

  test('res.writableLength is a number', () => {
    const { res } = getMockRes()

    expect(res.writableLength).toBeDefined()
    expect(res.writableLength).toEqual(0)
  })

  test('res.writableObjectMode is a boolean', () => {
    const { res } = getMockRes()

    expect(res.writableObjectMode).toBeDefined()
    expect(res.writableObjectMode).toEqual(false)
  })

  test('res.writableCorked is a number', () => {
    const { res } = getMockRes()

    expect(res.writableCorked).toBeDefined()
    expect(res.writableCorked).toEqual(0)
  })

  test('res.destroyed is a boolean', () => {
    const { res } = getMockRes()

    expect(res.destroyed).toBeDefined()
    expect(res.destroyed).toEqual(false)
  })

  test('res._write is a mocked function', () => {
    const { res } = getMockRes()

    expect(res._write).toBeDefined()
    expect(typeof res._write).toBe('function')
    expect((res._write as jest.Mock).getMockName()).toBe('_write mock default')
  })

  test('res._write is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res._write({}, 'base64', jest.fn())).toBeUndefined()
  })

  test('res._writev is a mocked function', () => {
    const { res } = getMockRes()

    expect(res._writev).toBeDefined()
    expect(typeof res._writev).toBe('function')
    expect((res._writev as jest.Mock).getMockName()).toBe('_writev mock default')
  })

  test('res._writev is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res._writev && res._writev([], jest.fn())).toBeUndefined()
  })

  test('res._destroy is a mocked function', () => {
    const { res } = getMockRes()

    expect(res._destroy).toBeDefined()
    expect(typeof res._destroy).toBe('function')
    expect((res._destroy as jest.Mock).getMockName()).toBe('_destroy mock default')
  })

  test('res._destroy is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res._destroy(null, jest.fn())).toBeUndefined()
  })

  test('res._final is a mocked function', () => {
    const { res } = getMockRes()

    expect(res._final).toBeDefined()
    expect(typeof res._final).toBe('function')
    expect((res._final as jest.Mock).getMockName()).toBe('_final mock default')
  })

  test('res._final is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res._final(jest.fn())).toBeUndefined()
  })

  test('res.write is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.write).toBeDefined()
    expect(typeof res.write).toBe('function')
    expect((res.write as jest.Mock).getMockName()).toBe('write mock default')
  })

  test('res.write is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res.write({}, jest.fn())).toBeUndefined()
  })

  test('res.setDefaultEncoding is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.setDefaultEncoding).toBeDefined()
    expect(typeof res.setDefaultEncoding).toBe('function')
    expect((res.setDefaultEncoding as jest.Mock).getMockName()).toBe('setDefaultEncoding mock default')
  })

  test('res.setDefaultEncoding is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.setDefaultEncoding('base64')).toBe(res)
  })

  test('res.end is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.end).toBeDefined()
    expect(typeof res.end).toBe('function')
    expect((res.end as jest.Mock).getMockName()).toBe('end mock default')
  })

  test('res.end is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res.end()).toBeUndefined()
  })

  test('res.cork is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.cork).toBeDefined()
    expect(typeof res.cork).toBe('function')
    expect((res.cork as jest.Mock).getMockName()).toBe('cork mock default')
  })

  test('res.cork is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res.cork()).toBeUndefined()
  })

  test('res.uncork is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.uncork).toBeDefined()
    expect(typeof res.uncork).toBe('function')
    expect((res.uncork as jest.Mock).getMockName()).toBe('uncork mock default')
  })

  test('res.uncork is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res.uncork()).toBeUndefined()
  })

  test('res.destroy is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.destroy).toBeDefined()
    expect(typeof res.destroy).toBe('function')
    expect((res.destroy as jest.Mock).getMockName()).toBe('destroy mock default')
  })

  test('res.destroy is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res.destroy()).toBeUndefined()
  })

  test('res.addListener is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.addListener).toBeDefined()
    expect(typeof res.addListener).toBe('function')
    expect((res.addListener as jest.Mock).getMockName()).toBe('addListener mock default')
  })

  test('res.addListener is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.addListener('test', jest.fn())).toBe(res)
  })

  test('res.emit is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.emit).toBeDefined()
    expect(typeof res.emit).toBe('function')
    expect((res.emit as jest.Mock).getMockName()).toBe('emit mock default')
  })

  test('res.emit is not chainable', () => {
    const { res } = getMockRes()

    // it does not return itself (is not chainable)
    expect(res.emit('test')).toBeUndefined()
  })

  test('res.on is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.on).toBeDefined()
    expect(typeof res.on).toBe('function')
    expect((res.on as jest.Mock).getMockName()).toBe('on mock default')
  })

  test('res.on is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.on('close', jest.fn())).toBe(res)
  })

  test('res.once is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.once).toBeDefined()
    expect(typeof res.once).toBe('function')
    expect((res.once as jest.Mock).getMockName()).toBe('once mock default')
  })

  test('res.once is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.once('pipe', jest.fn())).toBe(res)
  })

  test('res.prependListener is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.prependListener).toBeDefined()
    expect(typeof res.prependListener).toBe('function')
    expect((res.prependListener as jest.Mock).getMockName()).toBe('prependListener mock default')
  })

  test('res.prependListener is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.prependListener('drain', jest.fn())).toBe(res)
  })

  test('res.prependOnceListener is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.prependOnceListener).toBeDefined()
    expect(typeof res.prependOnceListener).toBe('function')
    expect((res.prependOnceListener as jest.Mock).getMockName()).toBe('prependOnceListener mock default')
  })

  test('res.prependOnceListener is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.prependOnceListener('unpipe', jest.fn())).toBe(res)
  })

  test('res.removeListener is a mocked function', () => {
    const { res } = getMockRes()

    expect(res.removeListener).toBeDefined()
    expect(typeof res.removeListener).toBe('function')
    expect((res.removeListener as jest.Mock).getMockName()).toBe('removeListener mock default')
  })

  test('res.removeListener is chainable', () => {
    const { res } = getMockRes()

    // it returns itself (is chainable)
    expect(res.removeListener('error', jest.fn())).toBe(res)
  })
})
