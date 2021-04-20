## Steps

1. Install the dependencies
   NOTE: `pnpm` had issues with installing dependencies, hence `npm` is used instead.

```shell
# install Rush
$ npm install -g @microsoft/rush

# install pnpm as package manager
# $ npm i -g pnpm

# initialize Rush monorepo
$ rush init

# check pnpm version and match to "pnpmVersion" property in `rush.json` file
# $ pnpm --version

# uncomment the below line in `rush.json` file to set npm as the package manager
# also make sure to set its correct version
{
"npmVersion": "6.14.11",
}
```

2. Create "demo" React app via CRA

```shell
# create the `apps` folder and navigate to it
$ mkdir apps && cd apps
# create the app
$ npx create-react-app demo
# add the app to "projects" property in `rush.json` file
"projects": [
{
    "packageName": "demo",
    "projectFolder": "apps/demo"
}
]
# tell Rush about the package update
# folder location doesn't matter as long as it's within the Rush monorepo
# Rush will also install different packages that it needs
$ rush update
# run the app
$ cd demo # navigate to the `app` folder
# start it
# `rushx` was installed globally along with Rush; analogous to `npm run`
$ rushx start
```

3. Create "ui" package via [tsdx](https://github.com/formium/tsdx)
   This package will provide a component into "demo" app.

```shell
# go back to root folder
$ cd ../../
# create the `libs` folder and navigate to it
$ mkdir libs && cd libs
# create the package
$ npx tsdx create ui
# update `rush.json` file to add this package
"projects": [
  ...,
  {
    "packageName": "@shared/ui",
    "projectFolder": "libs/ui"
  }
]
# match the package name `@shared/ui` to `libs/ui/package.json` file
{
  "name": "@shared/ui", # was: "name": "ui",
}
# run Rush update again
$ cd ../../ # navigate back to root folder
# tell Rush to wipe everything out and reinstall all of the deps then link them together
# so that the referencing of shared components would take place
$ rush update --purge
# (optional) start the created package to watch for file updates,
# or just use the already created one for quick testing
$ cd ui && rushx start
```

4. Import and use `@shared/ui` in "demo" app

```shell
# navigate to "demo" app
$ cd app/demo
# add `@shared/ui` to the app
$ rush add -p @shared/ui # `rush add` tells Rush to reference a local one
# run build as suggested in the prompt
$ rush build
```

5. Deployment via Netlify

```shell
# init a new scenario config file (/common/config/rush/deploy.json)
# (sample content) "deploymentProjectNames": ["demo"],
$ rush init-deploy -p demo
```

Then commit to GitHub and deploy to Netlify using the below settings:

- build command

```shell
npm i -g @microsoft/rush && rush install && rush build && rush deploy --overwrite -p demo && cd common/deploy/apps/demo && rushx build
```

- publish directory

```shell
rushjs/common/deploy/apps/demo/build
```

---

## Refs

[YouTube tutorial](https://www.youtube.com/watch?v=7FWG3tBTnFM&ab_channel=LeighHalliday)
[RushJS deploying projects](https://rushjs.io/pages/maintainer/deploying/)
