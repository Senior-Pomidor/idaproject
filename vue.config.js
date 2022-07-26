module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === "production" ? "/idaproject/" : "/",
  css: {
    loaderOptions: {
      sass: {
        // additionalData: `
        // 		@import "@/styles/_imports.scss";
        // 	`,
      },
    },
  },
};
