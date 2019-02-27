class NewRule {
  constructor(sheet, ruleName, ruleParams) {
    this.sheet = sheet;
    this.ruleName = ruleName;
    this.ruleParams = ruleParams;
  }
  grabSheet() {
    for (let sheets = this.sheet, sheet = 0; sheet < sheets.length; sheet++) {
      if (sheets[sheet].title === 'main') {
        this.sheet = sheets[sheet];
      }
    }
    this.addRule();
  }
  addRule() {
    this.sheet.insertRule(this.ruleParams, this.sheet.rules.length);
    // console.log(this.sheet);
  }
  resetRule() {
    let sheetRules = Array.from(this.sheet.rules);
    sheetRules.forEach(function (node, i) {
      if (node.name === this.ruleName) {
        this.sheet.deleteRule(i);
      }
    }, this);
  }
}

let firstAnimHandler,
    secondAnimHandler;