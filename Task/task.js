const fs = require('fs');
const readFile = fs.readFileSync('./carscompanies.json', 'utf8');
const parsedData = JSON.parse(readFile);

getCompanies(parsedData)

function getCompanies(dataModels){
    const companies = [];
    var prModels = [];
    var prCompanyId;
    var modelId = 0;

    let n = dataModels.length;
    
    for (var i = 1; i<=n; i++){
        if(dataModels[i] !== undefined){
            companies.push(companyItem(dataModels[i], i));

            let models = dataModels[i]["models"];
            prCompanyId = i;
        
            for(let t = 0; t<= models.length; t++){

                if (models[t] !== undefined){

                    prModels.push(modelItem(models[t], modelId++, prCompanyId))

                }
            }

        }

    }

    console.log(prModels);
    fs.writeFileSync("models.json", JSON.stringify(prModels));
    fs.writeFileSync("companies.json", JSON.stringify(companies));
}

function companyItem(companyItemObj, i){

    let companyNewItemObj = {
        id: i,
        value: companyItemObj.name ,
        display:  companyItemObj.id
    };

        return companyNewItemObj;
}

function modelItem(modelItemObj, idModel, companyId ){

    let modelNewItemObj = {
        id: idModel,
        value: modelItemObj.name ,
        display:  modelItemObj.id, 
        produceCompanyId: companyId,
        class: modelItemObj.class,
        yearFrom:modelItemObj['year-from'],
        yearTo:modelItemObj['year-to']
    };

        return modelNewItemObj;
}