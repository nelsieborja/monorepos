module.exports = {
  onPreBuild: async ({ utils: { build, status, cache, run, git } }) => {
    await run.command("npm i -g @microsoft/rush && rush install && rush build");
  },
};
