# [Rush](https://rushjs.io/) [![Netlify Status](https://api.netlify.com/api/v1/badges/c7ddfc40-a959-46fe-ad72-232609198e70/deploy-status)](https://app.netlify.com/sites/monorepo-rush-deploy/deploys)

## Setup

1. Initialize Rush monorepo

   ```shell
   # install Rush
   $ npm install -g @microsoft/rush

   # install `pnpm` as package manager
   $ npm i -g pnpm

   # initialize Rush monorepo inside `rush` folder
   $ rush init

   # check `pnpm` version and match to "pnpmVersion" in `rush.json` file
   $ pnpm --version
   ```

   💡 `pnpm` is the default (and recommended) package manager, in case you want to use `yarn` or `npm` comment `pnpmVersion` and uncomment your choice of pm. Also, you may need to adjust the version:

   ```json
   // rush.json
   {
     "yarnVersion": "1.22.10"
   }
   ```

2. Create `hello` app via [CRA](https://github.com/facebook/create-react-app)

   ```shell
   # create the `apps` folder and navigate to it
   $ mkdir apps && cd $_
   # create the app
   $ npx create-react-app hello --template typescript

   # tell Rush about the package update
   # folder location doesn't matter as long as it's within the Rush monorepo
   # Rush will also install different packages that it needs
   $ rush update

   # run the app
   $ cd hello # navigate to the `app` folder
   # `rushx` was installed globally along with Rush
   $ rushx start # `rushx` is analogous to `npm run`
   ```

   ⚠️ Before running the update, make sure to add the app to "projects" in `rush.json` file:

   ```json
   // rush.json
   "projects": [
     {
       "packageName": "hello",
       "projectFolder": "apps/hello"
     }
   ]
   ```

3. Create `@shared/ui` package via [tsdx](https://github.com/formium/tsdx)

   This package will provide a component into `hello` app.

   ```shell
   # go back to root folder
   $ cd ../../
   # create the `libs` folder and navigate to it
   $ mkdir libs && cd $_
   # create the package
   $ npx tsdx create ui

   # run Rush update again
   $ cd ../../ # navigate back to root folder
   # tell Rush to wipe everything out and reinstall all of the deps then link them together
   # so that the referencing of shared components would take place
   # `-p/--purge` flag to run `rush purge` first
   $ rush update --purge

   # start the created package to watch for file updates
   $ cd ui && rushx start
   ```

   ⚠️ Before running the update, make sure to add this package to "projects" in `rush.json` file:

   ```json
   // rush.json
   "projects": [
      {
        "packageName": "@shared/ui",
        "projectFolder": "libs/ui"
      }
   ]

   // Also, match the package name `@shared/ui` to `libs/ui/package.json` file
    {
      // "name": "ui",
      "name": "@shared/ui",
    }
   ```

4. Import and use `@shared/ui` in `hello` app

   ```shell
   # navigate to `hello` app
   $ cd app/hello

   # add `@shared/ui` to the app
   # `rush add` tells Rush to reference a local one
   # `-p` flag to indicate the package
   $ rush add -p @shared/ui

   # run build as suggested in the prompt
   $ rush build
   ```

   💡 In case this is not successful, delete `config/rush/npm-shrinkwrap.json` file then run `rush update --purge`

5. Rush deployment via Netlify

   ```shell
   # init a new scenario config file (/common/config/rush/deploy.json)
   # (sample content) "deploymentProjectNames": ["hello"]
   # `-p/--package` flag to indicate the target package
   $ rush init-deploy -p hello
   ```

   Then commit to GitHub and deploy to Netlify using the below settings:

   - build command

     ```shell
     npm i -g @microsoft/rush && rush install && rush build
     && rush deploy --overwrite -p hello
     && cd common/deploy/apps/hello && rushx build
     ```

     💡 Or use Netlify plugin to split this command. Check `netlify` folder and `netlify.toml` file for reference.

   - publish directory

     ```shell
     common/deploy/apps/hello/build
     ```

6. (Optional) Create the `world` app and `@shared/utils` lib by following 2-3 steps.

---

## Refs

- [YouTube tutorial](https://www.youtube.com/watch?v=7FWG3tBTnFM&ab_channel=LeighHalliday)
- [Rush: deploying projects](https://rush.io/pages/maintainer/deploying/)
- [Netlify: creating build plugins](https://docs.netlify.com/configure-builds/build-plugins/create-plugins/)
