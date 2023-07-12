export function GetAge(date, type) {
    date = date.split("-");
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const yy = parseInt(date[0]);
    const mm = parseInt(date[1]);
    const dd = parseInt(date[2]);
    let years, months, days;
  
    months = month - mm;
    if (day < dd) {
      months = months - 1;
    }
  
    years = year - yy;
    if (month * 100 + day < mm * 100 + dd) {
      years = years - 1;
      months = months + 12;
    }
  
    days = Math.floor(
      (today.getTime() - new Date(yy + years, mm + months - 1, dd).getTime()) /
        (24 * 60 * 60 * 1000)
    );
  
    switch (type) {
      case "Y":
        return years;
        break;
      case "m":
        return months;
        break;
      case "d":
        return days;
        break;
      default:
        return { years: years, months: months, days: days };
        break;
    }
  }