//Archivo de constantes de las urls de la api
const BASE_URL = 'http://localhost:3000';

//*********************API Galería
export const GALLERY_URL = BASE_URL +  '/api/gallery'
export const GALLERY_CATS_URL = GALLERY_URL +  '/category'
export const GALLERY_MAKEUP_BY_Category_URL = GALLERY_URL + '/bycategory/'
export const GALLERY_MAKEUP_BY_SUBCategory_URL = GALLERY_URL + '/bysubcategory/'
export const GALLERY_TAGS_URL = GALLERY_URL +  '/tags'
export const GALLERY_BY_TAG_URL = GALLERY_URL +  '/bytag/'
export const GALLERY_MAKEUP_BY_ID_URL = GALLERY_URL + '/makeup/'
export const GALLERY_UPLOAD = GALLERY_URL + '/uploadmakeup'
//Editar categorías
export const GALLERY_EDIT_CAT = GALLERY_URL + '/editcat'
export const GALLERY_EDIT_SUBCAT = GALLERY_URL + '/editsubcat'
export const GALLERY_EDIT_TAG = GALLERY_URL + '/edittag'
export const GALLERY_CREATE_CAT = GALLERY_URL + '/createcat'
export const GALLERY_CREATE_SUBCAT = GALLERY_URL + '/createsubcat'

////*********************API Tienda Productos
export const SHOP_URL = BASE_URL +  '/api/shop'
export const SHOP_CATS_URL = SHOP_URL +  '/category'
export const SHOP_PRODUCT_BY_Category_URL = SHOP_URL + '/bycategory/'
export const SHOP_PRODUCT_BY_SUBCategory_URL = SHOP_URL + '/bysubcategory/'
export const SHOP_PRODUCT_BY_ID_URL = SHOP_URL + '/product/'
export const SHOP_CART = SHOP_URL + '/cart-page/'
export const SHOP_UPLOAD = SHOP_URL + '/uploadproduct'
export const SHOP_PAY = SHOP_URL + '/pay-page/'


////*********************API Usuarios
export const USER_LOGIN_URL = BASE_URL +  '/api/users/login'
export const USER_REGISTER_URL = BASE_URL +  '/api/users/register'