'use strict';

module.exports = function (grunt) {


    require('time-grunt')(grunt);

    // Load tasks from all grunt plugins published in package.json
    require('load-grunt-tasks')(grunt);


    // Init plugins
    grunt.initConfig({

        // Just a config for the rest of this Gruntfile.js
        yeoman: {
            app: 'app',
            tmp: '.tmp',
            dev: 'dev',
            dist: 'dist'
        },

        clean: {
            dev: '<%= yeoman.dev %>',
            tmp: '<%= yeoman.tmp %>',
            build: '<%= yeoman.dist %>',
            'bower-requirejs': '<%= yeoman.app %>/scripts/config.js'
        },

        // Include installed bower components into *.jade files with special blocks (see app/index.jade)
        wiredep: {
            option: {
                verbose: true,
                src: [
                    "<%= yeoman.app %>/*.jade"
                ],
                exclude: ['requirejs', 'almond'],
                directory:  "<%= yeoman.app %>/bower_components"
            }

        },

        bowerRequirejs: {
            target: {
                rjsConfig: '<%= yeoman.app %>/scripts/config.js'
            }
        },

        includeSource: {
            options: {
                basePath: '<%= yeoman.dev %>'
            },
            'compile': {
                files: {
                    '<%= yeoman.dev %>/index.html': '<%= yeoman.dev %>/index.html'
                }
            }
        },

        // Generate HTML code from all *.jade files
        jade: {
            options: {
                pretty: true
            },
            compile: {
                files: [ {
                    cwd: "<%= yeoman.app %>",
                    src: "**/*.jade",
                    dest: "<%= yeoman.dev %>",
                    expand: true,
                    ext: ".html"
                } ]
            }

        },

        coffee: {
            compile: {
                options: {
                    sourceMap: true,
                    bare: true
                },
                expand: true,
                //flatten: true,
                cwd: '<%= yeoman.dev %>/scripts',
                src: ['**/*.coffee'],
                dest: '<%= yeoman.dev %>/scripts',
                ext: '.js'
            },
            'bower-requirejs': {
                options: {
                    bare: true
                },
                src: '<%= yeoman.app %>/scripts/config.coffee',
                dest: '<%= yeoman.app %>/scripts/config.js'
            }
        },

        js2coffee: {
            'bower-requirejs': {
                src: '<%= yeoman.app %>/scripts/config.js',
                dest: '<%= yeoman.app %>/scripts/config.coffee'
            }
        },

        // Launch dev static server (without backend)
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                open: true
                //open: {
                //    target: "http://localhost:9000/index.html"
                //},
            },
            dev: {
                options: {
                    //open: true,
                    base: ['<%= yeoman.dev %>']
                }
            },
            build: {
                options: {
                    livereload: false,
                    base: ['<%= yeoman.dist %>']
                }
            }
        },

        // modules and concatenate them into a single file.
        requirejs: {
            build: {
                options: {
                    mainConfigFile: "<%= yeoman.dev %>/scripts/config.js",
                    //generateSourceMaps: true,
                    generateSourceMaps: false,
                    include: ["main"],
                    insertRequire: ["main"],
                    out: "<%= yeoman.dist %>/scripts/app.min.js",
                    optimize: "uglify2",

                    // Since we bootstrap with nested `require` calls this option allows
                    // R.js to find them.
                    //findNestedDependencies: true,

                    // Include a minimal AMD implementation shim.
                    name: "almond",

                    // Setting the base url to the distribution directory allows the
                    // Uglify minification process to correctly map paths for Source
                    // Maps.
                    baseUrl: "<%= yeoman.dev %>/scripts",

                    // Wrap everything in an IIFE.
                    wrap: true

                    // Do not preserve any license comments when working with source
                    // maps.  These options are incompatible.
                    //preserveLicenseComments: false
                }
            }
        },

        useminPrepare: {
            options: {
                root: '<%= yeoman.dev %>'
                //dest: '<%= yeoman.dev %>'
            },
            html: '<%= yeoman.dev %>/index.html'

        },

        usemin: {
            html: '<%= yeoman.dist %>/index.html'
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dev %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dev %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         '<%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= yeoman.app %>/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dev %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        copy: {
            'compile': {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        dest: '<%= yeoman.dev %>/scripts',
                        src: ['**/*.coffee', '**/*.js', '**/*.js.map']
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dev %>',
                        src: [
                            'bower_components/**',
                            'images/**'

                        ]
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "<%= yeoman.dev %>",
                        src: [
                            'scripts/**/*.js',
                            '**/*.html',
                        ],
                        dest: '<%= yeoman.dist %>'
                    },
                ]
            }
        },

        processhtml: {
            build: {
                options: {
                    commentMarker: 'process'
                },
                files: {
                    '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
                }
            }
        },

        // Run tasks cuncurrently
        concurrent: {
            min: [
                'newer:imagemin',
                'newer:svgmin',
                'newer:htmlmin',
                'requirejs:build',
                'processhtml:build'
            ]
            //batch2: []
        },


        watch: {
            jade: {
                files: ['<%= yeoman.app %>/**/*.jade'],
                tasks: [
                    'newer:jade:compile',
                    'includeSource:compile'
                ]
            },
            coffee: {
                files: ['<%= yeoman.app %>/scripts/**/*.coffee'],
                tasks: [
                    'newer:copy:compile',
                    'newer:coffee:compile'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.dev %>/**/*.html',
                    '<%= yeoman.dev %>/css/**/*.css',
                    '<%= yeoman.dev %>/scripts/**/*.js',
                    '<%= yeoman.dev %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        }


    })

    // Write bower dependenceis into requirejs config.coffee file
    // bowerRequirejs itself can't write .coffee files
    grunt.registerTask('bower-requirejs', [
        'coffee:bower-requirejs',
        'bowerRequirejs',
        'js2coffee:bower-requirejs',
        'clean:bower-requirejs'
    ])


    grunt.registerTask('usemin-full', [
        'useminPrepare',
        'concat:generated',
        'cssmin:generated',
        'uglify:generated',
        'usemin'
    ])

    grunt.registerTask('compile', [
        'wiredep',
        'newer:copy:compile',
        'newer:jade',
        'newer:coffee:compile',
        'includeSource:compile'
    ])

    grunt.registerTask('recompile', [
        'clean:dev',
        'compile'
    ])

    grunt.registerTask('build', [
        'compile',
        'concurrent:min',
        'usemin-full',
    ])

    grunt.registerTask('rebuild', [
        'clean',
        'build'

    ])

    grunt.registerTask('server', function(target) {
        if (target === 'build') {
            return grunt.task.run([
                'connect:build:keepalive',
            ])
        }

        return grunt.task.run([
            'connect:dev',
            'watch'
        ])
    })

};
