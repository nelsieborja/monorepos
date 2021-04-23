module.exports = {
  onPreBuild: async ({ utils: { build, status, cache, run, git } }) => {
    await run.command("npm i -g @microsoft/rush");
    await run.command("rush install");
    await run.command("rush build -t hello");
  },
};
