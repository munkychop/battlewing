"use strict";

require.config({
    
        baseUrl: "",

        // The main bootstrap js file name.
        name: "app/app",

        // Module paths, with and without filenames
        paths: {

                // ---------------------------------------------
                // Module Paths
                // ---------------------------------------------
                
                // Path to controllers
                peripheralPath : "app/controller/peripheral/",
               
                // Path to entities
                entityPath : "app/entity/",


                // ---------------------------------------------
                // Modules
                // ---------------------------------------------

                // Bootstrap class
                app : "app",

                // Global non-module libs
                log : "libs/log",

                ImagePreloader : "libs/image-preloader",

                // Non-global, non-module libs
                PIXI : "libs/pixi.dev",

                // Document class for the app
                BattleWing : "app/BattleWing",

                // Model
                GameModel : "app/model/GameModel",

                Hero : "app/entity/Hero",

                KeyboardController : "app/controller/peripheral/KeyboardController"
        },

        // Add a shim for any non-module libs we want to make global (we have to do this manually once they have been injected), or
        // for any non-module libs that have dependancies.
        shim: {
                "log": {
                       // deps: ['underscore', 'jquery'], // Modules this module depends on.
                        
                        exports: "log" // Once loaded, use the global 'log' as the module value.
                },

                "ImagePreloader" : {
                    exports: "ImagePreloader"
                },

                "PIXI" : {
                    exports: "PIXI"
                },

                "polyfills" : {
                    exports: "pollyfills"
                },

                /*
                "backbone": {
                       deps: ['underscore', 'jquery'], // Modules this module depends on.
                        
                        exports: "Backbone" // Once loaded, use the global 'Backbone' as the module value.
                }
                */
        }
});