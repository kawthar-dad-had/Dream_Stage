const EPub = require("epub2").EPub;
const epubMetadata = require('epub-metadata')
const axios = require("axios");
const {extractTo} = require("./EPUBToText");
const models = require("./models");

const epubfile = "./epubs/dickens_un_drame_sous_la_revolution.epub"
const imagewebroot = "./images"
const chapterwebroot = "./links" 
const textFolder = "./textFolder" 
const convert = require('xml-js');

const {addEpub} = models
let titleepub = ''
const path = require('path');
const fs = require('fs');
const xl = require('excel4node');
const wb = new xl.Workbook();
const ws = wb.addWorksheet('Worksheet Name'); 

//Extraire
const epubFunction = () => {
  const directoryPath = path.join(__dirname, 'epubs');
  const wantToReturn = fs.readdir(directoryPath,async (err, files) => {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach=
    let data = []
    /*files.forEach(async (file) => {
      
      //let epub = new EPub("epubs/"+file, imagewebroot, chapterwebroot);
     let dataepub = await EPub.createAsync("epubs/"+file, imagewebroot, chapterwebroot);
     
      //let dataepub =  EPub.createAsync("epubs/"+file, imagewebroot, chapterwebroot)
    	/*.then(function (epub)
    	{
    		console.log(epub.metadata.title);
        return epub.metadata.title
    	})
    	.catch(function (err)
    	{
    		console.log("ERROR\n-----");
    		throw err;
    	})
    ;*/
/*
      epub.on("end", () => {
        // epub is now usable
        console.log(epub.metadata);
        datas.push(epub.metadata.title)
        console.log(datas);
        //addEpub(epub.metadata , epubfile)
        addEpub(epub.metadata, "path")
        let data = [epub.metadata]
        let headingColumnNames = Object.keys(epub.metadata)
        //console.log(data);
        //console.log(headingColumnNames);
        let headingColumnIndex = 1;
        headingColumnNames.forEach(heading => {
            ws.cell(1, headingColumnIndex++)
                .string(heading)
        });
        let rowIndex = 2;
        data.forEach( record => {
            let columnIndex = 1;
            Object.keys(record ).forEach(columnName =>{
                ws.cell(rowIndex,columnIndex++)
                    .string(record [columnName])
            });
            rowIndex++;
        });
      wb.write('filename.xlsx');
        //epub.getChapter("chapter_id", function(err, text){});
      });
      epub.parse();
      */
     /*const mdata = JSON.stringify(dataepub.metadata)
     data.push(JSON.parse(mdata))
     console.log("data")
     console.log(data)
    });*/
    for (var i = 0; i < files.length; i++) {
      let dataepub = await EPub.createAsync("epubs/"+files[i], imagewebroot, chapterwebroot);
      const mdata = JSON.stringify(dataepub.metadata)
      data.push(JSON.parse(mdata))
    }
    //console.log(datas)
    return data
  });
  console.log(wantToReturn)
  return wantToReturn
}
const test = epubFunction()
console.log(test)
/*
const headingColumnNames = [
  "Name",
  "Email",
  "Mobile",
]
let headingColumnIndex = 1;
    headingColumnNames.forEach(heading => {
        ws.cell(1, headingColumnIndex++)
            .string(heading)
    });
    let rowIndex = 2;
    data.forEach( record => {
        let columnIndex = 1;
        Object.keys(record ).forEach(columnName =>{
            ws.cell(rowIndex,columnIndex++)
                .string(record [columnName])
        });
        rowIndex++;
    });
    wb.write('filename.xlsx');


*/




//verification
/*
let titleepub = ''
const lg = 'fr'
const getBreeds = async () => {
    try {
      return await axios.get('https://www.googleapis.com/books/v1/volumes?q=title:'+titleepub+'lg:'+lg)
    } catch (error) {
      console.error(error)
    }
  }
  
  var title = ''
  var subtitle = ''
  var authors = ''
  var printType = ''
  var pageCount = ''
  var publisher = ''
  var publishedDate = ''
  var webReaderLink = ''

  const countBreeds = async () => {
    const bk = await getBreeds()
    const book = bk.data.items[0]

    if (book) {
        //console.log(`Got ${Object.entries(breeds.data.message).length} breeds`)
        title = book['volumeInfo']['title'];
        subtitle = book['volumeInfo']['subtitle'];
        authors = book['volumeInfo']['authors'];
        printType = book['volumeInfo']['printType'];
        pageCount = book['volumeInfo']['pageCount'];
        publisher = book['volumeInfo']['publisher'];
        publishedDate = book['volumeInfo']['publishedDate'];
        webReaderLink = book['accessInfo']['webReaderLink'];
    }
  }
  countBreeds().then(() => {
    console.log({title , subtitle ,authors });
  })
 */
const title = "où es-tu"
const authorName = "marc levy"
  const getBreeds = async () => {
    try {
      //return await axios.get("https://www.googleapis.com/books/v1/volumes?q=inauthor:"+authorName+"+intitle:"+title)
      //https://gallica.bnf.fr/SRU?operation=searchRetrieve&version=1.2&query=(dc.creator%20any%20%22charles%20dickens%22)and(dc.title%20any%20%22un%20drame%20sous%20la%20revolution%22)
      //https://www.googleapis.com/books/v1/volumes?q=inauthor:%22patrick%20rambaud%22&intitle:%22la%20bataille%22&printType=books
      //https://www.googleapis.com/books/v1/volumes?q=inauthor:%22marcel%20proust%22+intitle:%22du%20c%C3%B4t%C3%A9%20de%20chez%20Swann%22
      //https://catalogue.bnf.fr/api/SRU?version=1.2&operation=searchRetrieve&query=(bib.author%20adj%20%22patrick%20rambaud%22)%20and%20(bib.title%20adj%20%22la%20bataille%22)
      return await axios.get("https://catalogue.bnf.fr/ark:/12148/cb36177566t")
    } catch (error) {
    }
  }
  const countBreeds = async () => {
    const bk = await getBreeds()
    //console.log(bk.data.items[0]["volumeInfo"]);

    //var xmlData = convert.xml2json(bk.data, {
    //compact: true,
    //space: 4
    //});
    //const obj = JSON.parse(xmlData)
//
   // console.log(bk.data);
    ////console.log(obj['srw:searchRetrieveResponse']['srw:records']['srw:record']['srw:recordData']['oai_dc:dc']);
  }
  countBreeds()


//Transformer epub to txt
extractTo(epubfile,textFolder , (err) => {
  console.log(err);
})
 