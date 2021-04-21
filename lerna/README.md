# [Lerna](https://github.com/lerna/lerna) ft. Yarn Workspaces [![Netlify Status](https://api.netlify.com/api/v1/badges/300bb4a0-5111-4b66-8e13-1fca4199f466/deploy-status)](https://app.netlify.com/sites/monorepo-lerna-deploy/deploys)

## Setup

1. Initialize Lerna monorepo

   ```shell
   $ npx lerna init
   ```

2. Yarn Workspaces setup

   Using Yarn Workspaces with Lerna, the common packages will be hoisted up to the root directory instead of duplicating them in the packages `node_modules` folders. To do so, do the following file update:

   ```json
   // lerna.json
   {
     ...
     "npmClient": "yarn",
     "useWorkspaces": true
   }

   // package.json
   // this is the minimum setup!
   {
     "private": true,
     "workspaces": {
       "packages": [
         "packages/*"
       ]
     }
   }
   ```

3. Create the apps (via [CRA](https://github.com/facebook/create-react-app)) and shared libs (via [tsdx](https://github.com/formium/tsdx))

   ```shell
   # navigate to `packages` folder
   $ cd packages
   $ npx create-react-app hello --template typescript  # hello app
   $ npx create-react-app world --template typescript  # world app
   $ npx tsdx create ui                                # ui lib
   $ npx tsdx create utils                             # utils lib

   # start all the packages
   $ npx lerna run start
   # start specific package
   $ npx lerna run --scope hello start
   # or using `exec`
   $ npx lerna exec --scope hello -- yarn start
   # or use yarn workspaces
   $ yarn workspace hello start
   ```

4. (Optional) Rename the packages name in their `package.json` file accordingly:

   ```json
   // packages/ui/package.json
   {
     // "name": "ui",
     "name": "@shared/ui",
   }

   // packages/utils/package.json
   {
     // "name": "utils",
     "name": "@shared/utils",
   }
   ```

5. Use the shared libs in the apps

   This is done by just adding the packages to `package.json` files as below:

   ```json
   // packages/hello/package.json
   {
     ...
     "dependencies": {
       ...
       "@shared/ui": "0.1.0",
       "@shared/utils": "0.1.0"
     },
   }

   // packages/world/package.json
   {
     ...
     "dependencies": {
       ...
       "@shared/ui": "0.1.0",
     },
   }
   ```

   Then you can start importing the libs within the apps.

6. Lerna deployment via Netlify

   Commit to GitHub and deploy to Netlify using the below settings:

   - build command: `yarn && yarn build`
   - publish directory: `packages/hello/build`

   ⚠️ Make sure to add the below build command in root `package.json` file:

   ```json
   "scripts": {
      "build": "lerna run --stream build"
   }
   ```

---

## Refs

- [YouTube tutorial](https://youtu.be/p6qoJ4apCjA)
