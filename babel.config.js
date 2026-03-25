module.exports = function (api) {
  api.cache(true);
  const isDev = process.env.NODE_ENV === "development";
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      ...(!isDev
        ? [
            [
              "@tamagui/babel-plugin",
              {
                components: ["tamagui"],
                config: "./tamagui.config.ts",
                logTimings: true,
              },
            ],
          ]
        : []),
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@/design-system": "./design-system/index.ts",
          },
        },
      ],
    ],
  };
};
