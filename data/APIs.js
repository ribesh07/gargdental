const ApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
console.warn(`Base Api Url: ${baseUrl}`);

export default ApiUrl;

/*

<?php

Route::group(['namespace' => 'API\V1'], function () {
    Route::post('/register', [RegistrationController::class, 'register']);
    Route::post('/verify-account', [RegistrationController::class, 'VerifyAccount']);
    Route::post('/resend-code', [RegistrationController::class, 'ResendCode']);

    Route::group(['prefix' => 'auth'], function () {
        Route::post('/forgot-password-code', [AuthController::class, 'forgot_password_code']);
        Route::post('/reset-password-verify', [AuthController::class, 'reset_password_verify']);
        Route::post('/login', [AuthController::class, 'login']);
    });

    Route::group(['prefix' => 'banners'], function () {
        Route::get('/', [BannerController::class, 'get_banners']);
        Route::get('/get-cards', [BannerController::class, 'get_cards']);
    });

    Route::group(['prefix' => 'products'], function () {
        Route::get('/latest', [ProductController::class, 'get_latest_products']);
        Route::get('/search', [ProductController::class, 'get_searched_products']);
        Route::get('/details/{product_code}', [ProductController::class, 'get_product']);
        Route::get('/related-products/{product_code}', [ProductController::class, 'get_related_products']);
    });

    Route::group(['prefix' => 'categories'], function () {
        Route::get('/', [CategoryController::class, 'get_categories']);
    });
    
    Route::group(['prefix' => 'brands'], function () {
        Route::get('/', [BrandController::class, 'get_brands']);
    });

    Route::group(['prefix' => 'customer', 'middleware' => 'auth:api'], function () {
        Route::get('info', [CustomerController::class, 'get_info']);
        Route::post('update-profile', [CustomerController::class, 'update_profile']);
        Route::post('change-password', [CustomerController::class, 'change_password']);
        Route::delete('remove-account', [CustomerController::class, 'remove_account']);
        
        Route::group(['prefix'=>'cart'], function() {
            Route::get('list', [CartController::class, 'get_carts']);
            Route::post('add', [CartController::class, 'add_to_cart']);
            Route::post('update', [CartController::class, 'update_cart']);
            Route::delete('remove-item', [CartController::class, 'remove_cart_item']);
            Route::delete('remove', [CartController::class, 'remove_cart']);
        });
        
        Route::group(['prefix'=>'wishlist'], function() {
            Route::get('list', [WishlistController::class, 'get_wishlist']);
            Route::post('add', [WishlistController::class, 'add_to_wishlist']);
            Route::delete('remove-item', [WishlistController::class, 'remove_wishlist_item']);
        });
        
        Route::group(['prefix'=>'products'], function() {
            Route::post('add-recommended/{product_code}', [ProductController::class, 'add_to_recommended']);
            Route::get('/recommended', [ProductController::class, 'get_recommended']);
        });
    });

});   
*/
