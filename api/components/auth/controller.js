const TABLE = 'auth'
const auth = require('../../../auth')
const bcrypt = require('bcrypt')

module.exports = function(injectedStore){
  let store = injectedStore;

  if(!store){
    store = require('../../../store/dummy')
  }

  async function login(username, password){
    const data = await store.query(TABLE, { username: username });

    bcrypt.compare(password, data.password)
      .then(sonIguales => {
        if (sonIguales === true){
          //Generar Token
          console.log(auth.sign(data));
          return auth.sign(data);
        } else {
          throw new Error('Información Inválida')
        }
      });
  }

  async function upsert(data){
    const authData = {
      id: data.id,
    }
    
    if (data.username){
      authData.username = data.username;
    }

    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }
  
  return {
    login,
    upsert,
  };
};