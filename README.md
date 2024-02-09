# Palæstinas Plads Blog Website

The site is built with [Hugo](https://gohugo.io) and [Static CMS](https://github.com/StaticJsCMS/static-cms).

You can use the deploy button on their site to build your own site from the source

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/StaticJsCMS/static-cms-hugo-netlify-template&amp;stack=cms)

This will setup everything needed for running the CMS:

* A new repository in your GitHub account with the code
* Full Continuous Deployment to Netlify's global CDN network
* Control users and access with Netlify Identity
* Manage content with Static CMS

Once the initial build finishes, you will receive an "Invite" email to login to Static CMS.

Now you're all set, and you can start editing content! It will start out as a business website for an imagined coffee brand. 

This website is a stripped down blog version of the coffee brand website which lists all your post on the homepage with pagination, and each post has its own page when clicked.

## Local Development

Clone this repository, and run `yarn` or `npm install` from the new folder to install all required dependencies.

Then start the development server with `yarn start` or `npm start`.

## Layouts

The template is based on small, content-agnostic partials that can be mixed and matched. The pre-built pages showcase just a few of the possible combinations. Refer to the `site/layouts/partials` folder for all available partials.

## CSS

The template uses a custom fork of Tachyons and PostCSS with cssnext and cssnano. To customize the template refer to `src/css/imports/_variables.css` where most of the important global variables like colors and spacing are stored.


