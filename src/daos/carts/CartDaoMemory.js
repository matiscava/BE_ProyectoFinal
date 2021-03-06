const MemoryContainer = require("../../containers/MemoryContainer");

class CartDaoMemory extends MemoryContainer {
 constructor () {
     super([
        {
          "id": 1,
          "timestamp": "3/11/2021 20:57:50",
          "products": []
        },
        {
          "id": 2,
          "timestamp": "3/11/2021 21:16:33",
          "products": [
            {
              "nombre": "Chocolate Jack",
              "timestamp": "3/11/2021 21:16:33",
              "descripcion": "Chocolate con juguete de regalo",
              "codigo": 3,
              "stock": 6,
              "precio": 45,
              "foto": "http://d3ugyf2ht6aenh.cloudfront.net/stores/135/794/products/d_nq_np_665301-mla25956161225_092017-o1-f7e3f3d35fbf9f9e9016001697986976-640-0.jpg",
              "id": 3,
              "quantity": 36
            },
            {
              "nombre": "Chupelatin",
              "timestamp": "3/11/2021 21:16:33",
              "descripcion": "Chupetin de chocolate",
              "codigo": 6,
              "stock": 12,
              "precio": 500,
              "foto": "https://http2.mlstatic.com/D_NQ_NP_697980-MLA42179185856_062020-O.jpg",
              "id": 6,
              "quantity": 9
            }
          ]
        }
      ])
 }
};

module.exports = CartDaoMemory;