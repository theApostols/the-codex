//function to format & return a given date
//==============================================================
const formatDate = (date) =>
{
  //converts given date to an ISO string, & split it at 'T', taking the first index
  //i.e. 2023-12-13T01:45:47.637Z -> 2023-12-13
  let dateOnly = date.toISOString().split('T')[0];

  //splits the above dateOnly string at each '-' to retrieve the day, month, and year
  let year = dateOnly.split('-')[0];
  let month = dateOnly.split('-')[1];
  let day = dateOnly.split('-')[2];

  //retrieves the last character of the 'day' string
  const lastChar = day[day.length - 1];

  //adds the appropriate date suffix based on the number
  if (lastChar === '1' && day !== '11')
  {
    day = `${day}st`;
  }
  else if (lastChar === '2' && day !== '12')
  {
    day = `${day}nd`;
  }
  else if (lastChar === '3' && day !== '13')
  {
    day = `${day}rd`;
  }
  else
  {
    day = `${day}th`;
  }

  //switch case to convert the month, currently in numerical form, to it's shortened name
  switch (month)
  {
    case '1': month = 'Jan'; break;
    case '2': month = 'Feb'; break;
    case '3': month = 'Mar'; break;
    case '4': month = 'Apr'; break;
    case '5': month = 'May'; break;
    case '6': month = 'Jun'; break;
    case '7': month = 'Jul'; break;
    case '8': month = 'Aug'; break;
    case '9': month = 'Sep'; break;
    case '10': month = 'Oct'; break;
    case '11': month = 'Nov'; break;
    case '12': month = 'Dec'; break;
    default: month = 'Invalid month';
  }

  //returns formatted date
  return `${year}, ${month} ${day}`;
};
//==============================================================

//exports formatDate function
//==============================================================
module.exports = formatDate;
//==============================================================