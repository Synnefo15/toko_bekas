const express = require("express");
const router = express.Router();

const {verifySeller,verifyToken,verifyUser} = require('../middleware/verifyToken');

const middleware = require('../middleware/middleware.js');



const cors = require('cors');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.use(cors(corsOptions));
const authController = require("../controller/auth.controller");
const userController = require('../controller/users.controller');
const transController = require('../controller/transaksi.controller');
const productController = require('../controller/products.controller.js');
const categoryController = require('../controller/category.controller.js');


// &---- Routes index ----
/**
 * @swagger
 * /:
 * get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/", (req, res) => {
  res.status(200).send(`Default Page`);
});
// PRODUCT ENDPOINTS
router.get('/products', productController.findAllProductsApi);
router.get('/products/:id', productController.findProductByIdApi);
router.post('/products',middleware.authorizationToken ,productController.createNewProductApi);
router.put('/products/:id', productController.updateProductApi);
router.delete('/products/:id', productController.deleteProduct);


// CATEGORY ENDPOINTS
router.get('/category', categoryController.findAllCategoryApi);
router.get('/category/:id', categoryController.findCategoryByIdApi);
router.post('/category', categoryController.createNewCategoryApi);
router.put('/category/:id', categoryController.updateCategoryApi);
router.delete('/category/:id', categoryController.deleteCategory);

// &---- User ----
router.get("/users/profile", userController.findAllUserApi);
router.get("/users/profile/:id", userController.findUserByIdApi);
router.post("/users/profile", userController.createNewUserApi);
router.put("/users/profile/:id", userController.updateUserApi);
router.delete("/users/profile/:id", userController.deleteCar);

// auth
router.post("/auth/signup", authController.signup);
router.post("/auth/signin", authController.signin);

// &---- Transaksi ----
router.get('/users/transaksi',transController.findAllTransApi)
router.get('/users/transaksi/:id',transController.findTransByIdApi)
router.post('/users/transaksi',transController.createNewTransApi)
router.put('/users/transaksi/:id',transController.updateTransApi)
router.delete('/users/transaksi/:id',transController.deleteTrans)




module.exports = router;
