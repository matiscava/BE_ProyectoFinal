import MemoryContainer from "../../containers/MemoryContainer.js";

class ProductDaoMemory extends MemoryContainer {
 constructor () {
     super([
        {
          "title": "Caramelo media hora",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Caramelo de abuelo sabor Aníz",
          "code": 1,
          "stock": 6,
          "price": 45,
          "photo": "https://vinomanos.com/wp-content/uploads/2020/08/bazaart7-4-600x600-1.png",
          "id": 1
        },
        {
          "title": "Pico Dulce",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Chupetin multicolor",
          "code": 2,
          "stock": 10,
          "price": 20,
          "photo": "https://almacencooperativo.com.ar/wp-content/uploads/2020/11/picodulce.jpg",
          "id": 2
        },
        {
          "title": "Chocolate Jack",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Chocolate con juguete de regalo",
          "code": 3,
          "stock": 6,
          "price": 45,
          "photo": "http://d3ugyf2ht6aenh.cloudfront.net/stores/135/794/products/d_nq_np_665301-mla25956161225_092017-o1-f7e3f3d35fbf9f9e9016001697986976-640-0.jpg",
          "id": 3
        },
        {
          "title": "Naranju",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Jugo de fruta congelado en empaque de dudosa procedencia",
          "code": 4,
          "stock": 8,
          "price": 50,
          "photo": "https://cotillongonic.com.ar/wp-content/uploads/2020/10/NARANJUGONIC.jpg",
          "id": 4
        },
        {
          "title": "Tubby 4",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Oblea de 4 pisos bañada en chocolate",
          "code": 5,
          "stock": 2,
          "price": 150,
          "photo": "https://pbs.twimg.com/media/DhTqqNtXkAU_jbn.jpg",
          "id": 5
        },
        {
          "title": "Chupelatin",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Chupetin de chocolate",
          "code": 6,
          "stock": 12,
          "price": 500,
          "photo": "https://http2.mlstatic.com/D_NQ_NP_697980-MLA42179185856_062020-O.jpg",
          "id": 6
        },
        {
          "title": "Push Pop",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Chupetín de caramelo en envase de plastico",
          "code": 7,
          "stock": 51,
          "price": 540,
          "photo": "https://superonline.ar/wp-content/uploads/2020/09/25007-1.jpg",
          "id": 7
        },
        {
          "title": "Crazy dips",
          "timestamp": "26/10/2021 11:47:36",
          "description": "Chupetín con forma de pie y polvo explosivo",
          "code": 8,
          "stock": 22,
          "price": 420,
          "photo": "https://m.media-amazon.com/images/I/51ILmlzL-zL.jpg",
          "id": 8
        },
        {
          "title": "Mielsitas",
          "photo": "http://d3ugyf2ht6aenh.cloudfront.net/stores/001/128/610/products/mielcitas1-019aabe60106362f2415970769045829-640-0.jpg",
          "description": "miel de color en pequeños sachet de plastico",
          "stock": 22,
          "price": 15,
          "id": 9,
          "code": 9,
          "timestamp": "26/10/2021 14:24:40"
        }
      ])
 }
};

export default ProductDaoMemory;