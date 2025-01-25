const cors = require('cors');
const corsGate = require('..');
const request = require('supertest');
const express = require('express');

function ok(req, res) {
  res.status(200).end();
}

describe('cors-gate', function() {
  beforeEach(function() {
    this.app = express();
  });

  it('should allow same-origin requests', function(done) {
    this.app.use(corsGate({
      allowSafe: false,
      origin: 'http://localhost'
    }));

    this.app.get('/get', ok);

    request(this.app)
      .get('/get')
      .set('origin', 'http://localhost')
      .expect(200, done);
  });

  it('should allow same-origin POST requests', function(done) {
    this.app.use(corsGate({
      allowSafe: false,
      origin: 'http://localhost'
    }));

    this.app.post('/post', ok);

    request(this.app)
      .post('/post')
      .set('origin', 'http://localhost')
      .expect(200, done);
  });

  it('should allow permitted cross-origin requests', function(done) {
    this.app.use(cors({
      origin: 'http://localhost:8080'
    }), corsGate({
      allowSafe: false,
      origin: 'http://localhost'
    }));

    this.app.post('/post', ok);

    request(this.app)
      .post('/post')
      .set('origin', 'http://localhost:8080')
      .expect(200, done);
  });

  it('should allow wildcard origins', function(done) {
    this.app.use(cors({
      origin: '*'
    }), corsGate({
      origin: 'http://localhost'
    }));

    this.app.post('/post', ok);

    request(this.app)
      .post('/post')
      .set('origin', 'http://localhost:8080')
      .expect(200, done);
  });

  it('should reject requests without origin', function(done) {
    this.app.use(corsGate({
      origin: 'http://localhost'
    }));

    this.app.post('/post', ok);

    request(this.app)
      .post('/post')
      .expect(403, done);
  });

  it('should reject requests from other origins', function(done) {
    this.app.use(cors({
      origin: 'http://localhost:8080'
    }), corsGate({
      origin: 'http://localhost'
    }));

    this.app.post('/post', ok);

    request(this.app)
      .post('/post')
      .set('origin', 'https://mixmax.com')
      .expect(403, done);
  });

  describe('options.allowSafe', function() {
    it('should allow unspecified safe requests', function(done) {
      this.app.use(corsGate({
        strict: true,
        allowSafe: true,
        origin: 'http://localhost'
      }));

      this.app.get('/get', ok);

      request(this.app)
        .get('/get')
        .expect(200, done);
    });

    it('should reject unspecified safe requests', function(done) {
      this.app.use(corsGate({
        strict: true,
        allowSafe: false,
        origin: 'http://localhost'
      }));

      this.app.get('/get', ok);

      request(this.app)
        .get('/get')
        .expect(403, done);
    });

    it('can be given a function returning false', function(done) {
      this.app.use(corsGate({
        strict: true,
        allowSafe: () => false,
        origin: 'http://localhost'
      }));

      this.app.get('/get', ok);

      request(this.app)
        .get('/get')
        .expect(403, done);
    });

    it('can be given a function returning true', function(done) {
      this.app.use(corsGate({
        strict: true,
        allowSafe: () => true,
        origin: 'http://localhost'
      }));

      this.app.get('/get', ok);

      request(this.app)
        .get('/get')
        .expect(200, done);
    });
  });

  describe('options.strict', function() {
    it('should permit requests without origin', function(done) {
      this.app.use(corsGate({
        strict: false,
        origin: 'http://localhost'
      }));

      this.app.post('/post', ok);

      request(this.app)
        .post('/post')
        .expect(200, done);
    });
  });

  describe('options.failure', function() {
    it('should not be invoked for same-origin requests', function(done) {
      this.app.use(corsGate({
        allowSafe: false,
        origin: 'http://localhost',
        failure: function(req, res) {
          res.status(403).end();
        }
      }));

      this.app.post('/post', ok);

      request(this.app)
        .post('/post')
        .set('origin', 'http://localhost')
        .expect(200, done);
    });


    it('should be invoked for requests without origin', function(done) {
      this.app.use(corsGate({
        origin: 'http://localhost',
        failure: function(req, res) {
          res.status(204).end();
        }
      }));

      this.app.post('/post', ok);

      request(this.app)
        .post('/post')
        .expect(204, done);
    });

    it('should be invoked for requests from other origins', function(done) {
      this.app.use(cors({
        origin: 'http://localhost:8080'
      }), corsGate({
        origin: 'http://localhost',
        failure: function(req, res) {
          res.status(204).end();
        }
      }));

      this.app.post('/post', ok);

      request(this.app)
        .post('/post')
        .set('origin', 'https://mixmax.com')
        .expect(204, done);
    });
  });

  describe('originFallbackToReferrer', function() {
    it('should patch origin', function(done) {
      this.app.use(corsGate.originFallbackToReferrer());

      this.app.get('/get', function(req, res) {
        const correctOrigin = req.get('origin') === 'http://localhost';
        res.status(correctOrigin ? 200 : 403).end();
      });

      request(this.app)
        .get('/get')
        .set('referer', 'http://localhost/home')
        .expect(200, done);
    });

    it('should not overwrite origin', function(done) {
      this.app.use(corsGate.originFallbackToReferrer());

      this.app.get('/get', function(req, res) {
        const correctOrigin = req.get('origin') === 'http://localhost';
        res.status(correctOrigin ? 200 : 403).end();
      });

      // This scenario won't technically occur in the wild - the referer and origin should always
      // match.
      request(this.app)
        .get('/get')
        .set('referer', 'http://localhost:8080/home')
        .set('origin', 'http://localhost')
        .expect(200, done);
    });
  });
});
