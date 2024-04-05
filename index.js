import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp"
  });
  const page = await browser.newPage();
  await page.goto('https://www.amazon.in/gp/bestsellers/boost/10894241031/ref=zg_bs_nav_boost_2_10894234031');
  
  const productsHandles = await page.$$('.p13n-sc-uncoverable-faceout');
  //p13n-sc-uncoverable-faceout
  //.p13n-gridRow ._cDEzb_grid-row_3Cywl
//   console.log("Producthandles:",productsHandles);
//.a-link-normal
//_cDEzb_p13n-sc-css
let items = [];


  for(const productsHandle of productsHandles){
    let title = "Null";
    let price = "Null";
    let image = "Null";
        try {
            title = await productsHandle.evaluate(el => el.querySelector("span > div").textContent, productsHandle)
        } catch (error) {
        }


        try {
            price = await productsHandle.evaluate(el => el.querySelector(".a-row > span").textContent, productsHandle)            
        } catch (error) {
        }

        try {
            image = await productsHandle.evaluate(el => el.querySelector(".p13n-product-image").getAttribute("src"), productsHandle)
        } catch (error) {
        }

        if(title !=="Null" || price !=="Null" || image !=="Null" ){
            items.push({title, price, image});
        }
  }

  console.log(items);

  
  

//   await browser.close();
})();