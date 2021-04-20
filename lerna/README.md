## Steps

1. Install the dependencies

   ```shell
   # initialize Lerna workspace
   $ npx lerna init
   ```

2. Yarn workspaces setup

   Using Yarn workspaces, common packages will be hoisted up to the root directory instead of duplicating them in the packages `node_modules` folders. To do so, do the following file update:

   ```json
   // lerna.json
   {
     ...
     "npmClient": "yarn",
     "useWorkspaces": true
   }
   // package.json
   {
     ...
     "workspaces": {
       "packages": [
         "packages/**"
       ]
     }
   }
   ```

3. Create the apps (via CRA) and shared libs (via tsdx)

   ```shell
   # navigate to `packages` folder
   $ cd packages
   $ npx create-react-app hello --template typescript  # hello app
   $ npx create-react-app world --template typescript  # world app
   $ npx tsdx create ui                                # ui lib
   $ npx tsdx create utils                             # utils lib
   ```

4. (Optional) Rename the packages name in their `package.json` file accordingly:

   ```json
   // packages/ui/package.json
   {
     ...
     "name": "@shared/ui",
   }
   // packages/utils/package.json
   {
     ...
     "name": "@shared/utils",
   }
   ```

5. Use the shared libs in the apps
   This is done by just updating the `package.json` files as below:

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
