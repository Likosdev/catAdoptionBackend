db.createUser({
  user: 'catadoptionAdmin',
  pwd: 'password',
  roles: [
    {
      role: 'readWrite',
      db: 'catadoption',
    },
  ],
});
