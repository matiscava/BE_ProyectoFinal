let instance = null;

class Singleton {
    constructor() { }

    static getInstance(){
      if(!instance) {
        instance = new Singleton()
      }
      return instance
    }
}

export default Singleton;