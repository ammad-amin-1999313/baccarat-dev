/** @type {import('next').NextConfig} */
require('dotenv').config();


module.exports = {
    webpack: (config) => {
        config.plugins.push(new (require('dotenv-webpack'))());
        return config;
    },
  // Other configurations go here
};

