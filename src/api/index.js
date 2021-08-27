const router = require("express").Router();
const { update, updates } = require("./clientApi");
const totoro = require("totoro-node");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

router.use(
  "/api",
  totoro.rain({
    v1: {
      active: true,
      endpoints: [
        {
          route: "/update",
          method: "POST",
          active: true,
          implementation: update,
        },
        {
          route: "/updates",
          method: "POST",
          active: true,
          implementation: updates,
        },
      ],
    },
  })
);

module.exports = router;
