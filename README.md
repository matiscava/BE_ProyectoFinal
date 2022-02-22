# 1.
to initialice the api in Mongo Atlas percistence:
```
  npm start mongodb
```
to initialice the api in File System percistence:
```
  npm start json
```
to initialice the api in MySQL percistence:
```
  npm start mysql
```
to initialice the api in Sqlite3 percistence:
```
  npm start sqlite
```
to initialice the api in Memory percistence:
```
  npm start memory

  or

  npm start
```
# 2. Artillery

Summary in FORK 
```
 [Summary]:
   ticks  total  nonlib   name
    276    1.0%   98.2%  JavaScript
      0    0.0%    0.0%  C++
    112    0.4%   39.9%  GC
  28539   99.0%          Shared libraries
      5    0.0%          Unaccounted

```

Summary in CLUSTER 
```
[Summary]:
   ticks  total  nonlib   name
    131    0.1%   98.5%  JavaScript
      0    0.0%    0.0%  C++
     60    0.1%   45.1%  GC
  95921   99.9%          Shared libraries
      2    0.0%          Unaccounted

```

Se puede observer que en modo cluster hay una reduccion en un 50% de los ticks.

# 3. Test Report

Se observa al correr el procutsChia.test.js que:

  ## a. GET de /api/products :
    devuelve el status 200
  
  ## b. GET PRODUCT de /api/products/:id :
    devuelve el producto solicitado por el ID ingresado por query.params y su status es 200

  ## c. POST de /api/products :
    crea un nuevo producto con la información ingresada manualmente, compara los datos ingresados con los del producto creado y actualiza la página de productos devolviendo el status 302

  ## d. PUT de /api/products/:id :
    modifica el producto seleccionado con el ID ingresado por query.params con la información ingresada manualmente, confirma que los datos no sean los mismos a los del producto original pero sí a los ingresados manualmente y devuelve el status 200

  ## e. DELETE de /api/products/:id :
    elimina el producto seleccionado mediante el ID ingresado por query.params, devuelve el status 200 y se asegura que al llamar al producto eliminado mediante el GET PRODUCT devuelva un error -3


