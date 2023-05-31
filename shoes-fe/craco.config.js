const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "~GlobalStyle": path.resolve(__dirname, "src/GlobalCSS"),
      "~task": path.resolve(__dirname, "src/Task"),
      "~table_context": path.resolve(
        __dirname,
        "src/components/Content/context_table"
      ),
      "~common_tag": path.resolve(
        __dirname,
        "src/components/Content/common_tag"
      ),
      "~common_scss": path.resolve(__dirname, "src/components/Content/scss"),
      "~hang_hoa": path.resolve(
        __dirname,
        "src/components/Content/DanhMuc/HangHoa"
      ),

      "~nghiep_vu": path.resolve(__dirname, "src/components/Content/NghiepVu"),
      "~utils": path.resolve(__dirname, "src/utils/"),
      "~config": path.resolve(__dirname, "src/config/"),
      "~items": path.resolve(__dirname, "src/components/items"),
      "~items_context": path.resolve(__dirname, "src/ItemsProvider"),
    },
  },
};
