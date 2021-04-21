# [Nx](https://nx.dev/)

## Setup

1. Create Nx workspace with `npx create-nx-workspace@latest` then follow the steps.
   💡 The workspace name will be used to reference the libs, e.g. `@nx/ui` where:

   - `nx` - workspace name
   - `ui` - library name

   Check the root `tsconfig.base.json` file for this reference mapping.

2. (Optional. Can be created along with step 1) Create `hello` app with `npx nx g @nrwl/react:application hello`
3. Create the React `@nx/ui` library with `npx nx g @nrwl/react:lib ui`
4. Create `@nx/utils` library with `npx nx g @nrwl/workspace:library utils`
5. Repeat steps 2-4 to create more apps/libs

---

## Obtain build duration

```shell
# initial build
# `--skip-nx-cache` flag to make sure cache is skip for initial build
$ yarn nx affected:build --all --parallel --skip-nx-cache
# after file change
$ yarn nx affected:build --all --parallel
```
