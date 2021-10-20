module.exports = {
  plugins: [
    require(`tailwindcss`)(`./tailwind.config.js`),
    require(`autoprefixer`),
    ...(process.env.NODE_ENV === "production"
      ? [
          require(`cssnano`)({
            preset: "default",
          }),
        ]
      : [
        require(`cssnano`)({
          preset: "default",
        }),
      ]),
  ],
};
