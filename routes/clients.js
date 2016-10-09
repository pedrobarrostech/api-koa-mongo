import Router from 'koa-router';


module.exports = app => {
  const Clients = app.models.clients;
  const router = new Router();

  router
    .get('/clients', function *() {
      try {
        const clients = yield Clients.find({});
        this.body = clients;
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .get('/clients/:clientId', function *() {
      try {
        const clientId = this.params.clientId;
        const client = yield Clients.findById(clientId);
        if (client) {
          this.body = client;
        } else {
          this.status = 404;
        }
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .post('/clients', function *() {
      try {
        const client = this.request.body;
        this.body = yield Clients.create(client);
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .put('/clients/:clientId', function *() {
      try {
        const clientId = this.params.clientId;
        const client = this.request.body;
        yield Clients.update({ _id: clientId }, { $set: client });
        const newTask = yield Clients.findById(clientId);
        if (newTask) {
          this.body = newTask;
        } else {
          this.status = 404;
        }
      } catch (err) {
        this.throw(412, { err });
      }
    })
    .delete('/clients/:clientId', function *() {
      try {
        const clientId = this.params.clientId;
        yield Clients.findByIdAndRemove(clientId);
        this.status = 204;
      } catch (err) {
        this.throw(412, { err });
      }
    })
  ;

  app.use(router.routes());
  app.use(router.allowedMethods());
};
