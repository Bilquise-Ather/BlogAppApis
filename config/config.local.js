var config = {
    /**
     * server configuration
     */
    server: {
        port: 3000,
        networkCallTimeout: 30000,
    },
    /**
     * DB configuration
     */

    dojo: {
        database_name: 'dojo-blog',
        host: 'mongodb://localhost',
        port: 27017,
    },
    base_url: "http://localhost:3000",
    api_key: "12345",
    upload_folder: "uploads",
    upload_entities: {
        icon_image_folder: "/icon_image/",
    },
};

module.exports = config;