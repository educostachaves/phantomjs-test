var vows    = require('vows'),
    chai  = require('chai'),
    expect  = require('chai').expect,
    assert  = require('chai').assert,
    chaiHttp = require('chai-http'),
    browser = require('./server-webdriver.js').browser

chai.use(chaiHttp);

vows.describe('Apenas um exemplo')
.addBatch({
  'Criando uma nova sessão no WebDriver': {
    topic: function() {
      var callback = this.callback;
      browser.init( {}, function(err, sessionID, capabilities) {
        callback( err );
      });
    },
    'Sessão criada': function() {  }
  }
})
.addBatch({
  'Acessando a página': {
    topic: function() {
      var callback = this.callback;
      browser.get( 'http://question-prod.elasticbeanstalk.com/', function(err) {
        callback( err );
      });
    },
    'Preenchendo campo E-mail': function() {
      chai.request('http://question-prod.elasticbeanstalk.com/')
        .post('/log/in')
        .field('_method', 'put')
        .field('email', 'harrysouza@gmail.com')
        .field('password', '123')
        .then(function (res) {
          expect(res).to.have.status(500);
        })
        .catch(function (err) {
           throw err;
        });
    }
  }
})
.addBatch({
  'Fechando o navegador': {
    topic: function() {
      var callback = this.callback;
      browser.quit( function(err){
        callback( err );
      });
    },
    'Fim': function() { /**...*/ }
  }
}).export(module);