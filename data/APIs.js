/*

<?php

Route::group(['namespace' => 'API\V1'], function () {
    Route::post('/register', [RegistrationController::class, 'register']);  //done
    Route::post('/verify-account', [RegistrationController::class, 'VerifyAccount']); //done
    Route::post('/resend-code', [RegistrationController::class, 'ResendCode']); //done

    Route::group(['prefix' => 'auth'], function () {
        Route::post('/forgot-password-code', [AuthController::class, 'forgot_password_code']);  //done
        Route::post('/reset-password-verify', [AuthController::class, 'reset_password_verify']); //done
        Route::post('/login', [AuthController::class, 'login']); //done
    });

    Route::group(['prefix' => 'banners'], function () {
        Route::get('/', [BannerController::class, 'get_banners']);      //done
        Route::get('/get-cards', [BannerController::class, 'get_cards']); //later
    });

    Route::group(['prefix' => 'products'], function () {
        Route::get('/latest', [ProductController::class, 'get_latest_products']);   //done
        Route::get('/search', [ProductController::class, 'get_searched_products']);     //done - need update
        Route::get('/details/{product_code}', [ProductController::class, 'get_product']);       // done
        Route::get('/related-products/{product_code}', [ProductController::class, 'get_related_products']);  // done recommended - need update for related in product section
    });

    Route::group(['prefix' => 'categories'], function () {
        Route::get('/', [CategoryController::class, 'get_categories']);     // partially done
    });
    
    Route::group(['prefix' => 'brands'], function () {
        Route::get('/', [BrandController::class, 'get_brands']);            // partially done
    });

    Route::group(['prefix' => 'customer', 'middleware' => 'auth:api'], function () {    
        Route::get('info', [CustomerController::class, 'get_info']);            // partially done
        Route::post('update-profile', [CustomerController::class, 'update_profile']);   
        Route::post('change-password', [CustomerController::class, 'change_password']);
        Route::delete('remove-account', [CustomerController::class, 'remove_account']);
        
        Route::group(['prefix'=>'cart'], function() {
            Route::post('add', [CartController::class, 'add_to_cart']);       //working on it
            Route::get('list', [CartController::class, 'get_carts']);       //working on it
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
            Route::get('/recommended', [ProductController::class, 'get_recommended']);      // need update in recommended dashboard
        });
    });

});   
*/

/*

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
        Route::get('/all', [ProductController::class, 'get_all_products']);
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
        
        Route::group(['prefix'=>'address'], function() {
            Route::get('load-address-dropdowns', [AddressController::class, 'load_address_dropdowns']);
            Route::post('add', [AddressController::class, 'add_address']);
            Route::post('update/{id}', [AddressController::class, 'update_address']);
            Route::post('set-default-shipping/{id}', [AddressController::class, 'set_default_shipping']);
            Route::post('set-default-billing/{id}', [AddressController::class, 'set_default_billing']);
            Route::delete('remove/{id}', [AddressController::class, 'remove_address']);   
        });

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
        
        Route::group(['prefix'=>'order'], function() {
            Route::post('add', [OrderController::class, 'add_to_order']);
        });

    });

});

*/
