var DateConverter = require("dateconverter");
export const GETNEPALIDATE = () => {
  return DateConverter(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  )
    .convertToBS()
    .toBSString();
};

export const GETNEPALIMONTH = () => {
 return(
  GETNEPALIDATE().split("-")[0] + "-" + GETNEPALIDATE().split("-")[1]
 )
};


export const GETTHATNEPALIDATE=(Year:any,Month:any,Day:any)=>
{
return DateConverter(Year, Month, Day).convertToBS().toBSString();

}