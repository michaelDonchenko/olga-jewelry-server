const mongoose = require('mongoose')

const siteRuleSchema = new mongoose.Schema(
  {
    rule: Object,
  },
  { timestamps: true }
)

module.exports = mongoose.model('SiteRule', siteRuleSchema)
