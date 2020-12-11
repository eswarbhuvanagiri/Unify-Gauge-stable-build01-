/* globals gauge*/
"use strict";
const path = require('path');
const {
    openBrowser,
    write,
    closeBrowser,
    checkBox,
    exists,
    clear,
    mouseAction,
    tap,
    goto,
    title,
    into,
    evaluate,
    press,
    scrollDown,
    scrollRight,
    screenshot,
    text,
    focus,
    textBox,
    toRightOf,
    click,
    hover,
    button,
    waitFor,
    $,
    dropDown,
    doubleClick,
    rightClick,
    below,
    toLeftOf,
    above,
    reload,
    listItem,


} = require('taiko');
const assert = require("assert");

const {
    table
} = require('console');
const headless = process.env.headless_chrome.toLowerCase() === 'true';

beforeSuite(async () => {
    await openBrowser({
        headless: headless,
        args: ['--window-size=1440,900']
    })
});

afterSuite(async () => {
    await closeBrowser()
});

// Return a screenshot file name
gauge.customScreenshotWriter = async function () {
    const screenshotFilePath = path.join(process.env['gauge_screenshots_dir'],
        `screenshot-${process.hrtime.bigint()}.png`);

    await screenshot({
        path: screenshotFilePath
    });
    return path.basename(screenshotFilePath);
};

step("Unify quick Login to <url> as <table>", async function (url, table) {
    //diagnostics.startCssTracing()
    await goto(url);
    await waitFor(2000)
    assert.ok(await title(), "Unify Login");
    assert.ok(await text('Admin Portal').exists(0, 0));
    assert.ok(!await text('© 2019 Inventum Technologies Pvt Ltd. Version 3.8').exists(0, 0))

    await focus(textBox({
        name: "username"
    }))
    await write(table.rows[0].cells[1])
    await focus(textBox({
        name: "password"
    }))
    await write(table.rows[1].cells[1])
    await focus(textBox({
        name: "domain"
    }))
    await write(table.rows[2].cells[1])
    await click('Login');
    assert.ok(await title(), "Desktop")
});

step("Add Domain <query1> under <query2>", async (query1, query2) => {
    await waitFor(2000)
    await hover('Domains')
    await click('Domains Manager');
    await click(query2);
    await click($("#addDomainBtn"))
    await write(query1, into(textBox({
        id: "adddomainid-inputEl"
    })))
    await write(query1, into(textBox({
        id: "textfield-1230-inputEl"
    })))
    await waitFor(2000)
    await click($('#tool-1267'))
    await click($('#button-1006-btnWrap'))
    await write("Org", into(textBox({
        name: "contactTypeNo"
    })))
    await click($("//div[@id='adddomainFormContactGrid-body']//td[2]"))
    //  await click($("#textfield-1362-inputRow"))
    // await click($("//td[@class='x-grid-cell x-grid-td x-grid-cell-gridcolumn-1383 x-unselectable ']/div"))
    await write("Test1", into(textBox({
        name: "firstName"
    })))
    await click($("//div[@id='adddomainFormContactGrid-body']//td[3]"))
    await write("Test01", into(textBox({
        name: "lastName"
    })))
    await click($("//div[@id='adddomainFormContactGrid-body']//td[4]"))
    await write("ind", into(textBox({
        name: "countryNo"
    })))
    await waitFor(2000)
    await click("India")
    await click($("//div[@id='adddomainFormContactGrid-body']//td[5]"))
    await write("Del", into(textBox({
        name: "cityNo"
    })))
    await waitFor(2000)
    await click("Delhi")
    await press('Enter')
    await click($("#tab-1258"))
    await write("ITPL1234GST", into(textBox({
        name: "domain.gstin"
    })))
    await click($("//td[@id='taxJurisdictionCombo-inputCell']/following-sibling::td"))
    await waitFor(1000)
    await click($("//div[@id='boundlist-1295-listEl']//li[contains(text(),'Delhi')]"))
    await click($("//a[@title='Save']"))
    //  await click("Confirm No Tax Jurisdiction",below("Caution : Tax Jurisdiction not defined and this may impact GST/tax calculations on invoices that would be irreversible"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    console.log("Domain Added Succesfully");
});
// COA Creation
step("Navigate to COA", async () => {
    
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(1000)
    await click("Finance",below("Electronic Wallet"))
    await waitFor(2000)
    await click('Charts Of Accounts (COA)')
});
step("Add COA:<coa> under domain:<dom>", async (coa,dom) => {
    await click("Add",below("Chart Of Account (COA) List"))
    await write("demo",into(textBox({name:"coa.domno"})))
    await waitFor(1000)
    await press('Enter')
    await write(coa,into(textBox({name:"coa.name"})))

});
step("Add FY start date", async () => {
    await click(textBox(toRightOf("FY Starts On:")))
    await waitFor(3000)
    // await click(button({id:"splitbutton-1218"}))
    await click($("//*[@class='x-btn-wrap x-btn-split x-btn-split-right']/span[1]/span[2]"))
    await waitFor(3000)
    await click($("//*[@class='x-monthpicker-months']/div[7]/a"))
    await click($("//*[@class='x-monthpicker-years']/div[10]/a"))
    await click($("//*[@class='x-btn x-unselectable x-btn-default-small x-noicon x-btn-noicon x-btn-default-small-noicon']"))
    await click("1")
    // await click($("//a[@id='splitbutton-1176']"))
});
step("COA currency as <Indian Rupee>", async () => {
   
    await write("Ind",into(textBox({name:"coa.currency"})))
    await waitFor(1000)
    await press('Enter')
    // await click("INDIAN RUPEE")
});
step("Add externalID", async () => {
    await write('DemoExternalID', into(textBox({
        name:"coa.externalId"
    })))
});
step("Add Instruments Types", async () => {
    await click(textBox(toRightOf("Instrument Types:")))
    await click('Cash')
    await click('Cheques')
    await click('Credit Card')
    await click('Debit Card')

});
step("Add decimal accuracy", async () => {
    await click("Decimal Accuracy:")
    // await click($('#ext-gen1554'))
    await click("2 Decimal")
});
step("Add RoundOff", async () => {
    await click("Rounding Off:")
    await click("2nd Decimal Place")
});
step("Add TimeZone", async () => {

    await write("Kol", into(textBox({
        id: 'timeZoneId-inputEl'
    })))
    await waitFor(3000)
    await click("Asia/Kolkata")
});
step("Tax jurisdiction", async () => {

    await write("Delhi", into(textBox({
        id: 'taxJurisdictionID-inputEl'
    })))
    await press('Enter')
});
step("Enable FY Enforce and Skip zero value invoice", async () => {
    await click(button({
        id: "financialYear-inputEl"
    }))
    await click($("#skipZeroValue-inputEl"))
});

step("Save COA", async () => {
    await waitFor(3000)
    await click($("//a[@title='Save Coa']"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(!text("Demo_TestCOA01").exists(9, 9))
    console.log("COA Added Succesfully")
});
//Mapping COA groups 
step("Navigate to COA groups", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Finance', below('Electronic Wallet'))
    await waitFor(2000)
    await click('Charts Of Accounts Groups (COAGroups)')
});
step("Add <COA> group as Assets", async (coa) => {

    await click("Add")
    await write('Assets', into(textBox({
        name:"coaGroup.name"
    })))
    await click($("//td[@id= 'coaNameId-inputCell']/following-sibling::td[1]"))
    await click(coa)
    await click("Ledger Account Type:")
    await click("Asset")
    await click("Bank")
    await click("Debtors")
    await click("Cash")
    await click("Add Chart of Account (COA) Group")
    await click($("//a[@title='Save Coa Group']"))
    await waitFor(1000)

  await gauge.screenshot($("#msg-div"))
  assert.ok(!text("Demo_TestCOA01").exists(9, 9))
  console.log("COA Added Succesfully")
});

step("Add <coa> group as Expenditure", async (coa) => {
    await waitFor(2000)
    await click("Add")
    await write('Expenditure', into(textBox({
        name:"coaGroup.name"
    })))
    await click($("//td[@id= 'coaNameId-inputCell']/following-sibling::td[1]"))
    await click(coa)
    await click("Ledger Account Type:")
    await click("Expenses",below("Debtors"))
    await waitFor(1000)
    await click("Add Chart of Account (COA) Group")
    await waitFor(1000)
    await click($("//a[@title='Save Coa Group']"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(!text("Demo_TestCOA01").exists(9, 9))
     console.log("COA Added Succesfully")


});

step("Add <coa> group as Liabilities", async (coa) => {
    await waitFor(2000)
    await click("Add")
    await write('Liabilities', into(textBox({
        name:"coaGroup.name"
    })))
    await click($("//td[@id= 'coaNameId-inputCell']/following-sibling::td[1]"))
    await click(coa)
    await click("Ledger Account Type:")
    await click("Liability",below("Income"))
    await waitFor(1000)
    await click("Add Chart of Account (COA) Group")
 
    await click($("//a[@title='Save Coa Group']"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(!text("Demo_TestCOA01").exists(9, 9))
     console.log("COA Added Succesfully")

});
step("Add <coa> group as Revenue", async (coa) => {
    await waitFor(2000)
    await click("Add")
    await write('Revenue', into(textBox({
        name:"coaGroup.name"
    })))
    await click($("//td[@id= 'coaNameId-inputCell']/following-sibling::td[1]"))
    await click(coa)
    await click("Ledger Account Type:")
    await click("Income",above("Liability"))
    await waitFor(1000)
    await click("Add Chart of Account (COA) Group")
 
    await click($("//a[@title='Save Coa Group']"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(!text("Demo_TestCOA01").exists(9, 9))
     console.log("COA Added Succesfully")
});
step("navigate to ledgerbook", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Finance', below('Electronic Wallet'))
    await scrollDown('Ledger Book')
    await waitFor(2000)
    await click('Ledger Book')

});
step("Add ledgerbook:<ledgerbook> for <coa>", async (lb,coa) => {

    await click('Add', below('Ledger Book List'))
    await clear(textBox(), below('Name'))
    await waitFor(1000)
    await write(lb, textBox({
       
        name:"name"
    }))
    await write(lb, textBox({
        
        name:"descr"
    }))
    await write(coa, textBox({
        name:"coa"
    }))
    await waitFor(1000)
    await press('Enter')
   // await click(coa)
    await click(button({
        id: "checkboxfield-1155-inputEl"
    }))
    await click($("#button-1150-btnEl"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("Demo_TestCOA01").exists(9, 9))
     console.log("LedgerBook Added Succesfully")
    
  
});
step("navigate to Fiscal year", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Finance', below('Electronic Wallet'))
    await scrollDown('Fiscal Year')
    //await waitFor(2000)
    await click('Fiscal Year')

});

step("Add Fiscal year<FYname> to <domain>", async (fyn,dom) => {
    await click('Add', below('Fiscal Year List'))
    await write(dom, textBox({
        placeholder: "Select Domain"
    }))
    await waitFor(1000)
    await press('Enter')
    await write(fyn, into(textBox({name:"name"})))
    await click($("//td[@id='stDateId-inputCell']/following-sibling :: td/div[1]"))
    await waitFor(2000)
    await click($("//*[@class='x-btn-wrap x-btn-split x-btn-split-right']/span[1]/span[2]"))
    await waitFor(2000)
    await click($("//*[@class='x-monthpicker-months']/div[7]/a"))
    await click($("//*[@class='x-monthpicker-years']/div[10]/a"))
    await click($("//*[@class='x-btn x-unselectable x-btn-default-small x-noicon x-btn-noicon x-btn-default-small-noicon']"))
    await click("1")
    await waitFor(2000)
    await click($("//td[@id='endDateId-inputCell']/following-sibling :: td/div[1]"))
    await click($("//*[@class='x-btn-wrap x-btn-split x-btn-split-right']/span[1]/span[2]"))
    await waitFor(2000)
    await click($("//*[@class='x-monthpicker-months']/div[5]/a"))
    await click($("//*[@class='x-monthpicker-years']/div[3]/a"))
    await click($("//*[@class='x-btn x-unselectable x-btn-default-small x-noicon x-btn-noicon x-btn-default-small-noicon']"))
    await click("31")
    await click($("#closedID-inputEl"))
    await click($("#button-1152-btnWrap"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text(dom).exists(9, 9))
    console.log("Fiscal year created")
});
step("Navigate to CSL Config", async () => {
    
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Finance', below('Electronic Wallet'))
    await scrollDown('CSLNO Config')
    //await waitFor(2000)
    await click('CSLNO Config')
    await waitFor(2000)
});
step("Add CSLNO config", async () => {
    await click("Add", below("Custome Serial Config"))
    await click($("//td[@id='resetFrequencyId-inputCell']/following-sibling :: td/div[1]"))
    await click("Fiscal Year")
    await waitFor(2000)
    await focus(textBox({
        id: 'seriesStartCmp-inputEl'
    }))
    await write("1")
    await click("Enable:")
    await write("INV", into(textBox(toRightOf("Perfix:"))))
    await write("/$cs.fy", into(textBox(toRightOf("Suffix:"))))
    await click(button(toRightOf("Resuable Pool:")))
    await click($("#saveCslnoConfigBtn-btnWrap"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("INV").exists(9, 9))
    console.log("CSLNO created")
});
step("Navigate to CSLNO Config Voucher Type Map", async () => {
    
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Finance', below('Electronic Wallet'))
    await scrollDown('CSLNO Config Voucher Type Map')
    //await waitFor(2000)
    await click('CSLNO Config Voucher Type Map')
    await waitFor(2000)
});
step("Add CSLNO Config Voucher Type Map for <coa>,<ledgerbook>,<domian>", async (coa,lb,dom) => {
    await click("Add", below("CSLNO Config Voucher Type Map List"))
    await write("demo", into(textBox(toRightOf("COA:"))))
    await waitFor(2000)
    await click(coa)
    await waitFor(2000)
    await write("Demo", into($("//input[@id='ledgerbookId-inputEl' and @name='cslnovtypeMap.lbook.ledgerBookNo']")))
    await waitFor(2000)
    await click(lb,toRightOf("Domain:"))
    await write(dom, into(textBox(toRightOf("Domain:"))))
    await waitFor(2000)
    await press('Enter')
    await waitFor(2000)
    await write("Sale", into($("//input[@id='cslnovtypeId-inputEl' and @name='cslnovtypeMap.vtype.voucherTypeNo']")))
    await click("Sale / Invoice Voucher")
    await write("test", into(textBox(toRightOf("CSLNO Config :"))))
    await press('Enter')
  //  await click("INV000001/XX-YY")
    await click($("//a[@title='Save Mapping' and @id='savecslnoConfigVtypeMapBtn']"))
    await waitFor(1000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("INV").exists(9, 9))
    console.log("CSLNO created")
});
step("Navigate to networkID", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Global', above("Inventory"))
    //  await scrollDown('CSLNO Config Voucher Type Map')
    //await waitFor(2000)
    await click('NetworkId Type')
    await waitFor(2000)

});

step("Add NetworkID", async () => {
    await click("Add", below("NetworkID Type List"))
    await write("DemoID", into(textBox({
        name: "nitName"
    })))
    await write("DemoID", into(textBox({
        name: "nitDescription"
    })))
    await write("DEMOID", into(textBox({
        name: "nitShortName"
    })))
    await write("DID", into(textBox({
        name: "nitValueType"
    })))
    await press('Enter')
    await waitFor(2000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("Success").exists(9, 9))
    console.log("NetworkID  created")
});
step("Navigate to Device Type", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Global', above("Inventory"))
    //  await scrollDown('CSLNO Config Voucher Type Map')
    //await waitFor(2000)
    await click('Device Type')
    await waitFor(2000)
});
step("Add Device Type", async () => {
    await click("Add", below("Device Type List"))
    await write("DemoID", into(textBox({
        name: "ndtName"
    })))
    await write("DemoID", into(textBox({
        name: "ndtDescription"
    })))
    await write("int", into(textBox({
        name: "ndtSvccatId"
    })))
    await waitFor(2000)
    await click("Internet Access")
    await write("Demokey", into(textBox({
        name: "ndtI18nKey"
    })))
    await click($("//tr[@id='checkboxfield-1157-inputRow']/td[2]/input"))
    // 
    await press('Enter')
    await waitFor(2000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("Success").exists(9, 9))
    console.log("Device Added")
});
step("Navigate to Device Type NetworkId Type Map", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Global', above("Inventory"))
    await click('DeviceType NetworkIdType Map')
    await waitFor(2000)
});

step("Mapping  Device Type NetworkId Type", async () => {
    await click("Add", below("DeviceType NetworkIdType Map"))
    await write("Demo", into(textBox({
        name: "networkDeviceTypeId"
    })))
    await click("DemoID")
    await click(textBox({
        placeholder: "Select NetworkId Type"
    }))
    await click("Circuit-Id")
    await click("Add DeviceType NetworkId Map")
    await click($("//a[@title='Save Wallet Instrument']"))
    await waitFor(2000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("Success").exists(9, 9))
    console.log("Device Added")

});
step("Navigate FY Control GL Map", async () => {
    await waitFor(2000)
    await hover('Settings')
    await hover('Master Settings')
    await click('Master Data')
    await waitFor(2000)
    await click('Finance', below('Electronic Wallet'))
    await scrollDown('FY Control GL Map')
    //await waitFor(2000)
    await click('FY Control GL Map')
    await waitFor(2000)

});
step("Mapping FY Control GL Map coa:<coa> ledger:<ledgerbook>", async (coa,lb) => {
    await click("Add", below("FY Control GL Map List"))
    await write(coa, into(textBox({
        name: "fyControlGlMap.coa.coaNo"
    })))
    await waitFor(2000)
    await press('Enter')

    await write("Fy_2020", into(textBox({
        name: "fyControlGlMap.fiscalYear.id"
    })))
    await click("FY_2020-2021")
    await waitFor(2000)
    
    await write(lb, into(textBox({
        name: "fyControlGlMap.ledgerAccount.ledgerActNo"
    })))
    await waitFor(2000)
    await press('Enter')
   // await click("Demo_Faizabad_ledger")
    await write("Demokey", into(textBox({
        name: "fyControlGlMap.i18nKey"
    })))
    await press('Enter')
    await waitFor(2000)
    await gauge.screenshot($("#msg-div"))
    assert.ok(text("Success").exists(9, 9))
    console.log("Mapped succefully")
});
step("Navigate to Bill RunProfile", async () => {
    await waitFor(2000)
    await hover('Billing')
    // await hover('Bill Run Profile')
    await click('Bill Run Profile')
    await waitFor(2000)

});
step("Add BillProfile", async () => {
    await click($("//a[@role='button' and @id='billProfileAddBtnId']"))
    await write("TestProfile", into(textBox({
        placeholder: "Enter Descriptive Name"
    })))
    await write("Test", into(textBox({
        placeholder: "Select Domain"
    })))
    await press('Enter')
    await waitFor(2000)
    await click("Apply Late Payment Fee:")
    await write("200", into(textBox({
        name: "billProfiles.lateFineMin"
    })))
    await scrollRight('Payment Grace Days (Pay By):')
    await write("5", into(textBox(toRightOf("Payment Grace Days (Pay By):"))))

    await click($("//a[@role='button' and @id='button-1083']"))
    await waitFor(2000)
});