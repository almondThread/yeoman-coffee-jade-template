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
            build: '<%= yeoman.dist %>'
        },

        // Include installed bower components into *.jade files with special blocks (see app/index.jade)
        wiredep: {
            option: {
                verbose: true,
                src: [
                    "<%= yeoman.app %>/*.jade"
                ],
                directory:  "<%= yeoman.app %>/bower_components"
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
            }
        },

        // Launch dev static server (without backend)
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            dev: {
                options: {
                    open: true,
                    base: [
                        //'.tmp',
                        '<%= yeoman.dev %>'
                    ]
                }
            },
            build: {
                options: {
                    open: {
                        target: "http://localhost:9000/index.html",
                        keepalive: true
                    },
                    base: ['<%= yeoman.dist %>']
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

        // Run tasks cuncurrently
        concurrent: {
            min: [
                'newer:imagemin',
                'newer:svgmin',
                'newer:htmlmin'
            ],
            batch2: []
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
                    '<%= yeoman.dev %>/*.html',
                    '<%= yeoman.dev %>/css/{,*/}*.css',
                    '<%= yeoman.dev %>/scripts/{,*/}*.js',
                    '<%= yeoman.dev %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        }


    })


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
        'newer:coffee',
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
                'connect:build',
                //'watch'
            ])
        }

        return grunt.task.run([
            'connect:dev',
            'watch'
        ])
    })

};
