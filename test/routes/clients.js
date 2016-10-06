/* global describe, before, after, beforeEach, it */
/* global expect, app, config, request */

describe('Routes: Clients', () => {
  const Clients = app.models.clients;
  const clients = [
    { _id: '577c68c99c1c91dd96db5637', name: 'study hard!', done: false },
    { _id: '577c68ff9c1c91dd96db5638', name: 'work soft!', done: false }
  ];

  beforeEach(done => {
    Clients.remove({}, () => Clients.insertMany(clients, done));
  });

  describe('GET /clients', () => {
    describe('status 200', () => {
      it('returns a list of clients', done => {
        request.get('/clients')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2);
            expect(res.body).to.include(clients[0]);
            expect(res.body).to.include(clients[1]);
            done(err);
          });
      });
    });
  });

  describe('POST /clients', () => {
    describe('status 200', () => {
      it('creates a new client', done => {
        request.post('/clients')
          .send({ name: 'run fast!', done: false })
          .expect(200)
          .end((err, res) => {
            expect(res.body.name).to.eql('run fast!');
            expect(res.body.done).to.eql(false);
            done(err);
          });
      });
    });
  });

  describe('GET /clients/:id', () => {
    describe('status 200', () => {
      it('returns one client', done => {
        request.get(`/clients/${clients[0]._id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).to.eql(clients[0]._id);
            expect(res.body.name).to.eql(clients[0].name);
            expect(res.body.done).to.eql(clients[0].done);
            done(err);
          });
      });
    });
    describe('status 404', () => {
      it('throws error when client not exist', done => {
        request.get('/clients/id-not-exist')
          .expect(404)
          .end(err => done(err));
      });
    });
  });

  describe('PUT /clients/:id', () => {
    describe('status 200', () => {
      it('updates a client', done => {
        request.put(`/clients/${clients[0]._id}`)
          .send({ name: 'travel a lot!', done: true })
          .expect(200)
          .end((err, res) => {
            expect(res.body._id).to.eql(clients[0]._id);
            expect(res.body.name).to.eql('travel a lot!');
            expect(res.body.done).to.eql(true);
            done(err);
          });
      });
    });
  });

  describe('DELETE /clients/:id', () => {
    describe('status 204', () => {
      it('removes a client', done => {
        request.delete(`/clients/${clients[0]._id}`)
          .expect(204)
          .end(err => done(err));
      });
    });
  });
});
